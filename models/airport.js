
import mongoose from 'mongoose';

const { Schema } = mongoose;

const AirportSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  city: String,
  state: String,
  created: {
    type: Date,
    default: Date.now,
  },
  modified: {
    type: Date,
    default: Date.now,
  },
});

AirportSchema.pre('save', function saveCB(next) {
  if (!this.isNew) {
    this.modified = new Date();
  }
  next();
});

export default mongoose.model('Airport', AirportSchema);
