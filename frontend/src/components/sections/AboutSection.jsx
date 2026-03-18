import { Link } from 'react-router-dom'
import { companyInfo } from '../../constants/siteConfig'

// DB-ready: content pulls from siteConfig → replace with GET /api/about when backend is ready
const stats = [
  { value: '200+', label: 'Completed Projects' },
  { value: '15 Year', label: 'Structural Guarantees' },
  { value: '4.8/5', label: 'Client Rating' },
]

export default function AboutSection() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left — Text */}
        <div>
          <Link to="/about" className="text-orange-500 font-semibold text-sm tracking-wide uppercase hover:underline">
            About Us →
          </Link>

          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Built on Trust: Rwanda's Construction Partner for Africa
          </h2>

          <p className="mt-5 text-gray-600 leading-relaxed">
            Family-rooted and professionally driven, Civion has been building homes and businesses
            across Rwanda and Africa with pride for over 15 years. Our team of certified craftsmen
            combines traditional techniques with modern innovation to deliver world-class results.
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            From structural foundations to energy-efficient new builds, every project reflects our
            commitment to quality, transparency, and your complete satisfaction. We don't just
            construct buildings — we build relationships that last.
          </p>

          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Go to About Us Page →
          </Link>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap gap-6">
            {stats.map((s) => (
              <div key={s.label} className="bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 text-center min-w-[120px]">
                <div className="text-2xl font-bold text-orange-500">{s.value}</div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Images */}
        <div className="grid grid-cols-2 grid-rows-2 gap-3 h-[480px]">
          {/* Large left image */}
          <div className="row-span-2 rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80"
              alt="Civion construction engineer on site"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Top right */}
          <div className="rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80"
              alt="Civion team meeting"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Bottom right */}
          <div className="rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80"
              alt="Construction interior progress"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
