const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    emailVerificationToken: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        required: false
    },
    questions: [{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Forum'
    }],
    scores: [{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Score'
    }],
    answers: [{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Answer'
    }]
});

module.exports = mongoose.model('User', userSchema);