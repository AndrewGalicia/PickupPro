const express = require('express');
const gamesCtrl = require('../../controllers/api/games');

const router = express.Router();

// All paths start with '/api/games'
// POST /api/games (create a game)
router.post('/', gamesCtrl.createGame);

// GET /api/games (index all games)
router.get('/', gamesCtrl.getGames);

module.exports = router;
