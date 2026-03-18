import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="text-center py-24">
      <p className="text-8xl font-extrabold text-orange-500 mb-4">404</p>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
      <p className="text-gray-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <Link
        to="/"
        className="inline-block bg-orange-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-orange-400 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}
