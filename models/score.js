const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scoreSchema = new Schema({
    score: { type: String, required: true },
    quizDate: { type: String, required: false },
    quiz: { type: mongoose.Types.ObjectId, required: true, ref: 'Quiz' },
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
});

module.exports = mongoose.model('Score', scoreSchema);