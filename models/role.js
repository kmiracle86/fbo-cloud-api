import mongoose from 'mongoose';

const { Schema } = mongoose;

const RoleSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    lowercase: true,
    unique: true,
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

RoleSchema.methods.toJSON = function toJSON() {
  return ({
    id: this._id,
    name: this.name,
    description: this.description,
    created: this.created,
  });
};

export default mongoose.model('Role', RoleSchema);
