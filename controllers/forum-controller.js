const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Forum = require("../models/forum");
let DUMMY_QUESTIONS = [
  {
    heading: "How can I construct a HTML table?",
    text: "Please can I have some information on the basics of constructing a HTML table? Here is my code...",
    image: null,
    codeString: `<table>
      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label
          ><input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" class="form-text">
            We will never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label
          ><input type="password" class="form-control" id="exampleInputPassword1" />
        </div>
        <div class="mb-3 form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="exampleCheck1"
          /><label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </table>`,
    codeResponses: [
      `<table>
      <tr>
        <th>User Form</th>
      </tr>
      <tr>
        <td>
          <form>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label"
                >Email address</label
              >
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" class="form-text">5
                We'll never share your email with anyone else.
              </div>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1" />
              <label class="form-check-label" for="exampleCheck1"
                >Check me out</label
              >
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </td>
      </tr>
    </table>`,
    ],
    answers: [
      "See the following link for more information on HTML tables. https://www.w3schools.com/html/html_tables.asp",
      "Navigate to this website's HTML table documentation for more help.",
    ],
    user: '1'
  },
  {
    heading: "My HTML heading does not render on screen.",
    text: "Can anyone help me identify the issue with this code that is not allowing any headings to render on to the screen?",
    image: null,
    codeString: "<h7>Hello world!</h7>",
    codeResponses: [],
    answers: [
      "You cannot render a <h7> tag. Read the HTML headings documentation on this website for more information.",
      "Have a look at the following link for HTML headings... https://www.w3schools.com/html/html_headings.asp ",
    ],
    user: '1'
  },
];

const getAllForums = (req, res, next) => {
  if (!DUMMY_QUESTIONS) {
    throw new HttpError("Could not locate the user forum", 404);
  }
  res.json({ DUMMY_QUESTIONS });
};

const getForumQuestionById = async (req, res, next) => {
  const questionId = req.params.questionId;

  let forumQuestion;
  try {
    forumQuestion = await Forum.findById(questionId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a question.', 500
    );
    return next(error);
  }

  if (!forumQuestion) {
    const error = new HttpError("Could not find a question for the provided id",
      404)
    return next(error);
  }
  res.json({ forumQuestion: forumQuestion.toObject({ getters: true }) });
};

const getForumQuestionByUserId = async (req, res, next) => {
  const userId = req.params.userId;

  let forumQuestions;
  try {
    forumQuestions = await Forum.find({ user: userId });
  } catch (err) {
    const error = new HttpError(
      'Fetching questions failed, please try again later',
      500
    );
    return next(error);
  }

  if (!forumQuestions || forumQuestions.length === 0) {
    const error = new HttpError("Could not find a question for the provided id",
      404)
    return next(error);
  }
  res.json({ forumQuestions: forumQuestions.map(forumQuestion => forumQuestion.toObject({ getters: true })) });
};

const addQuestion = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const { heading, text, image, codeString, codeResponses, answers, user } = req.body;
  const addedQuestion = new Forum({
    heading,
    text,
    image,
    codeString,
    codeResponses,
    answers,
    user
  });

  try {
    await addedQuestion.save();
  } catch (err) {
    const error = new HttpError(
      'Creating question failed, please try again',
      500
    );
    return next(error);
  }


  res.status(201).json({ question: addedQuestion });
};

const updateQuestion = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const { heading, text, image, codeString } = req.body;
  const questionId = req.params.questionId;

  const updatedQuestion = {
    ...DUMMY_QUESTIONS.find((fq) => fq.id === questionId),
  };
  const questionIndex = DUMMY_QUESTIONS.findIndex((fq) => fq.id === questionId);
  updatedQuestion.heading = heading;
  updatedQuestion.text = text;
  updatedQuestion.image = image;
  updatedQuestion.codeString = codeString;

  DUMMY_QUESTIONS[questionIndex] = updatedQuestion;

  res.status(200).json({ question: updatedQuestion });
};
const deleteQuestion = (req, res, next) => {
  const questionId = req.params.questionId;
  if (!DUMMY_QUESTIONS.find(q => q.id === questionId)) {
    throw new HttpError('Could not find a question for that id.', 404);
  }
  DUMMY_QUESTIONS = DUMMY_QUESTIONS.filter((fq) => fq.id !== questionId);
  res.status(200).json({ message: "Deleted question." });
};

exports.getAllForums = getAllForums;
exports.getForumQuestionById = getForumQuestionById;
exports.getForumQuestionByUserId = getForumQuestionByUserId;
exports.addQuestion = addQuestion;
exports.updateQuestion = updateQuestion;
exports.deleteQuestion = deleteQuestion;