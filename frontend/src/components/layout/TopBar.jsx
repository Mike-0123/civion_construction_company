import { Phone, MapPin, Mail } from 'lucide-react'
import { companyInfo } from '../../constants/siteConfig'

// ── TopBar ────────────────────────────────────────────────────
// Fixed thin bar that always sits at the very top of the screen.
// Shows phone, address, and email — pulled from siteConfig.
// When backend is ready, these values come from GET /api/site-settings
//   → companyInfo.phone / .address / .email
//
// Height: 40px (h-10). Both Hero and Layout add pt-10 to clear this bar.

export default function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-10 bg-gray-950 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center sm:justify-between">

        {/* Left — hidden on very small screens to avoid overflow */}
        <div className="hidden sm:flex items-center gap-6">

          {/* Phone — links to tel: */}
          <a
            href={`tel:${companyInfo.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-1.5 text-white/60 text-xs hover:text-orange-400 transition-colors"
          >
            <Phone size={11} className="text-orange-400 shrink-0" />
            <span>{companyInfo.phone}</span>
          </a>

          {/* Address */}
          <div className="flex items-center gap-1.5 text-white/60 text-xs">
            <MapPin size={11} className="text-orange-400 shrink-0" />
            <span>{companyInfo.address}</span>
          </div>
        </div>

        {/* Right — email always visible, centered on mobile */}
        <a
          href={`mailto:${companyInfo.email}`}
          className="flex items-center gap-1.5 text-white/60 text-xs hover:text-orange-400 transition-colors"
        >
          <Mail size={11} className="text-orange-400 shrink-0" />
          <span>{companyInfo.email}</span>
        </a>

      </div>
    </div>
  )
}
