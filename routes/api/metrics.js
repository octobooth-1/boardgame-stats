const express = require('express')
const rateLimit = require('express-rate-limit')
const { getDbConnection } = require('../../database/connect')
const { rateLimitConfig } = require('../../config')

const router = express.Router()

const apiLimiter = rateLimit(rateLimitConfig)

router.use(apiLimiter)

// Get all metrics
router.get('/', async (req, res) => {
	try {
		const db = await getDbConnection()
		
		// Total games
		const totalGamesResult = await db.get('SELECT COUNT(*) as count FROM games')
		const totalGames = totalGamesResult.count
		
		// Total players
		const totalPlayersResult = await db.get('SELECT COUNT(*) as count FROM players')
		const totalPlayers = totalPlayersResult.count
		
		// Total plays
		const totalPlaysResult = await db.get('SELECT COUNT(*) as count FROM plays')
		const totalPlays = totalPlaysResult.count
		
		// Most played game
		const mostPlayedGameResult = await db.get(`
			SELECT g.title, g.bgg, COUNT(p.id) as play_count
			FROM games g
			LEFT JOIN plays p ON g.bgg = p.game_id
			GROUP BY g.bgg
			HAVING play_count > 0
			ORDER BY play_count DESC
			LIMIT 1
		`)
		
		// Most active player
		const mostActivePlayerResult = await db.get(`
			SELECT pl.name, pl.id, COUNT(pp.play_id) as play_count
			FROM players pl
			LEFT JOIN play_players pp ON pl.id = pp.player_id
			GROUP BY pl.id
			HAVING play_count > 0
			ORDER BY play_count DESC
			LIMIT 1
		`)
		
		const metrics = {
			totalGames,
			totalPlayers,
			totalPlays,
			mostPlayedGame: mostPlayedGameResult || { title: 'N/A', play_count: 0 },
			mostActivePlayer: mostActivePlayerResult || { name: 'N/A', play_count: 0 }
		}
		
		res.json(metrics)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

module.exports = router
