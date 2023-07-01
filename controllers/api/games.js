const Game = require('../../models/game');

// POST /api/games
const createGame = async (req, res) => {
  try {
    const { title, date, skillLevelRequirement, address, city } = req.body;

    const newGame = new Game({
      title,
      date,
      skillLevelRequirement,
      address,
      city,
      // admin: req.user._id, // Assuming you have implemented user authentication and have access to the logged-in user ID
      participants: [], // Initially, no participants are added
    });

    const savedGame = await newGame.save();

    res.status(201).json(savedGame);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

async function getAll(req, res) {
  const games = await Game.find({})
  res.json(games)
}

async function getById(req, res) {
  const game = await Game.findById(req.params.id);
  res.json(game);
}

module.exports = {
  createGame,
  getAll,
  getById
};
