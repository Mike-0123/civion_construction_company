import { teamMembers, companyInfo } from '../constants/siteConfig'

export default function About() {
  return (
    <div className="py-12">
      {/* Mission */}
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Civion</h1>
        <p className="text-gray-500 text-lg leading-relaxed">{companyInfo.description}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16">
        {[
          { value: '15+', label: 'Years Experience' },
          { value: '200+', label: 'Projects Completed' },
          { value: companyInfo.specialistsCount + '+', label: 'Specialists' },
          { value: '100%', label: 'Client Satisfaction' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
            <p className="text-3xl font-extrabold text-orange-500">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Team */}
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Meet the Team</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
            <img
              src={member.avatar}
              alt={member.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover ring-4 ring-orange-100"
            />
            <p className="font-bold text-gray-900">{member.name}</p>
            <p className="text-sm text-orange-500 mt-0.5">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
