const express = require('express');
const bodyParser = require('body-parser');

const quizRoutes = require('./routes/quiz-routes');

const app = express();

app.use(quizRoutes);

app.listen(5000);

