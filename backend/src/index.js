require('dotenv').config()
const express = require('express')
const cors    = require('cors')

const projectRoutes = require('./routes/projects')

const app  = express()
const PORT = process.env.PORT || 5000

// ── Middleware ─────────────────────────────────────────────────
app.use(cors({ origin: 'http://localhost:3000' }))  // allow frontend
app.use(express.json())

// ── Routes ─────────────────────────────────────────────────────
app.use('/api/projects', projectRoutes)

// ── Health check ───────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Civion API is running' })
})

// ── Start server ───────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Civion backend running on http://localhost:${PORT}`)
})
