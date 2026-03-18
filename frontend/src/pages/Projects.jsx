export default function Projects() {
  const categories = ['All', 'Residential', 'Commercial', 'Infrastructure', 'Roads']

  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Projects</h1>
      <p className="text-gray-500 text-lg mb-8 max-w-2xl">
        Explore our portfolio of completed and ongoing construction projects across Africa.
      </p>
      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            className="px-5 py-2 rounded-full text-sm font-medium border border-gray-200 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors first:bg-orange-500 first:text-white first:border-orange-500"
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <span className="text-gray-400 text-sm">Project image coming soon</span>
            </div>
            <div className="p-5">
              <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide">Residential</span>
              <h3 className="font-bold text-gray-900 mt-1 mb-2">Project Title #{i}</h3>
              <p className="text-sm text-gray-500">Kigali, Rwanda · Completed 2024</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
