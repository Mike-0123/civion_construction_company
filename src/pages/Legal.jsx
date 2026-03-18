import { companyInfo } from '../constants/siteConfig'

// Reusable legal page — pass `title` and `children` as props
export default function Legal({ title, children }) {
  return (
    <div className="py-12 max-w-3xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: March 2026 · {companyInfo.name} Construction Company Ltd</p>
      <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-6">
        {children}
      </div>
    </div>
  )
}
