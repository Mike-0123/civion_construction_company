import { Link } from 'react-router-dom'
import { MapPin, Calendar, Layers, ArrowRight } from 'lucide-react'

// ── Static project data — DB-READY ───────────────────────────
// When backend is ready, replace with:
//   const { data: projects } = useQuery(['projects', 'featured'], () => api.get('/projects?featured=true'))
// DB table: projects
//   columns: id, title, description, location, date_start, date_end, scope, image_url, slug, featured
const projects = [
  {
    id: 1,
    title: 'Harbor View Residences',
    description:
      'A luxury residential development offering stunning waterfront views and modern amenities for an elevated living experience.',
    location: 'KG 14 Ave, Kigali-Gisozi, Rwanda',
    dateStart: '08/08/2023',
    dateEnd: '12/05/2024',
    scope: 'Residential Complex Development',
    slug: 'harbor-view-residences',
    image:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    title: 'Sunset Ridge Development',
    description:
      'A premium residential community designed for modern living, offering breathtaking views and exceptional amenities.',
    location: 'KN 5 Rd, Nyamirambo, Kigali, Rwanda',
    dateStart: '01/02/2023',
    dateEnd: '02/01/2024',
    scope: 'Mixed-Use Estate Development',
    slug: 'sunset-ridge-development',
    image:
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    title: 'Kigali Trade Centre',
    description:
      'A state-of-the-art commercial hub designed to support Rwanda\'s growing business ecosystem with world-class facilities.',
    location: 'KG 7 Ave, Kacyiru, Kigali, Rwanda',
    dateStart: '03/01/2022',
    dateEnd: '11/30/2023',
    scope: 'Commercial Construction',
    slug: 'kigali-trade-centre',
    image:
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=900&q=80',
  },
]

// ── Detail row inside each card ───────────────────────────────
function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <Icon size={15} className="text-gray-400 mt-0.5 shrink-0" />
      <span className="text-sm text-gray-400 w-16 shrink-0">{label}</span>
      <span className="text-sm text-gray-800 font-medium">{value}</span>
    </div>
  )
}

// ── Single project card — alternating layout ──────────────────
function ProjectCard({ project, index }) {
  const isEven = index % 2 === 0   // even → text left, image right

  return (
    <div className={`flex flex-col lg:flex-row gap-10 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>

      {/* Text side */}
      <div className="flex-1 space-y-4">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{project.title}</h3>
        <p className="text-gray-500 leading-relaxed">{project.description}</p>

        <div className="mt-4">
          <DetailRow icon={MapPin}   label="Location:" value={project.location} />
          <DetailRow icon={Calendar} label="Date:"     value={`${project.dateStart} – ${project.dateEnd}`} />
          <DetailRow icon={Layers}   label="Scope:"    value={project.scope} />
        </div>

        <Link
          to={`/projects/${project.slug}`}
          className="inline-flex items-center gap-2 mt-4 bg-orange-500 text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-orange-400 transition-colors shadow-md shadow-orange-500/20"
        >
          See More <ArrowRight size={15} />
        </Link>
      </div>

      {/* Image side */}
      <div className="flex-1 w-full">
        <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
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

// ── FeaturedProjects section ──────────────────────────────────
export default function FeaturedProjects() {
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

        {/* Project cards with dividers */}
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
