const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const quizSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    questions: [{
        questionText: {
            type: String,
            required: false
        },
        answerOptions: [{
            answerText: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                required: true
            }
        }]
    }],
    scores: [{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Score'
    }]
});

module.exports = mongoose.model('Quiz', quizSchema);