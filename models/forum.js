const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const forumSchema = new Schema({
  heading: { type: String, required: true },
  text: { type: String, required: true },
  // image: { type: String, required: false },
  // codeString: { type: String, required: false },
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  answers: [{
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Answer'
  }],
  createdAt: { type: String }
});

module.exports = mongoose.model("Forum", forumSchema);
