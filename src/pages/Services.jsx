import { Link } from 'react-router-dom'
import { services } from '../constants/siteConfig'

export default function Services() {
  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
      <p className="text-gray-500 text-lg mb-10 max-w-2xl">
        From residential homes to large-scale infrastructure, Civion delivers
        quality construction across every sector.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <Link
            key={s.id}
            to={s.href}
            className="block p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-orange-200 transition-all group"
          >
            <div className="w-10 h-10 bg-orange-100 rounded-xl mb-4 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
              <span className="text-orange-500 group-hover:text-white font-bold text-lg">{s.id}</span>
            </div>
            <h3 className="font-semibold text-gray-900 text-lg mb-1">{s.label}</h3>
            <span className="text-sm text-orange-500 font-medium">Learn more →</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
