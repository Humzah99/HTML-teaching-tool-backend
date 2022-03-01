const {
    validationResult
} = require("express-validator");
const HttpError = require("../models/http-error");
const User = require("../models/user");
const DUMMY_USERS = [{
    username: "Humzah99",
    name: "Humzah Wasim",
    email: "humzah99@live.co.uk",
    password: "Humzah#999",
}, ];

const getUserByUsername = (req, res, next) => {
    const username = req.params.username;
    const user = DUMMY_USERS.find((u) => {
        return u.username === username;
    });
    if (!user) {
        return next(
            new HttpError("Could not find a user for the provided username"),
            404
        );
    }
    res.json({
        user
    });
};

const signup = async(req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new HttpError("Invalid inputs passed, please check your data.", 422));
    }
    const {
        username,
        name,
        email,
        password,
        questions
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
        name,
        email,
        password,
        image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        questions
    });
    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again',
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

const login = (req, res, next) => {
    const {
        email,
        password
    } = req.body;

    const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError(
            "Could not identify user, credentials seem to be wrong",
            401
        );
    }

    res.json({
        message: "Logged in"
    });
};

const updateUser = (req, res, next) => {
    const {
        name,
        email,
        password
    } = req.body;
    const userName = req.params.username;

    const updatedUser = {
        ...DUMMY_USERS.find((u) => u.username === userName),
    };
    const userIndex = DUMMY_USERS.findIndex((u) => u.username === userName);
    updatedUser.name = name;
    updatedUser.email = email;
    updatedUser.password = password;

    DUMMY_USERS[userIndex] = updatedUser;

    res.status(200).json({
        user: updatedUser
    });
};

exports.getUserByUsername = getUserByUsername;
exports.signup = signup;
exports.login = login;
exports.updateUser = updateUser;