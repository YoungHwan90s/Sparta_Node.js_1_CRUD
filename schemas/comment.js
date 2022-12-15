const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  postsId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String
  },
  comment: {
    type: String
  },
  createdAt: {
    type: Date
  }
});

module.exports = mongoose.model("comments", commentsSchema);