const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const schema = mongoose.Schema;

const userSchema = schema({
  local: {
    email: { type: String, require: true, unique: true },
    password: { type: String, required: true },
    googleId: { type: String },
  },
  username: { type: String, required: true, unique: true },
  avatar: { type: String, default: "/avatars/default.webp" },
  role: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hash(password, 12);
};

userSchema.methods.comparePassword = function (password) {
  console.log(password);
  return bcrypt.compare(password, this.local.password);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
