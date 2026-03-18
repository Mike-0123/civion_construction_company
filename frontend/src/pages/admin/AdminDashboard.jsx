import { FolderKanban, CheckCircle, Clock, PauseCircle } from 'lucide-react'
import useProjectsStore from '../../store/projectsStore'

export default function AdminDashboard() {
  const projects = useProjectsStore((s) => s.projects)

  const stats = [
    { label: 'Total Projects', value: projects.length,                                            icon: FolderKanban, color: 'bg-blue-500'   },
    { label: 'In Progress',    value: projects.filter(p => p.status === 'In Progress').length,    icon: Clock,        color: 'bg-orange-500' },
    { label: 'Completed',      value: projects.filter(p => p.status === 'Completed').length,      icon: CheckCircle,  color: 'bg-green-500'  },
    { label: 'On Hold',        value: projects.filter(p => p.status === 'On Hold').length,        icon: PauseCircle,  color: 'bg-gray-400'   },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
            <div className={`${s.color} p-3 rounded-lg`}>
              <s.icon size={20} className="text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{s.value}</div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </div>
          </div>
        ))}

      </div>

      {/* Quick links */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <a href="/admin/projects" className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
            + Add New Project
          </a>
          <a href="/admin/expenses" className="bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
            + Log Expense
          </a>
        </div>
      </div>
    </div>
  )
}
