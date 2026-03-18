import { useState } from 'react'
import { Phone, MapPin, Mail } from 'lucide-react'
import { companyInfo } from '../constants/siteConfig'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    // wire to POST /api/contact when backend is ready
    console.log(form)
  }

  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
      <p className="text-gray-500 text-lg mb-12 max-w-2xl">
        Have a project in mind? Get in touch with our team and we'll get back to you within 24 hours.
      </p>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Contact info */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
              <Phone size={20} className="text-orange-500" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Phone</p>
              <a href={`tel:${companyInfo.phone}`} className="text-gray-500 hover:text-orange-500 transition-colors">
                {companyInfo.phone}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
              <MapPin size={20} className="text-orange-500" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Office</p>
              <p className="text-gray-500">{companyInfo.address}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
              <Mail size={20} className="text-orange-500" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Email</p>
              <a href={`mailto:${companyInfo.email}`} className="text-gray-500 hover:text-orange-500 transition-colors">
                {companyInfo.email}
              </a>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <textarea
            placeholder="Tell us about your project..."
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-semibold py-3 rounded-xl hover:bg-orange-400 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}
