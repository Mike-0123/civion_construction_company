import { Link } from 'react-router-dom'
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  HardHat,
} from 'lucide-react'
import {
  companyInfo,
  footerQuickLinks,
  services,
  socialLinks,
  legalLinks,
} from '../../constants/siteConfig'

// ── Social icon map ───────────────────────────────────────────
// Maps platform name → lucide icon component
// Add more platforms here as needed
const SOCIAL_ICONS = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  // tiktok: TikTokIcon  ← lucide doesn't have TikTok yet, see below
}

// TikTok SVG (lucide doesn't include it)
function TikTokIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.94a8.23 8.23 0 0 0 4.81 1.54V7.04a4.85 4.85 0 0 1-1.04-.35z" />
    </svg>
  )
}

// ── SocialButton ──────────────────────────────────────────────
function SocialButton({ link }) {
  const Icon = SOCIAL_ICONS[link.platform]

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.label}
      className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:border-amber-400 hover:text-amber-400 transition-colors"
    >
      {link.platform === 'tiktok' ? (
        <TikTokIcon size={16} />
      ) : Icon ? (
        <Icon size={16} />
      ) : null}
    </a>
  )
}

// ── Footer ────────────────────────────────────────────────────
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gray-950 text-white">

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Main footer body ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-16">

          {/* Brand column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Logo — swap inner div with <img src={logo} alt="Civion" /> from DB */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                <HardHat size={18} className="text-white" />
              </div>
              <span className="text-white font-extrabold text-xl">
                {companyInfo.name}<span className="text-orange-400">.</span>
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              {companyInfo.tagline}
            </p>
          </div>

          {/* Quick links column */}
          <div>
            <h3 className="text-sm font-semibold text-white/90 uppercase tracking-widest mb-5">
              Quick links
            </h3>
            <ul className="space-y-3">
              {/* Data comes from footerQuickLinks in siteConfig — later: GET /api/footer-links */}
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-white/50 text-sm hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services column */}
          <div>
            <h3 className="text-sm font-semibold text-white/90 uppercase tracking-widest mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {/* Data comes from services in siteConfig — later: GET /api/services */}
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    to={service.href}
                    className="text-white/50 text-sm hover:text-amber-400 transition-colors"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="border-t border-white/10" />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">

          {/* Copyright + legal links */}
          <div className="flex flex-wrap items-center gap-2 text-white/40 text-xs">
            <span>© {currentYear} {companyInfo.name}</span>
            {legalLinks.map((link, i) => (
              <span key={link.href} className="flex items-center gap-2">
                <span>|</span>
                <Link
                  to={link.href}
                  className="hover:text-amber-400 transition-colors"
                >
                  [{link.label}]
                </Link>
              </span>
            ))}
          </div>

          {/* Social icons — data from socialLinks in siteConfig: later: GET /api/social-links */}
          <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <SocialButton key={link.platform} link={link} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
