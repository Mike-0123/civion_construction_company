import { Link } from 'react-router-dom'
import { MapPin, Calendar, Layers, ArrowRight } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import api from '../../services/api'

// ── Fetch featured projects from PostgreSQL via backend API ───
async function fetchFeatured() {
  const res = await api.get('/projects/featured')
  return res.data
}

export default function FeaturedProjects() {
  const { data: projects = [], isLoading, isError } = useQuery({
    queryKey: ['projects', 'featured'],
    queryFn: fetchFeatured,
  })

  if (isLoading) return (
    <section className="bg-white py-20 px-4 text-center">
      <div className="text-gray-400 text-sm animate-pulse">Loading projects...</div>
    </section>
  )

  if (isError) return (
    <section className="bg-white py-20 px-4 text-center">
      <div className="text-red-400 text-sm">Could not load projects. Is the backend running?</div>
    </section>
  )

  if (projects.length === 0) {
    return (
      <section className="bg-white py-20 px-4 text-center text-gray-400 text-sm">
        No featured projects yet. Add some from the admin dashboard.
      </section>
    )
  }

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-14">
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              Featured Construction Projects
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Explore our portfolio of successful projects. Dedication, craftsmanship, and
              attention to detail come together to create exceptional results. Each project reflects our
              commitment to exceeding client expectations.
            </p>
          </div>
          <Link
            to="/projects"
            className="shrink-0 self-start sm:self-center inline-flex items-center gap-2 bg-orange-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-orange-400 transition-colors shadow-md shadow-orange-500/20"
          >
            Go Project Page <ArrowRight size={15} />
          </Link>
        </div>

        {/* Project cards */}
        <div className="space-y-16 divide-y divide-gray-100">
          {projects.map((project, index) => (
            <div key={project.id} className={index !== 0 ? 'pt-16' : ''}>
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <Icon size={15} className="text-gray-400 mt-0.5 shrink-0" />
      <span className="text-sm text-gray-400 w-16 shrink-0">{label}</span>
      <span className="text-sm text-gray-800 font-medium">{value}</span>
    </div>
  )
}

function ProjectCard({ project, index }) {
  const isEven = index % 2 === 0

  // format date from 2023-08-08 → 08/08/2023
  function fmt(d) {
    if (!d) return '—'
    const [y, m, day] = d.split('-')
    return `${m}/${day}/${y}`
  }

  return (
    <div className={`flex flex-col lg:flex-row gap-10 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>

      {/* Text */}
      <div className="flex-1 space-y-4">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{project.title}</h3>
        <p className="text-gray-500 leading-relaxed">{project.description}</p>
        <div className="mt-4">
          <DetailRow icon={MapPin}   label="Location:" value={project.location} />
          <DetailRow icon={Calendar} label="Date:"     value={`${fmt(project.start_date)} – ${fmt(project.end_date)}`} />
          <DetailRow icon={Layers}   label="Scope:"    value={project.scope || project.category} />
        </div>
        <Link
          to={`/projects/${project.slug}`}
          className="inline-flex items-center gap-2 mt-4 bg-orange-500 text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-orange-400 transition-colors shadow-md shadow-orange-500/20"
        >
          See More <ArrowRight size={15} />
        </Link>
      </div>

      {/* Image */}
      <div className="flex-1 w-full">
        <div className="rounded-2xl overflow-hidden shadow-lg aspect-4/3">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

    </div>
  )
}
