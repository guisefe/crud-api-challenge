const bcrypt = require('bcrypt');
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+\@.+\..+/, 'A valid email is required'],
    },
    password: { type: String, required: true, minlength: 8, select: false },
    dateOfBirth: { type: Date, required: true },
  },
  { timestamps: true },
);

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  return next();
});

module.exports = model('User', userSchema);
