const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const settings = require('../../config/settings');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// to hook this before to save password
UserSchema.pre('save', async function hashPassowrd(next) {
  if (!this.isModified('password')) next();

  this.password = await bcrypt.hash(this.password, 8);
});

// add methods to user
UserSchema.methods = {
  compareHash(password) {
    return bcrypt.compare(password, this.password);
  },

  generateToken() {
    return jwt.sign({ id: this.id }, settings.authSecret, {
      expiresIn: 86400, // um dia
    });
  },
};


module.exports = mongoose.model('User', UserSchema);
