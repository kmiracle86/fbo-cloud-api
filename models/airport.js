
import mongoose from 'mongoose';

const { Schema } = mongoose;

// (IATA: PBI, ICAO: KPBI, FAA LID: PBI)
const AirportSchema = new Schema({
  iata: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  icao: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  lid: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
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

AirportSchema.pre('save', function saveCB(next) {
  if (!this.isNew) {
    this.modified = new Date();
  }
  next();
});

AirportSchema.methods.toJSON = function toJSON() {
  return ({
    id: this._id,
    name: this.name,
    description: this.description,
    city: this.city,
    state: this.state,
    iata: this.iata.toUpperCase(),
    icao: this.icao.toUpperCase(),
    lid: this.lid.toUpperCase(),
  });
};

export default mongoose.model('Airport', AirportSchema);
