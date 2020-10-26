const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required.'],
      unique: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required.']
    },
    photo: {
      type: String,
      default: 'https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png'
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('User', userSchema);
