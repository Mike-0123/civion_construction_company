export default function Careers() {
  const openings = [
    { id: 1, title: 'Site Engineer', type: 'Full-time', location: 'Kigali, Rwanda' },
    { id: 2, title: 'Project Manager', type: 'Full-time', location: 'Kigali, Rwanda' },
    { id: 3, title: 'Structural Engineer', type: 'Full-time', location: 'Kigali, Rwanda' },
    { id: 4, title: 'Safety Officer', type: 'Full-time', location: 'Kigali, Rwanda' },
  ]

  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Careers at Civion</h1>
      <p className="text-gray-500 text-lg mb-12 max-w-2xl">
        Join a team of passionate builders shaping Africa's skyline. We are always
        looking for skilled, dedicated professionals.
      </p>
      <div className="space-y-4">
        {openings.map((job) => (
          <div key={job.id} className="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-orange-200 transition-colors">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{job.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{job.location} · {job.type}</p>
            </div>
            <a
              href={`mailto:info@civion.com?subject=Application for ${job.title}`}
              className="shrink-0 bg-orange-500 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-orange-400 transition-colors"
            >
              Apply Now
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
