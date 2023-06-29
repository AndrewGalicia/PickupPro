const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  skillLevelRequirement: {
    type: String,
    enum: ['beginner', 'casual', 'expert', 'pro'],
  },
  location: {
    // You can adjust the location field based on your specific requirements
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    formattedAddress: String, // Optional field for storing the formatted address
  },
  admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

gameSchema.index({ location: '2dsphere' }); // Index for geospatial queries

module.exports = mongoose.model('Game', gameSchema);
