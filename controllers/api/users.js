const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');

module.exports = {
  create,
  login,
  checkToken,
  updateProfile
};

function checkToken(req, res) {
  res.json(req.exp);
}

async function create(req, res) {
  try {
    // Add the user to the db
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error('User not found');
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error('Invalid password');
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json('Bad Credentials');
  }
}
// controllers/profile.js

async function updateProfile(req, res) {
  try {
    const { username, firstName, lastName, email, password, instagram, city, skillLevel } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { username, firstName, lastName, email, password, instagram, city, skillLevel },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
}

/*--- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}
