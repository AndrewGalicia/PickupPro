const express = require('express');
const gamesCtrl = require('../../controllers/api/games');

const router = express.Router();

// All paths start with '/api/games'
// POST /api/games (create a game)
router.post('/', gamesCtrl.createGame);
// GET /api/games (index all games)
router.get('/', gamesCtrl.getAll);
// GET /api/games/:id (get a specific game by ID)
router.get('/:id', gamesCtrl.getById);
// PUT /api/games/:id (update a game)
router.put('/:id', gamesCtrl.updateGame);

module.exports = router;
