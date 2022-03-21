const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const fs = require('fs');
const quizRoutes = require("./routes/quiz-routes");
const forumRoutes = require("./routes/forum-routes");
const documentationRoutes = require("./routes/documentation-routes");
const usersRoutes = require('./routes/users-routes');
const scoreRoutes = require('./routes/scores-routes');
const answerRoutes = require('./routes/answer-routes');
const path = require('path');
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});
app.use('/api/user', usersRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/forum", forumRoutes);
app.use("/api/documentation", documentationRoutes);
app.use("/api/scores", scoreRoutes)
app.use("/api/answers", answerRoutes)

app.use((req, res, next) => {
    const error = new HttpError("Could not find this route", 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (req.file) {
        fs.unlink(req.file.path, err => {
            console.log(err);
        });
    }
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({
        message: error.message || "An unknown error occurred!"
    });
});

mongoose.connect('mongodb+srv://HumzahWasim:Humzah99@cluster0.gigdc.mongodb.net/htmlTeachingTool?retryWrites=true&w=majority')
    .then(() => {
        app.listen(5000);
    })
    .catch(err => {
        console.log(err);
    });