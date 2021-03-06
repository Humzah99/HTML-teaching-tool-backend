const HttpError = require("../models/http-error");
const Quiz = require("../models/quiz");

const getAllQuizzes = async (req, res, next) => {
    let quizzes;
    try {
        quizzes = await Quiz.find();
    } catch (err) {
        const error = new HttpError("Something went wrong, please try again", 404)
        return next(error);
    }
    if (!quizzes) {
        const error = new HttpError("Could not locate any quizzes", 404);
        return next(error);
    }
    res.json({
        quizzes: quizzes.map(quiz => quiz.toObject({ getters: true }))
    });
};

const getQuizById = async (req, res, next) => {
    const quizId = req.params.quizId;

    let quiz;
    try {
        quiz = await Quiz.findById(quizId).populate([
            {
                path: 'scores',
                model: 'Score',
                populate: {
                    path: 'user',
                    model: 'User',
                }
            },
        ]);
    } catch (err) {
        const error = new HttpError("Something went wrong, could not open the quiz.", 500);
        return next(error);
    }

    if (!quiz) {
        const error = new HttpError("Could not find a quiz for the provided id", 404);
        return next(error);
    }
    res.json({
        quiz: quiz.toObject({ getters: true })
    });
};

const getRandomQuiz = async (req, res, next) => {

    var random = Math.floor(Math.random() * 20);
    let quiz;
    try {
        quiz = await Quiz.findOne().skip(random);
    } catch (err) {
        const error = new HttpError("Something went wrong, please try again", 404)
        return next(error);
    }
    if (!quiz) {
        const error = new HttpError("Could not locate the quiz page", 404);
        return next(error);
    }
    res.json({
        quiz: quiz.toObject({ getters: true })
    });
}


exports.getAllQuizzes = getAllQuizzes;
exports.getQuizById = getQuizById;
exports.getRandomQuiz = getRandomQuiz;