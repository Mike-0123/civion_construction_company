import { useState } from 'react'
import { companyInfo } from '../../constants/siteConfig'

// DB-ready: form submission → POST /api/contact when backend is ready
export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', agreed: false })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: replace with POST /api/contact
    setSubmitted(true)
  }

  return (
    <section className="bg-gray-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-wide">
            ■ Contact With Us
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
            Start Your Project With Us
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            Let's turn your vision into reality. Whether you're planning a residential, commercial,
            or industrial project, our team is ready to guide you every step of the way.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left — Image */}
          <div className="rounded-2xl overflow-hidden h-[420px]">
            <img
              src="https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80"
              alt="Construction crane on site"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right — Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Send a message</h3>

            {submitted ? (
              <div className="text-center py-10">
                <div className="text-orange-500 text-4xl mb-3">✓</div>
                <p className="text-gray-700 font-semibold">Message sent!</p>
                <p className="text-gray-500 text-sm mt-1">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Enter your full name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jahidul Islam Jibon"
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Enter your email address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="demo@gmail.com"
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Enter your phone number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+800 1234 567 890"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Type Here"
                    rows={4}
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                  />
                </div>

                <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreed"
                    checked={form.agreed}
                    onChange={handleChange}
                    required
                    className="accent-orange-500"
                  />
                  I agree to the terms of service.
                </label>

                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-2.5 rounded-lg transition-colors text-sm"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
