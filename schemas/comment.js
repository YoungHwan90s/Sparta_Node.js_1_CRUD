const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  postsId: {
    type: Number,
    required: true
  },
  name: {
    type: String
  },
  comment: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false });

module.exports = mongoose.model("comments", commentsSchema);