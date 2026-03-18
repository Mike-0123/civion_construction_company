export default function Blog() {
  const posts = [
    { id: 1, title: '5 Things to Know Before Starting a Home Build in Rwanda', date: 'March 10, 2026', category: 'Residential' },
    { id: 2, title: 'How Civion Delivers Commercial Projects On Time and On Budget', date: 'February 28, 2026', category: 'Commercial' },
    { id: 3, title: 'The Future of Infrastructure in East Africa', date: 'February 14, 2026', category: 'Infrastructure' },
  ]

  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog & Insights</h1>
      <p className="text-gray-500 text-lg mb-10 max-w-2xl">
        Construction tips, project stories, and industry insights from the Civion team.
      </p>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="h-44 bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
              <span className="text-orange-300 text-sm">Article image</span>
            </div>
            <div className="p-6">
              <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide">{post.category}</span>
              <h3 className="font-bold text-gray-900 mt-2 mb-3 leading-snug">{post.title}</h3>
              <p className="text-xs text-gray-400">{post.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
