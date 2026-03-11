import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X, HardHat } from 'lucide-react'
import { navLinks, companyInfo } from '../../constants/siteConfig'

// ── DropdownMenu ─────────────────────────────────────────────
// Renders the dropdown panel for nav items that have children
function DropdownMenu({ items }) {
  return (
    <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}

// ── NavItem ───────────────────────────────────────────────────
// A single nav link — with or without a dropdown
function NavItem({ link, isActive }) {
  const [open, setOpen] = useState(false)
  const hasDropdown = link.dropdown && link.dropdown.length > 0

  return (
    <div
      className="relative"
      onMouseEnter={() => hasDropdown && setOpen(true)}
      onMouseLeave={() => hasDropdown && setOpen(false)}
    >
      <Link
        to={link.href}
        className={`flex items-center gap-1 text-sm font-medium transition-colors
          ${isActive ? 'text-amber-400' : 'text-white/90 hover:text-amber-400'}`}
      >
        {link.label}
        {hasDropdown && <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />}
      </Link>

      {/* Dropdown panel */}
      {hasDropdown && open && <DropdownMenu items={link.dropdown} />}
    </div>
  )
}

// ── Navbar ────────────────────────────────────────────────────
// Transparent on hero, sticks to top. Fully responsive.
export default function Navbar({ transparent = false }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const isActive = (href) => location.pathname === href

  return (
    <header
      className={`w-full z-40 ${
        transparent
          ? 'absolute top-0 left-0 bg-transparent'
          : 'sticky top-0 bg-gray-900 shadow-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo — swap inner div with <img src={logo} alt="Civion" /> from DB */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:bg-orange-400 transition-colors">
              <HardHat size={18} className="text-white" />
            </div>
            <span className="text-white font-extrabold text-lg tracking-tight">
              {companyInfo.name}
              <span className="text-orange-400">.</span>
            </span>
          </Link>

          {/* Desktop nav links — hidden on mobile */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavItem key={link.href} link={link} isActive={isActive(link.href)} />
            ))}
          </nav>

          {/* Desktop CTA buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contact"
              className="text-sm font-medium text-white/90 hover:text-amber-400 transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/contact"
              className="text-sm font-semibold bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-400 transition-colors shadow-md shadow-orange-500/30"
            >
              {companyInfo.ctaLabel}
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-gray-900 border-t border-white/10 px-4 pb-6 pt-4 space-y-4">
          {navLinks.map((link) => (
            <div key={link.href}>
              <Link
                to={link.href}
                className="block text-white/90 font-medium py-2 hover:text-amber-400 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
              {/* Mobile dropdown items */}
              {link.dropdown && (
                <div className="pl-4 space-y-1 mt-1">
                  {link.dropdown.map((child) => (
                    <Link
                      key={child.href}
                      to={child.href}
                      className="block text-white/60 text-sm py-1 hover:text-amber-400 transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <Link
              to="/contact"
              className="text-white/90 font-medium hover:text-amber-400 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/contact"
              className="text-center bg-orange-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-orange-400 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {companyInfo.ctaLabel}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
