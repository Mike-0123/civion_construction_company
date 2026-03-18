import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

import Layout from './components/layout/Layout'

// Admin
import AdminLayout    from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProjects  from './pages/admin/AdminProjects'
import AdminExpenses  from './pages/admin/AdminExpenses'
import AdminSettings  from './pages/admin/AdminSettings'

// Pages
import Home         from './pages/Home'
import About        from './pages/About'
import Services     from './pages/Services'
import Projects     from './pages/Projects'
import Blog         from './pages/Blog'
import Contact      from './pages/Contact'
import Careers      from './pages/Careers'
import Testimonials from './pages/Testimonials'
import Legal        from './pages/Legal'
import Login        from './pages/Login'
import NotFound     from './pages/NotFound'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 1000 * 60 * 5 },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>

          {/* ── Home (bare layout — hero manages its own navbar) ── */}
          <Route path="/"  element={<Layout bare><Home /></Layout>} />

          {/* ── About ── */}
          <Route path="/about"       element={<Layout><About /></Layout>} />
          <Route path="/about/story" element={<Layout><About /></Layout>} />
          <Route path="/about/team"  element={<Layout><About /></Layout>} />

          {/* ── Services ── */}
          <Route path="/services"              element={<Layout><Services /></Layout>} />
          <Route path="/services/home-builds"  element={<Layout><Services /></Layout>} />
          <Route path="/services/renovations"  element={<Layout><Services /></Layout>} />
          <Route path="/services/commercial"   element={<Layout><Services /></Layout>} />
          <Route path="/services/roofing"      element={<Layout><Services /></Layout>} />
          <Route path="/services/residential"  element={<Layout><Services /></Layout>} />
          <Route path="/services/roads"        element={<Layout><Services /></Layout>} />
          <Route path="/services/renovation"   element={<Layout><Services /></Layout>} />
          <Route path="/services/management"   element={<Layout><Services /></Layout>} />

          {/* ── Projects ── */}
          <Route path="/projects"                element={<Layout><Projects /></Layout>} />
          <Route path="/projects/residential"    element={<Layout><Projects /></Layout>} />
          <Route path="/projects/commercial"     element={<Layout><Projects /></Layout>} />
          <Route path="/projects/case-studies"   element={<Layout><Projects /></Layout>} />

          {/* ── Other pages ── */}
          <Route path="/blog"          element={<Layout><Blog /></Layout>} />
          <Route path="/contact"       element={<Layout><Contact /></Layout>} />
          <Route path="/careers"       element={<Layout><Careers /></Layout>} />
          <Route path="/testimonials"  element={<Layout><Testimonials /></Layout>} />

          {/* ── Legal ── */}
          <Route path="/privacy" element={
            <Layout>
              <Legal title="Privacy Policy">
                <p>We are committed to protecting your personal information. This policy explains how Civion collects, uses, and safeguards your data when you use our website or services.</p>
                <p>We collect information you provide directly (such as contact form submissions) and basic analytics data. We never sell your data to third parties.</p>
                <p>For questions about this policy, contact us at <a href="mailto:info@civion.com" className="text-orange-500 hover:underline">info@civion.com</a>.</p>
              </Legal>
            </Layout>
          } />
          <Route path="/cookies" element={
            <Layout>
              <Legal title="Cookie Policy">
                <p>Our website uses cookies to improve your browsing experience. Cookies are small files stored on your device that help us understand how visitors use the site.</p>
                <p>We use essential cookies (required for the site to work) and analytics cookies (to understand traffic). You can disable cookies in your browser settings at any time.</p>
              </Legal>
            </Layout>
          } />
          <Route path="/sitemap" element={
            <Layout>
              <Legal title="Sitemap">
                <ul className="space-y-2 list-disc pl-5">
                  {['/', '/about', '/services', '/projects', '/blog', '/contact', '/careers', '/testimonials'].map((p) => (
                    <li key={p}><a href={p} className="text-orange-500 hover:underline">{p}</a></li>
                  ))}
                </ul>
              </Legal>
            </Layout>
          } />

          {/* ── Auth ── */}
          <Route path="/login" element={<Layout><Login /></Layout>} />

          {/* ── Admin Dashboard ── */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index                element={<AdminDashboard />} />
            <Route path="projects"      element={<AdminProjects />} />
            <Route path="expenses"      element={<AdminExpenses />} />
            <Route path="settings"      element={<AdminSettings />} />
          </Route>

          {/* ── 404 — must be last ── */}
          <Route path="*" element={<Layout><NotFound /></Layout>} />

        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
