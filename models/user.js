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
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', function saveCB(next) {
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
  return ({ id: this._id, email: this.email });
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
