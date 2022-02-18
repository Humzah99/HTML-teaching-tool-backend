const express = require("express");
const bodyParser = require("body-parser");

const quizRoutes = require("./routes/quiz-routes");
const forumRoutes = require("./routes/forum-routes");
const documentationRoutes = require("./routes/documentation-routes");
const usersRoutes = require('./routes/users-routes');
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use('/api/user', usersRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/forum", forumRoutes);
app.use("/api/documentation", documentationRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

app.listen(5000);
