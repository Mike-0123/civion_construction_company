import Hero from '../components/sections/Hero'
import AboutSection from '../components/sections/AboutSection'
import ServicesSection from '../components/sections/ServicesSection'
import FeaturedProjects from '../components/sections/FeaturedProjects'
import ContactSection from '../components/sections/ContactSection'

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <FeaturedProjects />
      <AboutSection />
      <ContactSection />
      {/* <TestimonialsSection /> */}
    </>
  )
}
