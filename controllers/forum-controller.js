const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Forum = require("../models/forum");
const User = require("../models/user");
const mongoose = require("mongoose");

const getAllForums = async(req, res, next) => {

    let forumQuestions;
    try {
        forumQuestions = await Forum.find();
    } catch (err) {
        const error = new HttpError("Something went wrong, please try again", 404)
        return next(error);
    }
    if (!forumQuestions) {
        const error = new HttpError("Could not locate the user forum", 404);
        return next(error);
    }
    res.json({
        forumQuestions: forumQuestions.map(forumQuestion => forumQuestion.toObject({ getters: true }))
    });
};

const getForumQuestionById = async(req, res, next) => {
    const questionId = req.params.questionId;

    let forumQuestion;
    try {
        forumQuestion = await Forum.findById(questionId);
    } catch (err) {
        const error = new HttpError("Something went wrong, could not find a question.", 500);
        return next(error);
    }

    if (!forumQuestion) {
        const error = new HttpError("Could not find a question for the provided id", 404);
        return next(error);
    }
    res.json({
        forumQuestion: forumQuestion.toObject({ getters: true })
    });
};

const getForumQuestionByUserId = async(req, res, next) => {
    const userId = req.params.userId;

    let userWithforumQuestions;
    try {
        userWithforumQuestions = await User
            .findById(userId)
            .populate("questions");
    } catch (err) {
        const error = new HttpError("Fetching questions failed, please try again later", 500);
        return next(error);
    }

    if (!userWithforumQuestions || userWithforumQuestions.questions.length === 0) {
        const error = new HttpError("Could not find a question for the provided id", 404);
        return next(error);
    }
    res.json({
        forumQuestions: userWithforumQuestions
            .questions
            .map(forumQuestion => forumQuestion.toObject({ getters: true }))
    });
};

const addQuestion = async(req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError("Invalid inputs passed, please check your data.", 422);
    }
    const {
        heading,
        text,
        image,
        codeString,
        codeResponses,
        answers,
        user
    } = req.body;
    const addedQuestion = new Forum({
        heading,
        text,
        image,
        codeString,
        codeResponses,
        answers,
        user
    });

    let currentUser;

    try {
        currentUser = await User.findById(user);
    } catch (err) {
        const error = new HttpError("Creating question failed, please try again.", 500);
        return next(error);
    }

    if (!currentUser) {
        const error = new HttpError("Could not find user for the provided id", 404);
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await addedQuestion.save({ session: sess });
        currentUser
            .questions
            .push(addedQuestion);
        await currentUser.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError("Creating question failed, please try again", 500);
        return next(error);
    }

    res
        .status(201)
        .json({ question: addedQuestion });
};

const updateQuestion = async(req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors);
        return next(new HttpError("Invalid inputs passed, please check your data.", 422));
    }
    const { heading, text, image, codeString } = req.body;
    const questionId = req.params.questionId;

    let forumQuestion;
    try {
        forumQuestion = await Forum.findById(questionId);
    } catch (err) {
        const error = new HttpError("Something went wrong, could not update question.", 500);
        return next(error);
    }
    forumQuestion.heading = heading;
    forumQuestion.text = text;
    forumQuestion.image = image;
    forumQuestion.codeString = codeString;

    try {
        await forumQuestion.save();
    } catch (err) {
        const error = new HttpError("Something went wrong, could not update question.", 500);
        return next(error);
    }

    res
        .status(200)
        .json({
            question: forumQuestion.toObject({ getters: true })
        });
};
const deleteQuestion = async(req, res, next) => {
    const questionId = req.params.questionId;

    let forumQuestion;
    try {
        forumQuestion = await Forum
            .findById(questionId)
            .populate("user");
    } catch (err) {
        const error = new HttpError("Something went wrong, could not delete question.", 500);
        return next(error);
    }

    if (!forumQuestion) {
        const error = new HttpError("Could not find a question for the provided id", 404);
        return next(error);
    }
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await forumQuestion.remove({ session: sess });
        forumQuestion
            .user
            .questions
            .pull(forumQuestion);
        await forumQuestion
            .user
            .save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError("Something went wrong, could not delete question.", 500);
        return next(error);
    }
    res
        .status(200)
        .json({ message: "Deleted question." });
};

exports.getAllForums = getAllForums;
exports.getForumQuestionById = getForumQuestionById;
exports.getForumQuestionByUserId = getForumQuestionByUserId;
exports.addQuestion = addQuestion;
exports.updateQuestion = updateQuestion;
exports.deleteQuestion = deleteQuestion;