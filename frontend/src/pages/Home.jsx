import Hero from '../components/sections/Hero'

// ── Home page ─────────────────────────────────────────────────
// The Hero component takes an optional bgImage prop.
// When your backend is ready, fetch the image URL like this:
//
//   const { data } = useQuery('siteSettings', () => api.get('/site-settings'))
//   <Hero bgImage={data?.heroBgImage} />
//
// For now, the gradient fallback is used automatically.

export default function Home() {
  return (
    <>
      <Hero />
      {/* Add more sections below the hero as you build the page */}
      {/* <ServicesSection /> */}
      {/* <ProjectsSection /> */}
      {/* <TestimonialsSection /> */}
      {/* <ContactSection /> */}
    </>
  )
}
