import mongoose from 'mongoose';

const { Schema } = mongoose;

const AircraftSchema = new Schema({
  base: {
    type: Schema.Types.ObjectId,
    ref: 'Airport',
    required: true,
  },
  color: String,
  description: String,
  manufacturer: {
    type: String,
    required: true,
  },
  rate: {
    type: Schema.Types.Decimal,
    required: true,
  },
  registration: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  type: {
    type: String,
    required: true,
    lowercase: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  modified: {
    type: Date,
    default: Date.now,
  },
});

AircraftSchema.pre('save', function saveCB(next) {
  if (!this.isNew) {
    this.modified = new Date();
  }
  next();
});

export default mongoose.model('Aircraft', AircraftSchema);
