const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
    validationResult
} = require("express-validator");
const HttpError = require("../models/http-error");
const User = require("../models/user");

const getUserById = async (req, res, next) => {
    const userId = req.params.userId;

    let user;
    try {
        user = await User.findById(userId).populate([
            {
                path: 'scores',
                model: 'Score',
                populate: {
                    path: 'quiz',
                    model: 'Quiz',
                }
            },
            {
                path: 'questions',
                model: 'Forum',
                populate: {
                    path: 'user',
                    model: 'User',
                }
            }
        ],
        )
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find the specific user.', 500
        );
        return next(error);
    }

    if (!user) {
        const error = new HttpError("Could not find a user for the provided id",
            404)
        return next(error);
    }
    res.json({
        user: user.toObject({
            getters: true
        })
    });
};

const signup = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new HttpError("Invalid inputs passed, please check your data.", 422));
    }
    const {
        username,
        firstname,
        surname,
        email,
        password
    } = req.body;

    let existingUser
    try {
        existingUser = await User.findOne({
            email: email
        })
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
        )
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError(
            'User exists already, please login instead.',
            422
        );
        return next(error);
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        const error = new HttpError('Could not create user, please try again.', 500);
        return next(error);
    }

    const createdUser = new User({
        username,
        firstname,
        surname,
        email,
        password: hashedPassword,
        image: req.file.path,
        questions: [],
        scores: [],
        answers: []
    });
    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again ' + err,
            500
        );
        return next(error);
    }

    let token;
    try {
        token = jwt.sign({ userId: createdUser.id, firstname: createdUser.firstname, surname: createdUser.surname, username: createdUser.username, email: createdUser.email }, 'supersecret_dont_share', { expiresIn: '1h' })
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
        );
        return next(error)
    }

    res.status(201).json({
        userId: createdUser.id, firstname: createdUser.firstname, surname: createdUser.surname, username: createdUser.username, email: createdUser.email, token: token
    });
};

const login = async (req, res, next) => {
    const {
        email,
        password
    } = req.body;

    let existingUser
    try {
        existingUser = await User.findOne({
            email: email
        })
    } catch (err) {
        const error = new HttpError(
            'Logging in failed, please try again later.',
            500
        )
        return next(error);
    }


    if (!existingUser) {
        const error = new HttpError(
            'Invalid credentials, could not log in',
            403
        );
        return next(error);
    }

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        const error = new HttpError(
            'Could not log you in, please check your credentials and try again.',
            500
        );
        return next(error);
    }

    if (!isValidPassword) {
        const error = new HttpError(
            'Invalid credentials, could not log in',
            401
        );
        return next(error);
    }

    let token;
    try {
        token = jwt.sign({ userId: existingUser.id, firstname: existingUser.firstname, surname: existingUser.surname, username: existingUser.username, email: existingUser.email }, 'supersecret_dont_share', { expiresIn: '1h' })
    } catch (err) {
        const error = new HttpError(
            'Logging in failed, please try again later.',
            500
        );
        return next(error)
    }

    res.json({
        userId: existingUser.id,
        email: existingUser.email,
        firstname: existingUser.firstname,
        surname: existingUser.surname,
        username: existingUser.username,
        token: token
    });
};

const updateUser = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors);
        return next(new HttpError("Invalid inputs passed, please check your data.", 422));
    }
    const {
        firstname,
        surname,
        password,
        // image
    } = req.body;
    const userId = req.params.userId;

    let user;
    try {
        user = await User.findById(userId)
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update user.', 500
        );
        return next(error);
    }
    console.log(firstname);
    user.firstname = firstname;
    user.surname = surname;
    user.password = password;
    // user.image = image;

    try {
        await user.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update user.', 500
        );
        return next(error);
    }

    res.status(200).json({
        user: user.toObject({
            getters: true
        })
    });
};

exports.getUserById = getUserById;
exports.signup = signup;
exports.login = login;
exports.updateUser = updateUser;