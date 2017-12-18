import mongoose from 'mongoose';

const { Schema } = mongoose;

const RoleSchema = new Schema({
  description: String,
  name: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  }
});

RoleSchema.methods.toJSON = function toJSON() {
  return ({ id: this._id, name: this.name, description: this.description });
};

export default mongoose.model('Role', RoleSchema);
