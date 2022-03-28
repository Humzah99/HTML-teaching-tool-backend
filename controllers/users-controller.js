const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { verificationEmail, forgotPasswordEmail } = require("../middleware/send-email");
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
        verified: false,
        //image: req.file.path,
        image: "hello",
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

        //send verification email
        const link = `http://${req.hostname}:5000/api/user/verify/${token}`
        const sendMail = await verificationEmail(createdUser.email, link);

        if (sendMail) {
            res.status(201).json({
                userId: createdUser.id, firstname: createdUser.firstname, surname: createdUser.surname, username: createdUser.username, email: createdUser.email, token: token,
                success: true,
                msg: "Registered successfully! Error in sending verification email",
            })
        } else {
            res.status(201).json({
                userId: createdUser.id, firstname: createdUser.firstname, surname: createdUser.surname, username: createdUser.username, email: createdUser.email, token: token,
                success: true,
                msg: "Registered successfully!",
            })
        }

    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
        );
        return next(error)
    }
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

const forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        const error = new HttpError(
            'Invalid email, please try again.',
            403
        );
        return next(error);
    }

    let existingUser
    try {
        existingUser = await User.findOne({
            email: email
        })
    } catch (err) {
        const error = new HttpError(
            'Could not find user, please try again',
            500
        )
        return next(error);
    }

    let token;
    try {
        token = jwt.sign({ userId: existingUser.id, firstname: existingUser.firstname, surname: existingUser.surname, username: existingUser.username, email: existingUser.email }, 'supersecret_dont_share', { expiresIn: '1h' })

        //send verification email
        const link = `http://${req.hostname}:5000/api/user/verifyToken/${token}`
        const sendMail = await forgotPasswordEmail(existingUser.email, link);

        if (sendMail) {
            res.status(201).json({
                userId: existingUser.id, firstname: existingUser.firstname, surname: existingUser.surname, username: existingUser.username, email: existingUser.email, token: token,
                success: true,
                msg: "Error in sending email",
            })
        } else {
            res.status(201).json({
                userId: existingUser.id, firstname: existingUser.firstname, surname: existingUser.surname, username: existingUser.username, email: existingUser.email, token: token,
                success: true,
                msg: "Email sent",
            })
        }

    } catch (err) {
        const error = new HttpError(
            'Unable to reset password, please try again later. ' + err,
            500
        );
        return next(error)
    }
}

const resetPassword = async (req, res, next) => {
    const {
        email,
        password
    } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({
            email: email
        })
    } catch (err) {
        const error = new HttpError(
            'Could not find user, please try again',
            500
        )
        return next(error);
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
        const updatedPassword = await User.findOneAndUpdate(
            {email: email}, {
                $set: {
                    password: hashedPassword
                }
        })

        if(updatedPassword) {
            res.status(201).json({
                success: true,
                msg: "Password updated successfully.",
            })
        } else {
            res.status(500).json({
                success: true,
                msg: "Something went wrong, try again.",
            })
        }

    } catch (err) {
        const error = new HttpError('Could not update password, please try again.', 500);
        return next(error);
    }
}

const verifyToken = async (req, res, next) => {
    const token = req.params.token;
    if (!token) {
        const error = new HttpError(
            'Invalid token.',
            403
        );
        return next(error);
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'supersecret_dont_share');
    } catch (err) {
        const error = new HttpError(
            'Unable to reset password, please try again later.',
            500
        );
        return next(error)
    }

    let existingUser;
    try {
        existingUser = await User.findOne({
            email: decodedToken.email
        })
    } catch (err) {
        const error = new HttpError(
            'Could not find user, please try again',
            500
        )
        return next(error);
    }

    res.status(201).json({
        success: true,
        data: decodedToken.email
    })
}

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
exports.forgotPassword = forgotPassword;
exports.verifyToken = verifyToken;
exports.resetPassword = resetPassword;