const express = require('express')
const router = express.Router()
const gamesRoutes = require('./games')
const playersRoutes = require('./players')
const playsRoutes = require('./plays')
const generatorsRoutes = require('./generators')
const metricsRoutes = require('./metrics')

// Attach sub-routes
router.use('/games', gamesRoutes)
router.use('/players', playersRoutes)
router.use('/plays', playsRoutes)
router.use('/generators', generatorsRoutes)
router.use('/metrics', metricsRoutes)

// Render the home page for the root route
router.get('/', (req, res) => {
	res.render('index')
})

module.exports = router
