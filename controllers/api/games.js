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

async function updateGame(req, res) {
  try {
    const { id } = req.params; // Get the game ID from the request params
    const updatedGame = req.body; // Get the updated game data from the request body

    console.log('Received game ID:', id);
    console.log('Received game data:', updatedGame);

    // Find the existing game document by ID and update it with the new data
    const result = await Game.findByIdAndUpdate(id, updatedGame, { new: true });

    console.log('Updated game result:', result);

    res.status(200).json(result); // Respond with the updated game document
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}


module.exports = {
  createGame,
  getAll,
  getById,
  updateGame
};
