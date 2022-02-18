const HttpError = require("../models/http-error");
const DUMMY_QUIZZES = [{ id: "1", title: "HTML Tables", questions: "10" }];
const DUMMY_QUIZ = [
  {
    id: "1",
    title: "HTML Tables",
    questions: [
      {
        questionText:
          "What of the following HTML tag is used to define a table?",
        answerOptions: [
          { answerText: "<tbl>", isCorrect: false },
          { answerText: "<tb>", isCorrect: false },
          { answerText: "<tab>", isCorrect: false },
          { answerText: "<table>", isCorrect: true },
        ],
      },
      {
        questionText: "Which of the following tag defines a table row?",
        answerOptions: [
          { answerText: "<tr>", isCorrect: true },
          { answerText: "<row>", isCorrect: false },
          { answerText: "<tablerow>", isCorrect: false },
          { answerText: "<table-row>", isCorrect: false },
        ],
      },
      {
        questionText:
          "Which element is used to create a separate table footer?",
        answerOptions: [
          { answerText: "None of them", isCorrect: false },
          { answerText: "<tfoot>", isCorrect: true },
          { answerText: "<footer>", isCorrect: false },
          { answerText: "<sepfooter>", isCorrect: false },
        ],
      },
      {
        questionText: "Each cell of the table is represented by ____",
        answerOptions: [
          { answerText: "<th>", isCorrect: false },
          { answerText: "<td>", isCorrect: true },
          { answerText: "<tr>", isCorrect: false },
          { answerText: "<thead>", isCorrect: false },
        ],
      },
      {
        questionText:
          "Which of the following attributes allows for merging of two rows in a table?",
        answerOptions: [
          { answerText: "Colmerge", isCorrect: false },
          { answerText: "Colspan", isCorrect: false },
          { answerText: "Rowspan", isCorrect: true },
          { answerText: "Rowmerge", isCorrect: false },
        ],
      },
      {
        questionText: "What tag is used to add a caption to a table?",
        answerOptions: [
          { answerText: "<tcaption>", isCorrect: false },
          { answerText: "<tc>", isCorrect: false },
          { answerText: "<table-caption>", isCorrect: false },
          { answerText: "<caption>", isCorrect: true },
        ],
      },
      {
        questionText:
          "Which of the following can be used to define the spacing between the cells of a table?",
        answerOptions: [
          { answerText: "cell-spacing", isCorrect: false },
          { answerText: "border-spacing", isCorrect: true },
          { answerText: "spacing", isCorrect: false },
          { answerText: "table-spacing", isCorrect: false },
        ],
      },
      {
        questionText:
          "Which attribute should be used with a <td> tag to merge two cells horizontally?",
        answerOptions: [
          {
            answerText: "merge = row2",
            isCorrect: false,
          },
          {
            answerText: "rowspan = 2",
            isCorrect: false,
          },
          {
            answerText: "colspan = 2",
            isCorrect: true,
          },
          { answerText: "merge = colspan2", isCorrect: false },
        ],
      },
      {
        questionText: "The table border can be collapsed by ____",
        answerOptions: [
          { answerText: "border-collapse: collapse", isCorrect: true },
          { answerText: "border: collapse", isCorrect: false },
          { answerText: "table-border: collapse", isCorrect: false },
          { answerText: "table-border-collapse: collapse", isCorrect: false },
        ],
      },
      {
        questionText:
          "Which of the following elements is not associated with the HTML table layout",
        answerOptions: [
          { answerText: "size", isCorrect: false },
          { answerText: "color", isCorrect: true },
          { answerText: "spanning", isCorrect: false },
          { answerText: "alignment", isCorrect: false },
        ],
      },
    ],
  },
];

const getAllQuizzes = (req, res, next) => {
  if (!DUMMY_QUIZZES) {
    throw new HttpError("Could not locate any quizzes", 404);
  }
  res.json({ DUMMY_QUIZZES });
};

const getQuizById = (req, res, next) => {
  const quizId = req.params.quizId;
  const quiz = DUMMY_QUIZ.find((q) => {
    return q.id === quizId;
  });
  if (!quiz) {
    return next(
      new HttpError("Could not find a quiz for the provided id"),
      404
    );
  }
  res.json({ quiz });
};

exports.getAllQuizzes = getAllQuizzes;
exports.getQuizById = getQuizById;
