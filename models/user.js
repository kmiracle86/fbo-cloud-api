import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  firstName: String,
  middleName: String,
  lastName: String,
  password: {
    type: String,
    required: true
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
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

UserSchema.pre('save', function saveCB(next) {
  if (!this.isNew) {
    this.modified = new Date();
  }

  if (!this.isModified('password') && !this.isNew) {
    next();
  }

  bcrypt.genSalt(10, (saltErr, salt) => {
    if (saltErr) {
      return next(saltErr);
    }

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      this.password = hash;
      next();
    });
  });
});

UserSchema.methods.toJSON = function toJSON() {
  return ({
    displayName: `${this.firstName} ${this.lastName}`,
    id: this._id,
    email: this.email,
    role: this.role,
    created: this.created,
  });
};

UserSchema.methods.comparePassword = function comparePassword(pw) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(pw, this.password, (err, isMatch) => {
      if (!err) {
        resolve(isMatch);
      }
      reject(err);
    });
  });
};

export default mongoose.model('User', UserSchema);
