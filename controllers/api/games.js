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

// GET /api/games
// const getAll = async (req, res) => {
//   try {
//     const games = await Game.find().populate('admin', 'username'); // Assuming the user's username is stored in the 'username' field of the User model

//     res.status(200).json(games);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server Error' });
//   }
// };

async function getAll(req, res) {
  const games = await Game.find({})
  res.json(games)
}

module.exports = {
  createGame,
  getAll,
};
