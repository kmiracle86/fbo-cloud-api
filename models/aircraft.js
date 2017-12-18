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
    type: Number,
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

AircraftSchema.methods.toJSON = function toJSON() {
  return ({
    id: this._id,
    base: this.base,
    color: this.color,
    description: this.description,
    manufacturer: this.manufacturer,
    rate: this.rate,
    registration: this.registration,
    type: this.type,
    created: this.created,
  });
};


AircraftSchema.pre('save', function saveCB(next) {
  if (!this.isNew) {
    this.modified = new Date();
  }
  next();
});

export default mongoose.model('Aircraft', AircraftSchema);
