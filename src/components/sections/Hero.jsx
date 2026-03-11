import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Star } from 'lucide-react'
import { companyInfo, reviewSources, trustedBrands, teamMembers } from '../../constants/siteConfig'
import Navbar from '../layout/Navbar'

// ── StarRating ────────────────────────────────────────────────
// Renders filled/half stars based on a rating number
function StarRating({ rating, color = 'text-amber-400' }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5

  return (
    <div className={`flex items-center gap-0.5 ${color}`}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={i} size={14} fill="currentColor" />
      ))}
      {half && <Star size={14} fill="currentColor" className="opacity-50" />}
    </div>
  )
}

// ── ReviewBadge ───────────────────────────────────────────────
// Single review platform badge (Reviews.io / Trustpilot)
function ReviewBadge({ source }) {
  const isGreen = source.platform === 'Trustpilot'

  return (
    <div className="flex flex-col gap-1">
      <StarRating
        rating={source.rating}
        color={isGreen ? 'text-green-400' : 'text-amber-400'}
      />
      <p className="text-white/70 text-xs">
        {source.rating}/5 ({source.reviewCount} Reviews)
      </p>
      <div className="flex items-center gap-1">
        {/* Platform icon placeholder — swap with actual logo from DB/CDN */}
        <div className={`w-4 h-4 rounded-full ${isGreen ? 'bg-green-400' : 'bg-amber-400'} flex items-center justify-center`}>
          <span className="text-[8px] font-bold text-gray-900">
            {source.platform.charAt(0)}
          </span>
        </div>
        <span className="text-white/80 text-xs font-medium">{source.platform}</span>
      </div>
    </div>
  )
}

// ── SpecialistAvatars ─────────────────────────────────────────
// Stack of real team member photos. Fetched from teamMembers in siteConfig.
// When backend is ready: useQuery('team', () => api.get('/team?featured=true'))
function SpecialistAvatars() {
  return (
    <div className="flex items-center gap-3">
      {/* Stacked real photo avatars */}
      <div className="flex -space-x-3">
        {teamMembers.map((member, i) => (
          <img
            key={member.id}
            src={member.avatar}
            alt={member.name}
            title={`${member.name} — ${member.role}`}
            className="w-9 h-9 rounded-full border-2 border-gray-900 object-cover"
            style={{ zIndex: teamMembers.length - i }}
          />
        ))}
      </div>
      {/* Text */}
      <div>
        <p className="text-white text-xs font-semibold">
          {companyInfo.specialistsCount}+ Construction Specialists
        </p>
        <p className="text-white/60 text-xs">Dedicated to Your Project's Success</p>
      </div>
    </div>
  )
}

// ── TrustedBrands ─────────────────────────────────────────────
// Logo row at the bottom of the hero
function TrustedBrands() {
  return (
    <div className="border-t border-white/10 pt-6 mt-6">
      <p className="text-white/50 text-xs mb-4">Trusted by hundreds of companies</p>
      <div className="flex flex-wrap items-center gap-6">
        {trustedBrands.map((brand) => (
          <div
            key={brand.name}
            className="h-7 w-24 bg-white/10 rounded flex items-center justify-center"
          >
            {/* Replace with: <img src={brand.logo} alt={brand.name} className="h-6 object-contain" /> */}
            <span className="text-white/40 text-xs">{brand.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Hero ──────────────────────────────────────────────────────
// bgImage defaults to companyInfo.heroBgImage (Unsplash).
// When backend is ready, override by passing the DB URL as a prop:
//   <Hero bgImage={siteSettings.heroBgImage} />
export default function Hero({ bgImage = companyInfo.heroBgImage }) {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    // TODO: wire to POST /api/consultations or POST /api/leads
    console.log('Booking consultation for:', email)
    setEmail('')
    // toast.success('We will be in touch soon!')
  }

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark gradient overlay — keeps text readable over any photo */}
      <div className="absolute inset-0 bg-linear-to-r from-gray-950/92 via-gray-900/80 to-gray-900/30" />

      {/*
        Spacer clears the fixed TopBar (h-10 = 40px).
        The Navbar then sits flush below it.
      */}
      <div className="h-10 shrink-0" />

      {/* Navbar sits INSIDE the hero so it floats over the background */}
      <div className="relative z-10">
        <Navbar transparent />
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">

          {/* Two-column layout: content left, worker photo right */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* ── Left column ── */}
            <div className="space-y-8">

              {/* Hiring badge */}
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
                <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {companyInfo.hiringLabel}
                </span>
                <Link
                  to={companyInfo.hiringLink}
                  className="text-white/80 text-sm hover:text-orange-400 transition-colors"
                >
                  {companyInfo.hiringLinkLabel}
                </Link>
              </div>

              {/* What we do — instantly clear to a first-time visitor */}
              <div className="space-y-2">
                <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest">
                  Construction & Structural Engineering
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-white leading-tight">
                  We Build{' '}
                  <span className="text-orange-400">Homes, Roads</span>
                  {' '}&{' '}
                  <span className="text-orange-400">Commercial Structures</span>
                  {' '}Across {companyInfo.location}
                </h1>
              </div>

              {/* Description — from companyInfo.description in siteConfig */}
              <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-xl">
                {companyInfo.description}
              </p>

              {/* What we deliver — quick visual proof for first-time visitors */}
              <div className="flex flex-wrap gap-3">
                {['Residential Builds', 'Commercial Projects', 'Roads & Infrastructure', 'Renovations'].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium text-white/80 bg-white/10 border border-white/15 rounded-full px-3 py-1"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>

              {/* Email + CTA form — POST /api/leads on submit */}
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg">
                <div className="flex-1 flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-3">
                  <Mail size={16} className="text-white/50 shrink-0" />
                  <input
                    type="email"
                    placeholder="Enter email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent text-white placeholder-white/40 text-sm flex-1 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-orange-500 text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-orange-400 transition-colors whitespace-nowrap shadow-lg shadow-orange-500/30"
                >
                  {companyInfo.ctaLabel}
                </button>
              </form>

              {/* Real team avatars */}
              <SpecialistAvatars />

              {/* Review platform badges */}
              <div className="flex flex-wrap gap-8">
                {reviewSources.map((source) => (
                  <ReviewBadge key={source.platform} source={source} />
                ))}
              </div>
            </div>

            {/* ── Right column — African construction worker photo ── */}
            <div className="hidden lg:flex justify-end items-end h-full">
              {/*
                Confident construction engineer: hard hat, smiling, holding blueprints.
                URL → companyInfo.heroWorkerImage in siteConfig (swap from DB when ready).
              */}
              <div className="relative">

                {/* Orange ambient glow */}
                <div className="absolute -bottom-6 -right-6 w-80 h-80 bg-orange-500/25 rounded-full blur-3xl" />

                {/* Main engineer photo — object-center shows blueprints in hand */}
                <img
                  src={companyInfo.heroWorkerImage}
                  alt="Civion construction engineer holding architectural blueprints"
                  className="relative w-72 lg:w-80 xl:w-96 h-120 object-cover object-center rounded-3xl border border-white/10 shadow-2xl"
                />

                {/* Blueprint / architectural drawing badge — top right corner */}
                <div className="absolute -top-4 -right-4 bg-gray-900 border border-orange-500/40 rounded-2xl px-3 py-2 shadow-xl flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center shrink-0">
                    {/* Blueprint grid icon made with SVG */}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-orange-400">
                      <rect x="1" y="1" width="14" height="14" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                      <line x1="1" y1="5.5" x2="15" y2="5.5" stroke="currentColor" strokeWidth="0.8"/>
                      <line x1="1" y1="10.5" x2="15" y2="10.5" stroke="currentColor" strokeWidth="0.8"/>
                      <line x1="5.5" y1="1" x2="5.5" y2="15" stroke="currentColor" strokeWidth="0.8"/>
                      <line x1="10.5" y1="1" x2="10.5" y2="15" stroke="currentColor" strokeWidth="0.8"/>
                      <rect x="3" y="3" width="4" height="4" fill="currentColor" fillOpacity="0.3"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">Architectural</p>
                    <p className="text-orange-400 text-xs">Blueprint Design</p>
                  </div>
                </div>

                {/* Projects delivered badge — bottom left */}
                <div className="absolute -bottom-5 -left-6 bg-white rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-orange-500 text-lg">🏗️</span>
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold text-sm">250+ Projects</p>
                    <p className="text-gray-500 text-xs">Delivered on time</p>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Trusted partners bar */}
          <TrustedBrands />
        </div>
      </div>
    </section>
  )
}
