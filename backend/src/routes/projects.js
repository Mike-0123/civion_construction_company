const express = require('express')
const { PrismaClient } = require('@prisma/client')

const router = express.Router()
const prisma = new PrismaClient()

// Helper: title → slug
function toSlug(title) {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

// ── GET /api/projects ─────────────────────────── get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    })
    res.json(projects)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ── GET /api/projects/featured ────────────────── homepage projects
router.get('/featured', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where:   { featured: true },
      orderBy: { createdAt: 'desc' },
    })
    res.json(projects)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ── GET /api/projects/:id ─────────────────────── single project
router.get('/:id', async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: Number(req.params.id) },
    })
    if (!project) return res.status(404).json({ error: 'Project not found' })
    res.json(project)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ── POST /api/projects ────────────────────────── create project
router.post('/', async (req, res) => {
  try {
    const { title, description, category, status, location, clientName,
            budget, startDate, endDate, progress, scope, image, featured } = req.body

    const project = await prisma.project.create({
      data: {
        title,
        description,
        category,
        status:    status    ?? 'Planning',
        location,
        clientName,
        budget:    budget    ? Number(budget) : null,
        startDate: startDate ? new Date(startDate) : null,
        endDate:   endDate   ? new Date(endDate)   : null,
        progress:  progress  ? Number(progress)    : 0,
        scope,
        image,
        slug:     toSlug(title),
        featured: featured ?? true,
      },
    })
    res.status(201).json(project)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ── PUT /api/projects/:id ─────────────────────── update project
router.put('/:id', async (req, res) => {
  try {
    const { title, description, category, status, location, clientName,
            budget, startDate, endDate, progress, scope, image, featured } = req.body

    const project = await prisma.project.update({
      where: { id: Number(req.params.id) },
      data: {
        title,
        description,
        category,
        status,
        location,
        clientName,
        budget:    budget    ? Number(budget) : null,
        startDate: startDate ? new Date(startDate) : null,
        endDate:   endDate   ? new Date(endDate)   : null,
        progress:  progress  ? Number(progress)    : 0,
        scope,
        image,
        slug:     title ? toSlug(title) : undefined,
        featured,
      },
    })
    res.json(project)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ── DELETE /api/projects/:id ──────────────────── delete project
router.delete('/:id', async (req, res) => {
  try {
    await prisma.project.delete({
      where: { id: Number(req.params.id) },
    })
    res.json({ message: 'Project deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
