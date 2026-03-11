import Navbar from './Navbar'
import Footer from './Footer'
import TopBar from './TopBar'

// ── Layout ────────────────────────────────────────────────────
// TopBar is ALWAYS rendered — it is fixed (z-50, h-10 = 40px).
// Everything else needs pt-10 to clear it.
//
// Two modes:
//   plain (default) — TopBar + sticky Navbar + padded content + Footer
//   bare             — TopBar only; Hero manages its own Navbar internally
//
// Usage:
//   <Layout>...</Layout>          ← inner pages (About, Login, Blog, etc.)
//   <Layout bare>...</Layout>     ← full-bleed hero pages (Home)

export default function Layout({ children, bare = false }) {
  if (bare) {
    // Hero pages: TopBar is fixed, hero section itself handles top padding
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <TopBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Fixed TopBar — h-10 (40px) */}
      <TopBar />
      {/* Spacer equal to TopBar height so sticky Navbar sits flush below it */}
      <div className="h-10" />
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}
