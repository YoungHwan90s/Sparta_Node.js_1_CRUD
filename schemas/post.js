const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  postsId: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: Number,
    required: true
  },
  content: {
    type: String
  },
  createdAt: {
    type: Date
  }
});

module.exports = mongoose.model("posts", postsSchema);