export default function Testimonials() {
  const reviews = [
    { id: 1, name: 'Emmanuel Nkurunziza', role: 'Homeowner, Kigali', rating: 5, text: 'Civion built our dream home on schedule and within budget. The quality is exceptional — every detail was perfect.' },
    { id: 2, name: 'Grace Uwimana', role: 'CEO, Kigali Retail Group', rating: 5, text: 'Their commercial construction team is world-class. Professional, punctual, and truly outstanding craftsmanship.' },
    { id: 3, name: 'Jean-Paul Habimana', role: 'Property Developer', rating: 5, text: 'We have worked with Civion on three projects. Each time they exceed our expectations. Highly recommended.' },
  ]

  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Client Testimonials</h1>
      <p className="text-gray-500 text-lg mb-12 max-w-2xl">
        Don't take our word for it — hear from the clients we've built for.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <div key={r.id} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex gap-1 mb-4">
              {Array.from({ length: r.rating }).map((_, i) => (
                <span key={i} className="text-orange-400 text-lg">★</span>
              ))}
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">"{r.text}"</p>
            <div>
              <p className="font-bold text-gray-900">{r.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{r.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
