import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ═══════════════════════════════════════════════════════════════
//  PROJECTS STORE — shared data between Admin and Frontend
// ═══════════════════════════════════════════════════════════════
//
//  HOW IT WORKS:
//  1. Admin adds/edits/deletes a project → stored in localStorage
//  2. Homepage FeaturedProjects reads from this same store
//  3. Changes appear on the homepage instantly — no backend needed
//
//  WHEN BACKEND IS READY:
//  Replace this store with API calls using React Query
//  The components (FeaturedProjects, AdminProjects) stay the same
// ═══════════════════════════════════════════════════════════════

const INITIAL_PROJECTS = [
  {
    id: 1,
    title: 'Harbor View Residences',
    description: 'A luxury residential development offering stunning waterfront views and modern amenities for an elevated living experience.',
    category: 'Residential',
    status: 'Completed',
    location: 'KG 14 Ave, Kigali-Gisozi, Rwanda',
    client_name: 'Rwanda Housing Authority',
    budget: '5000000',
    start_date: '2023-08-08',
    end_date: '2024-05-12',
    progress: 100,
    scope: 'Residential Complex Development',
    slug: 'harbor-view-residences',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80',
    featured: true,
  },
  {
    id: 2,
    title: 'Sunset Ridge Development',
    description: 'A premium residential community designed for modern living, offering breathtaking views and exceptional amenities.',
    category: 'Residential',
    status: 'Completed',
    location: 'KN 5 Rd, Nyamirambo, Kigali, Rwanda',
    client_name: 'Private Client',
    budget: '3500000',
    start_date: '2023-02-01',
    end_date: '2024-01-02',
    progress: 100,
    scope: 'Mixed-Use Estate Development',
    slug: 'sunset-ridge-development',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=80',
    featured: true,
  },
  {
    id: 3,
    title: 'Kigali Trade Centre',
    description: "A state-of-the-art commercial hub designed to support Rwanda's growing business ecosystem with world-class facilities.",
    category: 'Commercial',
    status: 'In Progress',
    location: 'KG 7 Ave, Kacyiru, Kigali, Rwanda',
    client_name: 'Kigali City Council',
    budget: '12000000',
    start_date: '2022-01-03',
    end_date: '2024-06-30',
    progress: 65,
    scope: 'Commercial Construction',
    slug: 'kigali-trade-centre',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=900&q=80',
    featured: true,
  },
]

const useProjectsStore = create(
  persist(
    (set, get) => ({
      projects: INITIAL_PROJECTS,

      // ── Add new project ──────────────────────────────────────
      addProject: (data) => set((state) => ({
        projects: [
          ...state.projects,
          {
            ...data,
            id: Date.now(),
            slug: data.title.toLowerCase().replace(/\s+/g, '-'),
            featured: true,
            image: data.image || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80',
          },
        ],
      })),

      // ── Update existing project ──────────────────────────────
      updateProject: (id, data) => set((state) => ({
        projects: state.projects.map((p) =>
          p.id === id ? { ...p, ...data } : p
        ),
      })),

      // ── Delete project ───────────────────────────────────────
      deleteProject: (id) => set((state) => ({
        projects: state.projects.filter((p) => p.id !== id),
      })),

      // ── Get only featured projects (shown on homepage) ───────
      getFeatured: () => get().projects.filter((p) => p.featured),
    }),
    {
      name: 'civion-projects', // localStorage key
    }
  )
)

export default useProjectsStore
