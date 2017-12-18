import mongoose from 'mongoose';

const { Schema } = mongoose;

// Schema defines how the user data will be stored in MongoDB
const AircraftSchema = new Schema({
  registration: String,
  description: String,
  color: String,
});

AircraftSchema.pre('save', () => {
});

export default mongoose.model('Aircraft', AircraftSchema);
