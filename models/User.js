const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tickets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ticket",
    },
  ],
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
    },
  ],
  permission: {
    type: String,
    default: "user",
  },
  position: {
    type: String,
  },
  avatar: {
    type: String,
    default:'a'
  },
  reccode: {
    type: String,
    default:'a',
  },
});

module.exports = User = mongoose.model("user", UserSchema);
