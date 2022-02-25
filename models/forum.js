const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const forumSchema = new Schema({
  heading: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String, required: false },
  codeString: { type: String, required: false },
  codeResponses: [
    { type: String, required: false },
  ],
  answers: [
    { type: String, required: false },
  ],
  user: { type: String, required: true },
});

module.exports = mongoose.model('Forum', forumSchema);