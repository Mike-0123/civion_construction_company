// ============================================================
// SITE CONFIG — Central source of truth for all site content
// ============================================================
// HOW TO MAKE THIS DATABASE-DRIVEN LATER:
//   1. Replace this file's exports with API calls (e.g. useQuery('siteConfig', fetchSiteConfig))
//   2. Each array/object below maps 1-to-1 with a DB table or API endpoint
//   3. Example: navLinks → GET /api/navigation
//              services  → GET /api/services
//              socials   → GET /api/social-links
// ============================================================

// ── Company info ────────────────────────────────────────────
// DB table: company_info (single row)
export const companyInfo = {
  name: 'Civion',
  tagline: 'Building Africa\'s future, one project at a time.',
  description:
    'From residential homes to large-scale commercial projects, Civion delivers on-time, budget-friendly construction across Africa — backed by 15+ years of local expertise and unmatched craftsmanship.',
  foundedYear: 2010,
  location: 'Africa',
  specialistsCount: 15,
  specialistsLabel: 'Construction Specialists Dedicated to Your Project\'s Success',
  ctaLabel: 'Book a Consultation',
  hiringLabel: "We're Hiring!",
  hiringLink: '/careers',
  hiringLinkLabel: 'Join our Team →',

  // ── Contact details (shown in TopBar) — DB table: company_info ──
  phone: '+(250) 788 208 488',
  address: 'KG 14 Ave, Kigali-Gisozi, Rwanda',
  email: 'info@civion.com',
  // ── WhatsApp click-to-chat number (international format, no + or spaces) ──
  // TO CHANGE: update the digits below — country code + number
  whatsapp: '250788208488',

  // ── Images (fetch from GET /api/site-settings when backend is ready) ──
  // Building under construction — concrete columns, rebar, scaffolding, workers, blue sky
  // TO USE YOUR OWN IMAGE: save the file as frontend/public/hero-bg.jpg
  // then change this line to: heroBgImage: '/hero-bg.jpg'
  heroBgImage: '/hero-bg.jpg',
  // Construction worker: yellow hard hat, orange safety vest, arms crossed, confident
  heroWorkerImage: '/nextheader.jpg',
}

// ── Team members (featured 5 shown in hero avatars) ──────────
// DB table: team_members — GET /api/team?featured=true
// Each avatar is a real photo URL; replace with your own uploads via DB
export const teamMembers = [
  { id: 1, name: 'Kwame Asante',   role: 'Site Engineer',      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'   },
  { id: 2, name: 'Amara Diallo',   role: 'Project Manager',    avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 3, name: 'Chidi Okafor',   role: 'Structural Engineer',avatar: 'https://randomuser.me/api/portraits/men/57.jpg'   },
  { id: 4, name: 'Fatima Nkosi',   role: 'Architect',          avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { id: 5, name: 'Segun Adeyemi',  role: 'Safety Officer',     avatar: 'https://randomuser.me/api/portraits/men/79.jpg'   },
]

// ── Navigation links ─────────────────────────────────────────
// DB table: navigation_links (ordered list, supports dropdown children)
export const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    href: '/about',
    dropdown: [
      { label: 'Our Story', href: '/about/story' },
      { label: 'Our Team', href: '/about/team' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    dropdown: [
      { label: 'Custom Home Builds', href: '/services/home-builds' },
      { label: 'Renovations', href: '/services/renovations' },
      { label: 'Commercial Construction', href: '/services/commercial' },
      { label: 'Roofing & Repairs', href: '/services/roofing' },
    ],
  },
  {
    label: 'Projects',
    href: '/projects',
    dropdown: [
      { label: 'Residential', href: '/projects/residential' },
      { label: 'Commercial', href: '/projects/commercial' },
      { label: 'Case Studies', href: '/projects/case-studies' },
    ],
  },
  { label: 'Blog', href: '/blog' },
]

// ── Footer quick links ────────────────────────────────────────
// DB table: footer_quick_links
export const footerQuickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
]

// ── Services list ─────────────────────────────────────────────
// DB table: services — GET /api/services
export const services = [
  { id: 1, label: 'Residential & Estate Builds', href: '/services/residential' },
  { id: 2, label: 'Commercial Construction',     href: '/services/commercial'  },
  { id: 3, label: 'Roads & Infrastructure',      href: '/services/roads'       },
  { id: 4, label: 'Renovation & Remodelling',    href: '/services/renovation'  },
  { id: 5, label: 'Project Management',          href: '/services/management'  },
  { id: 6, label: 'Roofing & Repairs',           href: '/services/roofing'     },
]

// ── Social media links ────────────────────────────────────────
// DB table: social_links
export const socialLinks = [
  { platform: 'facebook', href: 'https://facebook.com', label: 'Facebook' },
  { platform: 'twitter', href: 'https://twitter.com', label: 'X (Twitter)' },
  { platform: 'instagram', href: 'https://instagram.com', label: 'Instagram' },
  { platform: 'youtube', href: 'https://youtube.com', label: 'YouTube' },
  { platform: 'linkedin', href: 'https://linkedin.com', label: 'LinkedIn' },
  { platform: 'tiktok', href: 'https://tiktok.com', label: 'TikTok' },
]

// ── Review ratings ────────────────────────────────────────────
// DB table: review_sources
export const reviewSources = [
  { platform: 'Reviews.io', rating: 4.9, reviewCount: '25k+' },
  { platform: 'Trustpilot', rating: 4.8, reviewCount: '64k+' },
]

// ── Trusted brand / partner logos ────────────────────────────
// DB table: trusted_brands (name, logo_url)
// Replace logo: null with real CDN/upload URLs from your DB
export const trustedBrands = [
  { name: 'Dangote Group',   logo: null },
  { name: 'Julius Berger',   logo: null },
  { name: 'Lafarge Africa',  logo: null },
  { name: 'WBHO',            logo: null },
  { name: 'Group Five',      logo: null },
]

// ── Footer legal links ────────────────────────────────────────
// DB table: legal_links
export const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Cookies', href: '/cookies' },
  { label: 'Sitemap', href: '/sitemap' },
]
