const { v4: uuidv4 } = require('uuid');
const {
    validationResult
} = require("express-validator");
const HttpError = require("../models/http-error");
const User = require("../models/user");

const getUserById = async (req, res, next) => {
    const userId = req.params.userId;

    let user;
    try {
        user = await User.findById(userId)
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
    const createdUser = new User({
        username,
        firstname,
        surname,
        email,
        password,
        image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
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



    res.status(201).json({
        user: createdUser.toObject({
            getters: true
        })
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

    if (!existingUser || existingUser.password !== password) {
        const error = new HttpError(
            'Invalid credentials, could not log in',
            401
        );
        return next(error);
    }

    res.json({
        message: "Logged in",
        user: existingUser.toObject({ getters: true })
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