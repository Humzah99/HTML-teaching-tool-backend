const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Answer = require("../models/answer");
const User = require("../models/user");
const Forum = require("../models/forum");
const mongoose = require("mongoose");
const moment = require("moment");

const getAllAnswers = async (req, res, next) => {

    let answers;
    try {
        answers = await Answer.find();
    } catch (err) {
        const error = new HttpError("Something went wrong, please try again", 404)
        return next(error);
    }
    if (!answers) {
        const error = new HttpError("Could not locate the answers", 404);
        return next(error);
    }
    res.json({
        answers: answers.map(answer => answer.toObject({ getters: true }))
    });
};

const getAnswerById = async (req, res, next) => {
    const answerId = req.params.answerId;

    let answer;
    try {
        answer = await Answer.findById(answerId).populate("user");
    } catch (err) {
        const error = new HttpError("Something went wrong, could not find any answers.", 500);
        return next(error);
    }

    if (!answer) {
        const error = new HttpError("Could not find a answer for the provided id", 404);
        return next(error);
    }
    res.json({
        answer: answer.toObject({ getters: true })
    });
};

const getAnswerByUserId = async (req, res, next) => {
    const userId = req.params.userId;

    let userAnswers;
    try {
        userAnswers = await User
            .findById(userId)
            .populate("answers");
    } catch (err) {
        const error = new HttpError("Fetching answers failed, please try again later", 500);
        return next(error);
    }

    if (!userAnswers || userAnswers.answers.length === 0) {
        const error = new HttpError("Could not find a answer for the provided id", 404);
        return next(error);
    }
    res.json({
        answers: userAnswers
            .answers
            .map(answer => answer.toObject({ getters: true }))
    });
};

const getAnswerByQuestionId = async (req, res, next) => {
    const questionId = req.params.questionId;

    let questionAnswers;
    try {
        questionAnswers = await Forum
            .findById(questionId)
            .populate([
                {
                  path: 'answers',
                  model: 'Answer',
                  populate: {
                    path: 'user',
                    model: 'User',
                  }
                },
              ])
    } catch (err) {
        const error = new HttpError("Fetching answers failed, please try again later", 500);
        return next(error);
    }

    if (!questionAnswers) {
        const error = new HttpError("Could not find a answer for the provided id right now", 404);
        return next(error);
    }
    res.json({
        answers: questionAnswers
            .answers
            .map(answer => answer.toObject({ getters: true }))
    });
};

const addAnswer = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError("Invalid inputs passed, please check your data.", 422);
    }
    const { text, code, question, user } = req.body;
    const addedAnswer = new Answer({
        text, 
        code, 
        question, 
        user,
        createdAt: moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a')
    });

    let currentUser;

    try {
        currentUser = await User.findById(user);
    } catch (err) {
        const error = new HttpError("Creating answer failed, please try again.", 500);
        return next(error);
    }

    if (!currentUser) {
        const error = new HttpError("Could not find user for the provided id", 404);
        return next(error);
    }

    let currentQuestion;

    try {
        currentQuestion = await Forum.findById(question);
    } catch (err) {
        const error = new HttpError("Creating answer failed, please try again.", 500);
        return next(error);
    }

    if (!currentQuestion) {
        const error = new HttpError("Could not find question for the provided id", 404);
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await addedAnswer.save({ session: sess });
        currentUser
            .answers
            .push(addedAnswer);
        await currentUser.save({ session: sess });
        currentQuestion
            .answers
            .push(addedAnswer);
        await currentQuestion.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError("Creating answer failed, please try again " + err, 500);
        return next(error);
    }

    res
        .status(201)
        .json({ answer: addedAnswer });
};
const updateAnswer = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors);
        return next(
            new HttpError("Invalid inputs passed, please check your data.", 422)
        );
    }
    const { text, /*code*/ } = req.body;
    const answerId = req.params.answerId;

    let answer;
    try {
        answer = await Answer.findById(answerId);
    } catch (err) {
        const error = new HttpError(
            "Something went wrong, could not update answer.",
            500
        );
        return next(error);
    }
    answer.text = text;
    //answer.code = code;

    try {
        await answer.save();
    } catch (err) {
        const error = new HttpError(
            "Something went wrong, could not update answer.",
            500
        );
        return next(error);
    }

    res.status(200).json({
        answer: answer.toObject({ getters: true })
    });
};

const deleteAnswer = async (req, res, next) => {
    const answerId = req.params.answerId;

    let answer;
    try {
        answer = await Answer
            .findById(answerId)
            .populate("user")
            .populate("question");
    } catch (err) {
        const error = new HttpError("Something went wrong, could not delete answer.", 500);
        return next(error);
    }

    if (!answer) {
        const error = new HttpError("Could not find an answer for the provided id", 404);
        return next(error);
    }
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await answer.remove({ session: sess });
        answer
            .user
            .answers
            .pull(answer);
        await answer
            .user
            .save({ session: sess });
        answer
            .question
            .answers
            .pull(answer);
        await answer
            .question
            .save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError("Something went wrong, could not delete answer.", 500);
        return next(error);
    }
    res
        .status(200)
        .json({ message: "Deleted answer." });
};

exports.getAllAnswers = getAllAnswers;
exports.getAnswerById = getAnswerById;
exports.getAnswerByUserId = getAnswerByUserId;
exports.getAnswerByQuestionId = getAnswerByQuestionId;
exports.addAnswer = addAnswer;
exports.updateAnswer = updateAnswer;
exports.deleteAnswer = deleteAnswer;