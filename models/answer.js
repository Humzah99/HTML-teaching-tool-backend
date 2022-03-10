const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const answerSchema = new Schema({
    text: { type: String, required: false },
    code: { type: String, required: false },
    question: { type: mongoose.Types.ObjectId, required: true, ref: 'Forum' },
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
});

module.exports = mongoose.model('Answer', answerSchema);