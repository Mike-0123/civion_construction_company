import { useState } from 'react'
import { Pencil, Trash2, Plus, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../services/api'

// ── API functions ─────────────────────────────────────────────
const fetchProjects    = ()           => api.get('/projects').then(r => r.data)
const createProjectAPI = (data)       => api.post('/projects', data).then(r => r.data)
const updateProjectAPI = ({ id, data }) => api.put(`/projects/${id}`, data).then(r => r.data)
const deleteProjectAPI = (id)         => api.delete(`/projects/${id}`).then(r => r.data)

const EMPTY_FORM = {
  title: '', description: '', category: 'Residential',
  status: 'Planning', location: '', clientName: '',
  budget: '', startDate: '', endDate: '', progress: 0,
  scope: '', image: '', featured: true,
}

const CATEGORIES = ['Residential', 'Commercial', 'Roads', 'Infrastructure', 'Renovation']
const STATUSES   = ['Planning', 'In Progress', 'On Hold', 'Completed']

const STATUS_COLORS = {
  'Planning':    'bg-blue-100 text-blue-700',
  'In Progress': 'bg-orange-100 text-orange-700',
  'On Hold':     'bg-gray-100 text-gray-600',
  'Completed':   'bg-green-100 text-green-700',
}

export default function AdminProjects() {
  const queryClient = useQueryClient()

  // ── Fetch all projects from PostgreSQL ────────────────────
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  })

  // ── Create ────────────────────────────────────────────────
  const createProject = useMutation({
    mutationFn: createProjectAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(['projects'])
      toast.success('Project created!')
      setShowModal(false)
    },
    onError: (err) => toast.error(err.response?.data?.error ?? 'Failed to create'),
  })

  // ── Update ────────────────────────────────────────────────
  const updateProject = useMutation({
    mutationFn: updateProjectAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(['projects'])
      toast.success('Project updated!')
      setShowModal(false)
    },
    onError: (err) => toast.error(err.response?.data?.error ?? 'Failed to update'),
  })

  // ── Delete ────────────────────────────────────────────────
  const deleteProject = useMutation({
    mutationFn: deleteProjectAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(['projects'])
      toast.success('Project deleted.')
      setDeleteConfirm(null)
    },
    onError: (err) => toast.error(err.response?.data?.error ?? 'Failed to delete'),
  })

  const [showModal, setShowModal]         = useState(false)
  const [editTarget, setEditTarget]       = useState(null)
  const [form, setForm]                   = useState(EMPTY_FORM)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  function openCreate() { setEditTarget(null); setForm(EMPTY_FORM); setShowModal(true) }
  function openEdit(p)  { setEditTarget(p); setForm({ ...p, startDate: p.startDate?.slice(0,10) ?? '', endDate: p.endDate?.slice(0,10) ?? '' }); setShowModal(true) }

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  function handleSave(e) {
    e.preventDefault()
    if (editTarget) {
      updateProject.mutate({ id: editTarget.id, data: form })
    } else {
      createProject.mutate(form)
    }
  }

  const isSaving = createProject.isPending || updateProject.isPending

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <button onClick={openCreate}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        {isLoading ? (
          <div className="text-center py-12 text-gray-400 text-sm animate-pulse">Loading projects from database...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Project', 'Category', 'Client', 'Status', 'Progress', 'Budget (RWF)', 'Featured', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {projects.map(p => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-semibold text-gray-900">{p.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{p.location}</div>
                  </td>
                  <td className="px-5 py-4 text-gray-600">{p.category}</td>
                  <td className="px-5 py-4 text-gray-600">{p.clientName}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[p.status] ?? 'bg-gray-100 text-gray-600'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 rounded-full" style={{ width: `${p.progress}%` }} />
                      </div>
                      <span className="text-xs text-gray-500">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-600">{Number(p.budget || 0).toLocaleString()}</td>
                  <td className="px-5 py-4 text-center">
                    <span className={`text-xs font-semibold ${p.featured ? 'text-green-600' : 'text-gray-400'}`}>
                      {p.featured ? '✓ Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg text-gray-500 hover:bg-orange-50 hover:text-orange-500 transition-colors"><Pencil size={15} /></button>
                      <button onClick={() => setDeleteConfirm(p)} className="p-1.5 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr><td colSpan={8} className="text-center py-12 text-gray-400">No projects yet. Click "Add Project" to create one.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">{editTarget ? 'Edit Project' : 'Add New Project'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="px-6 py-5 space-y-4">
              <Field label="Project Title *">
                <input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Harbor View Residences" className={inputCls} />
              </Field>
              <Field label="Description">
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Short project description..." rows={3} className={inputCls + ' resize-none'} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Category">
                  <select name="category" value={form.category} onChange={handleChange} className={inputCls}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Status">
                  <select name="status" value={form.status} onChange={handleChange} className={inputCls}>
                    {STATUSES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Location">
                  <input name="location" value={form.location} onChange={handleChange} placeholder="KG 14 Ave, Kigali" className={inputCls} />
                </Field>
                <Field label="Client Name">
                  <input name="clientName" value={form.clientName} onChange={handleChange} placeholder="Client or company name" className={inputCls} />
                </Field>
              </div>
              <Field label="Scope">
                <input name="scope" value={form.scope} onChange={handleChange} placeholder="e.g. Residential Complex Development" className={inputCls} />
              </Field>
              <Field label="Image URL">
                <input name="image" value={form.image} onChange={handleChange} placeholder="https://images.unsplash.com/..." className={inputCls} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Start Date">
                  <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className={inputCls} />
                </Field>
                <Field label="End Date">
                  <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className={inputCls} />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Budget (RWF)">
                  <input type="number" name="budget" value={form.budget} onChange={handleChange} placeholder="5000000" className={inputCls} />
                </Field>
                <Field label={`Progress: ${form.progress}%`}>
                  <input type="range" name="progress" min={0} max={100} value={form.progress} onChange={handleChange} className="w-full accent-orange-500 mt-2" />
                </Field>
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="accent-orange-500" />
                Show on homepage (Featured)
              </label>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={isSaving} className="px-5 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors disabled:opacity-60">
                  {isSaving ? 'Saving...' : editTarget ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <div className="text-red-500 mb-3"><Trash2 size={32} className="mx-auto" /></div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Project?</h3>
            <p className="text-gray-500 text-sm mb-6">"<strong>{deleteConfirm.title}</strong>" will be permanently removed.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteConfirm(null)} className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={() => deleteProject.mutate(deleteConfirm.id)} disabled={deleteProject.isPending}
                className="px-5 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-semibold disabled:opacity-60">
                {deleteProject.isPending ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const inputCls = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400'
function Field({ label, children }) {
  return <div><label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>{children}</div>
}
