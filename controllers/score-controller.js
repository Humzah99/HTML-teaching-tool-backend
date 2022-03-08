const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Score = require("../models/score");
const User = require("../models/user");
const Quiz = require("../models/quiz");
const mongoose = require("mongoose");
const quiz = require("../models/quiz");

const getAllScores = async(req, res, next) => {

    let scores;
    try {
        scores = await Score.find();
    } catch (err) {
        const error = new HttpError("Something went wrong, please try again", 404)
        return next(error);
    }
    if (!scores) {
        const error = new HttpError("Could not locate the highest scores", 404);
        return next(error);
    }
    res.json({
        scores: scores.map(score => score.toObject({ getters: true }))
    });
};

const getScoreById = async(req, res, next) => {
    const scoreId = req.params.scoreId;

    let score;
    try {
        score = await Forum.findById(scoreId);
    } catch (err) {
        const error = new HttpError("Something went wrong, could not find highest scores.", 500);
        return next(error);
    }

    if (!score) {
        const error = new HttpError("Could not find a score for the provided id", 404);
        return next(error);
    }
    res.json({
        score: score.toObject({ getters: true })
    });
};

const getScoreByUserId = async(req, res, next) => {
    const userId = req.params.userId;

    let userScores;
    try {
        userScores = await User
            .findById(userId)
            .populate("scores");
    } catch (err) {
        const error = new HttpError("Fetching scores failed, please try again later", 500);
        return next(error);
    }

    if (!userScores || userScores.questions.length === 0) {
        const error = new HttpError("Could not find a score for the provided id", 404);
        return next(error);
    }
    res.json({
        scores: userScores
            .scores
            .map(score => score.toObject({ getters: true }))
    });
};

const getScoreByQuizId = async(req, res, next) => {
    const quizId = req.params.quizId;

    let quizScores;
    try {
        quizScores = await Quiz
            .findById(quizId)
            .populate("scores");
    } catch (err) {
        const error = new HttpError("Fetching scores failed, please try again later", 500);
        return next(error);
    }

    if (!quizScores || quizScores.questions.length === 0) {
        const error = new HttpError("Could not find a score for the provided id", 404);
        return next(error);
    }
    res.json({
        scores: quizScores
            .scores
            .map(score => score.toObject({ getters: true }))
    });
};

const addScore = async(req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError("Invalid inputs passed, please check your data.", 422);
    }
    const { score, quizDate, quiz, user } = req.body;
    const addedScore = new Score({ score, quizDate, quiz, user });

    let currentUser;

    try {
        currentUser = await User.findById(user);
    } catch (err) {
        const error = new HttpError("Creating score failed, please try again.", 500);
        return next(error);
    }

    if (!currentUser) {
        const error = new HttpError("Could not find user for the provided id", 404);
        return next(error);
    }

    let currentQuiz;

    try {
        currentQuiz = await Quiz.findById(quiz);
    } catch (err) {
        const error = new HttpError("Creating score failed, please try again.", 500);
        return next(error);
    }

    if (!currentQuiz) {
        const error = new HttpError("Could not find quiz for the provided id", 404);
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await addedScore.save({ session: sess });
        currentUser
            .scores
            .push(addedScore);
        await currentUser.save({ session: sess });
        currentQuiz
            .scores
            .push(addedScore);
        await currentQuiz.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError("Creating score failed, please try again", 500);
        return next(error);
    }

    res
        .status(201)
        .json({ score: addedScore });
};

const deleteScore = async(req, res, next) => {
    const scoreId = req.params.scoreId;

    let score;
    try {
        score = await Score
            .findById(scoreId)
            .populate("user")
            .populate("quizzes");
    } catch (err) {
        const error = new HttpError("Something went wrong, could not delete score.", 500);
        return next(error);
    }

    if (!score) {
        const error = new HttpError("Could not find a score for the provided id", 404);
        return next(error);
    }
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await score.remove({ session: sess });
        score
            .user
            .scores
            .pull(score);
        await score
            .user
            .save({ session: sess });
        score
            .quiz
            .scores
            .pull(score);
        await score
            .quiz
            .save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError("Something went wrong, could not delete score.", 500);
        return next(error);
    }
    res
        .status(200)
        .json({ message: "Deleted score." });
};

exports.getAllScores = getAllScores;
exports.getScoreById = getScoreById;
exports.getScoreByUserId = getScoreByUserId;
exports.getScoreByQuizId = getScoreByQuizId;
exports.addScore = addScore;
exports.deleteScore = deleteScore;