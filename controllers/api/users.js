const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');

module.exports = {
  create,
  login,
  checkToken
};

function checkToken(req, res) {
  console.log('req.user', req.user);
  res.json(req.exp);
}

async function create(req, res) {
  try {
    console.log('Create User Request:', req.body); // Log the request body
    // Add the user to the db
    const user = await User.create(req.body);
    console.log('User created:', user); // Log the created user object
    const token = createJWT(user);
    console.log('Token:', token); // Log the generated token
    res.json(token);
  } catch (err) {
    console.error('Create User Error:', err); // Log any error that occurred
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    console.log('Login Request:', req.body); // Log the request body
    const user = await User.findOne({ email: req.body.email });
    console.log('User found:', user); // Log the found user object
    if (!user) throw new Error('User not found');
    const match = await bcrypt.compare(req.body.password, user.password);
    console.log('Password match:', match); // Log the result of password comparison
    if (!match) throw new Error('Invalid password');
    const token = createJWT(user);
    console.log('Token:', token); // Log the generated token
    res.json(token);
  } catch (err) {
    console.error('Login Error:', err); // Log any error that occurred
    res.status(400).json('Bad Credentials');
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
