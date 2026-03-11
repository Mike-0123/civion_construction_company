import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="text-center py-24">
      <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
      <p className="text-gray-500 text-xl mb-6">Page not found</p>
      <Link to="/" className="text-indigo-600 hover:underline">Go back home</Link>
    </div>
  )
}
