import { Link } from 'react-router-dom'
import { Home, Building2, Layers, ClipboardList, Wrench, ArrowUpRight } from 'lucide-react'
import { companyInfo } from '../../constants/siteConfig'

// ── Services data ─────────────────────────────────────────────
// DB table: services — GET /api/services (replace with useQuery when backend ready)
const serviceCards = [
  {
    id: 1,
    icon: Home,
    title: 'Custom Home Builds',
    description: 'Bespoke homes designed for your lifestyle, built to the highest standard with local expertise.',
    link: '/services/home-builds',
    linkLabel: 'Explore Our Home Designs',
  },
  {
    id: 2,
    icon: Building2,
    title: 'Commercial Construction',
    description: 'Durable, code-compliant commercial spaces — from fit-outs to ground-up builds across Africa.',
    link: '/services/commercial',
    linkLabel: 'View Commercial Portfolio',
  },
  {
    id: 3,
    icon: Layers,
    title: 'Renovations & Extensions',
    description: 'Transform your existing space with seamless, stress-free remodels and extensions.',
    link: '/services/renovations',
    linkLabel: 'Get a Renovation Quote',
  },
  {
    id: 4,
    icon: ClipboardList,
    title: 'Project Management',
    description: 'Full-service oversight — we handle permits, timelines and budgets so you don\'t have to.',
    link: '/services/management',
    linkLabel: 'Learn How We Work',
  },
  {
    id: 5,
    icon: Wrench,
    title: 'Roofing & Structural Repairs',
    description: 'Storm-proof solutions and structural repairs backed by quality guarantees.',
    link: '/services/roofing',
    linkLabel: 'Schedule an Inspection',
  },
]

// ── ServicesSection ───────────────────────────────────────────
export default function ServicesSection() {
  return (
    <section className="bg-gray-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <Link
            to="/services"
            className="inline-flex items-center gap-1 text-sm text-white/60 underline underline-offset-4 hover:text-white transition-colors mb-5"
          >
            Our Services <ArrowUpRight size={13} />
          </Link>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight max-w-3xl mx-auto">
            {companyInfo.name}'s Most Trusted Construction<br className="hidden sm:block" /> Services — Built for You
          </h2>
          <p className="text-gray-400 mt-5 text-lg max-w-xl mx-auto">
            From residential homes to large-scale infrastructure, we deliver precision craftsmanship with local expertise.
          </p>
        </div>

        {/* Body: image + service cards grid */}
        <div className="grid gap-4 lg:grid-cols-[1fr_1.6fr]">

          {/* Left — architect image */}
          <div className="relative rounded-2xl overflow-hidden min-h-72 lg:min-h-0">
            <img
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80"
              alt="Civion engineer reviewing blueprints"
              className="w-full h-full object-cover"
            />
            {/* subtle overlay so it blends with dark bg */}
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Right — 2-col service cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
            {serviceCards.map((s) => {
              const Icon = s.icon
              return (
                <div
                  key={s.id}
                  className="bg-gray-900 border border-white/5 rounded-2xl p-6 flex flex-col gap-3 hover:border-orange-500/30 transition-colors group"
                >
                  <div className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-orange-500/10 transition-colors">
                    <Icon size={18} className="text-white/60 group-hover:text-orange-400 transition-colors" />
                  </div>
                  <h3 className="text-white font-semibold text-base leading-snug">{s.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed flex-1">{s.description}</p>
                  <Link
                    to={s.link}
                    className="inline-flex items-center gap-1 text-xs text-white/50 hover:text-orange-400 underline underline-offset-2 transition-colors"
                  >
                    {s.linkLabel} <ArrowUpRight size={11} />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
