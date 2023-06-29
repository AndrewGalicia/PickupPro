const express = require('express');
const gamesCtrl = require('../../controllers/api/games');

const router = express.Router();

// All paths start with '/api/users'
// POST /api/users (create a user - sign up)
router.post('/', gamesCtrl.create);