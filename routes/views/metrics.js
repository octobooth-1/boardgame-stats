const express = require('express')
const router = express.Router()
const { BASE_URL } = require('../../config')

router.get('/', async (req, res) => {
	try {
		const response = await fetch(`${BASE_URL}/api/metrics`)
		const metrics = await response.json()
		res.render('metrics/list', { metrics })
	} catch (error) {
		console.error('Error fetching metrics:', error)
		res.status(500).send('Error fetching metrics. Please try again later.')
	}
})

module.exports = router
