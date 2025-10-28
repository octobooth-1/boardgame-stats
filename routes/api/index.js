const express = require('express')
const router = express.Router()
const gameRoutes = require('./games')
const playRoutes = require('./plays')
const playerRoutes = require('./players')
const generatorRoutes = require('./generators')
const metricsRoutes = require('./metrics')

router.use('/games', gameRoutes)
router.use('/plays', playRoutes)
router.use('/players', playerRoutes)
router.use('/generators', generatorRoutes)
router.use('/metrics', metricsRoutes)

module.exports = router
