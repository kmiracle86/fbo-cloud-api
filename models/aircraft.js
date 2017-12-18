import mongoose from 'mongoose';

const { Schema } = mongoose;

const AircraftSchema = new Schema({
  registration: String,
  description: String,
  color: String,
});

AircraftSchema.pre('save', () => {
});

export default mongoose.model('Aircraft', AircraftSchema);
