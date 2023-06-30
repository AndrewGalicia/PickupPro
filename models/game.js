const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  skillLevelRequirement: {
    type: String,
    enum: ['beginner', 'casual', 'expert', 'pro'],
  },
  location: { type: String },
  participants: [{ type: String}],
});

module.exports = mongoose.model('Game', gameSchema);
