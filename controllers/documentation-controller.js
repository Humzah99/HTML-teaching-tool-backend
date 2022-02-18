const HttpError = require("../models/http-error");
const DUMMY_DOCUMENTATION = [
  {
    id: "1",
    title: "Attributes",
    description:
      "HTML attributes can be added to the opening tag of an HTML element to change...",
  },
  {
    id: "2",
    title: "Elements",
    description:
      "An HTML element is a piece of content in an HTML document. It is everything from...",
  },
  {
    id: "3",
    title: "Forms",
    description:
      "The HTML <Form> element is used to collect and send information to an external source.",
  },
  {
    id: "4",
    title: "Tables",
    description:
      "In HTML, A Table Is An Element That Allows For The Representation Of Data In Two Dimensions...",
  },
  {
    id: "5",
    title: "Paragraphs",
    description:
      "A paragraph always starts on a new line, and browsers automatically add some white space...",
  },
  {
    id: "6",
    title: "Headings",
    description:
      "HTML headings are titles or subtitles that you want to display on a webpage.",
  },
];
const DUMMY_DOCUMENTATION_DATA = [
  {
    id: "1",
    title: "Attributes",
    description:
      "HTML attributes can be added to the opening tag of an HTML element to change...",
    content: [
      {
        subTitle: "The href Attribute",
        information: [
          "The <a> tag defines a hyperlink. The href attribute specifies the URL of the page the link goes to:",
        ],
        codeString: "<a href='https://www.w3schools.com'>Visit W3Schools</a>",
      },
      {
        subTitle: "The src Attribute",
        information: [
          "The <img> tag is used to embed an image in an HTML page. The src attribute specifies the path to the image to be displayed:",

          "There are two ways to specify the URL in the src attribute:",

          "1. Absolute URL - Links to an external image that is hosted on another website. Example: src='https://www.w3schools.com/images/img_girl.jpg'.",

          "Notes: External images might be under copyright. If you do not get permission to use it, you may be in violation of copyright laws. In addition, you cannot control external images; it can suddenly be removed or changed.",

          "2. Relative URL - Links to an image that is hosted within the website. Here, the URL does not include the domain name. If the URL begins without a slash, it will be relative to the current page. Example: src='img_girl.jpg'. If the URL begins with a slash, it will be relative to the domain. Example: src='/images/img_girl.jpg'.",

          "Tip: It is almost always best to use relative URLs. They will not break if you change domain.",
        ],
        codeString: "<img src='img_girl.jpg'>",
      },
      {
        subTitle: "The width and height Attributes",
        information: [
          "The <img> tag should also contain the width and height attributes, which specifies the width and height of the image (in pixels):",
        ],
        codeString: "<img src='img_girl.jpg' width='500' height='600'>",
      },
      {
        subTitle: "The alt Attribute",
        information: [
          "The required alt attribute for the <img> tag specifies an alternate text for an image, if the image for some reason cannot be displayed. This can be due to slow connection, or an error in the src attribute, or if the user uses a screen reader.",
        ],
        codeString: "<img src='img_girl.jpg' alt='Girl with a jacket'>",
      },
      {
        subTitle: "The style Attribute",
        information: [
          "The style attribute is used to add styles to an element, such as color, font, size, and more.",
        ],
        codeString: "<p style='color:red;'>This is a red paragraph.</p>",
      },
      {
        subTitle: "The lang Attribute",
        information: [
          "You should always include the lang attribute inside the <html> tag, to declare the language of the Web page. This is meant to assist search engines and browsers. Country codes can also be added to the language code in the lang attribute. So, the first two characters define the language of the HTML page, and the last two characters define the country.",

          "The following example specifies English as the language and United States as the country:",
        ],
        codeString: `<!DOCTYPE html>
  <html lang="en-US">
      <body>
          ...
      </body>
  </html>`,
      },
      {
        subTitle: "The title Attribute",
        information: [
          "The title attribute defines some extra information about an element.",

          "The value of the title attribute will be displayed as a tooltip when you mouse over the element:",
        ],
        codeString: "<p title='I am a tooltip'>This is a paragraph.</p>",
      },
    ],
    chapterSummary: [
      "1- All HTML elements can have attributes",
      "2- The href attribute of <a> specifies the URL of the page the link goes to",
      "3- The src attribute of <img> specifies the path to the image to be displayed",
      "4- The width and height attributes of <img> provide size information for images",
      "5- The alt attribute of <img> provides an alternate text for an image",
      "6- The style attribute is used to add styles to an element, such as color, font, size, and more",
      "7- The lang attribute of the <html> tag declares the language of the Web page",
      "8- The title attribute defines some extra information about an element",
    ],
  },
  {
    id: "2",
    title: "Elements",
    description:
      "An HTML element is a piece of content in an HTML document. It is everything from...",
    content: [
      {
        subTitle: null,
        information: [
          "The HTML element is everything from the start tag to the end tag:",

          "<tagname>Content goes here...</tagname>",
        ],
        codeString: null,
      },
      {
        subTitle: "Nested HTML Elements",
        information: [
          "HTML elements can be nested (this means that elements can contain other elements).",

          "All HTML documents consist of nested HTML elements.",

          "The following example contains four HTML elements (<html>, <body>, <h1> and <p>):",
        ],
        codeString: `<!DOCTYPE html>
  <html>
  <body>
  
  <h1>My First Heading</h1>
  <p>My first paragraph.</p>
  
  </body>
  </html>`,
      },
      {
        subTitle: "Example Explained",
        information: [
          "The <html> element is the root element and it defines the whole HTML document.",

          "It has a start tag <html> and an end tag </html>.",

          "Then, inside the <html> element there is a <body> element:",
        ],
        codeString: `<body>
  
  <h1>My First Heading</h1>
  <p>My first paragraph.</p>
  
  </body>`,
      },
      {
        subTitle: null,
        information: [
          "The <body> element defines the document's body.",

          "It has a start tag <body> and an end tag </body>.",

          "Then, inside the <body> element there are two other elements: <h1> and <p>:",
        ],
        codeString: `<h1>My First Heading</h1>
  <p>My first paragraph.</p>`,
      },
      {
        subTitle: null,
        information: [
          "The <h1> element defines a heading.",

          "It has a start tag <h1> and an end tag </h1>:",
        ],
        codeString: "<h1>My First Heading</h1>",
      },
      {
        subTitle: null,
        information: [
          "The <p> element defines a paragraph.",

          "It has a start tag <p> and an end tag </p>:",
        ],
        codeString: `<p>My first paragraph.</p>`,
      },
      {
        subTitle: "Never skip to the end tag",
        information: [
          "Some HTML elements will display correctly, even if you forget the end tag:",

          "However, never rely on this! Unexpected results and errors may occur if you forget the end tag!",
        ],
        codeString: `<html>
  <body>
  
  <p>This is a paragraph
  <p>This is a paragraph
  
  </body>
  </html>`,
      },
      {
        subTitle: "Empty HTML Elements",
        information: [
          "HTML elements with no content are called empty elements.",

          "The <br> tag defines a line break, and is an empty element without a closing tag:",
        ],
        codeString: "<p>This is a <br> paragraph with a line break.</p>",
      },
      {
        subTitle: "HTML is not case sensitive",
        information: [
          "HTML tags are not case sensitive: <P> means the same as <p>.",

          "The HTML standard does not require lowercase tags, but W3C recommends lowercase in HTML, and demands lowercase for stricter document types like XHTML.",
        ],
        codeString: null,
      },
    ],
    chapterSummary: [],
  },
  {
    id: "3",
    title: "Forms",
    description:
      "The HTML <Form> element is used to collect and send information to an external source.",
    content: [
      {
        subTitle: "The <form> Element",
        information: [
          "The HTML <form> element is used to create an HTML form for user input:",
          "The <form> element is a container for different types of input elements, such as: text fields, checkboxes, radio buttons, submit buttons, etc.",
          "All the different form elements are covered in this chapter: HTML Form Elements.",
        ],
        codeString: `<form>
  .
  form elements
  .
  </form>`,
      },
      {
        subTitle: "The <input> Element",
        information: [
          "The HTML <input> element is the most used form element.",

          "An <input> element can be displayed in many ways, depending on the type attribute.",

          "Here are some examples:",

          "1- <input type='text'>: Displays a single-line text input field",
          "2- <input type='radio'>: 	Displays a radio button (for selecting one of many choices)",
          "3- <input type='checkbox'>: Displays a checkbox (for selecting zero or more of many choices)",
          "4- <input type='submit'>: Displays a submit button (for submitting the form)",
          "5- <input type='button'>: Displays a clickable button",
        ],
        codeString: null,
      },
      {
        subTitle: "Text Fields",
        information: [
          "The <input type='text'> defines a single-line input field for text input.",
        ],
        codeString: `<form>
    <label for="fname">First name:</label><br>
    <input type="text" id="fname" name="fname"><br>
    <label for="lname">Last name:</label><br>
    <input type="text" id="lname" name="lname">
  </form>`,
      },
      {
        subTitle: "The <label> Element",
        information: [
          "Notice the use of the <label> element in the example above.",

          "The <label> tag defines a label for many form elements.",

          "The <label> element is useful for screen-reader users, because the screen-reader will read out loud the label when the user focus on the input element.",

          "The <label> element also help users who have difficulty clicking on very small regions (such as radio buttons or checkboxes) - because when the user clicks the text within the <label> element, it toggles the radio button/checkbox.",

          "The for attribute of the <label> tag should be equal to the id attribute of the <input> element to bind them together.",
        ],
        codeString: null,
      },
      {
        subTitle: "Radio Buttons",
        information: [
          "The <input type='radio'> defines a radio button.",

          "Radio buttons let a user select ONE of a limited number of choices.",
        ],
        codeString: `<p>Choose your favorite Web language:</p>
  
  <form>
    <input type="radio" id="html" name="fav_language" value="HTML">
    <label for="html">HTML</label><br>
    <input type="radio" id="css" name="fav_language" value="CSS">
    <label for="css">CSS</label><br>
    <input type="radio" id="javascript" name="fav_language" value="JavaScript">
    <label for="javascript">JavaScript</label>
  </form>`,
      },
      {
        subTitle: "Checkboxes",
        information: [
          "The <input type='checkbox'> defines a checkbox.",

          "Checkboxes let a user select ZERO or MORE options of a limited number of choices.",
        ],
        codeString: `<form>
      <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
      <label for="vehicle1"> I have a bike</label><br>
      <input type="checkbox" id="vehicle2" name="vehicle2" value="Car">
      <label for="vehicle2"> I have a car</label><br>
      <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat">
      <label for="vehicle3"> I have a boat</label>
  </form>`,
      },
      {
        subTitle: "The Submit Button",
        information: [
          "The <input type='submit'> defines a button for submitting the form data to a form-handler.",

          "The form-handler is typically a file on the server with a script for processing input data.",

          "The form-handler is specified in the form's action attribute.",
        ],
        codeString: `<form action="/action_page.php">
      <label for="fname">First name:</label><br>
      <input type="text" id="fname" name="fname" value="John"><br>
      <label for="lname">Last name:</label><br>
      <input type="text" id="lname" name="lname" value="Doe"><br><br>
      <input type="submit" value="Submit">
  </form>`,
      },
      {
        subTitle: "The Name Attribute for <input>",
        information: [
          "Notice that each input field must have a name attribute to be submitted.",

          "If the name attribute is omitted, the value of the input field will not be sent at all.",
        ],
        codeString: `<form action="/action_page.php">
      <label for="fname">First name:</label><br>
      <input type="text" id="fname" value="John"><br><br>
      <input type="submit" value="Submit">
  </form>`,
      },
    ],
    chapterSummary: [],
  },
  {
    id: "4",
    title: "Tables",
    description:
      "In HTML, A Table Is An Element That Allows For The Representation Of Data In Two Dimensions...",
    content: [
      {
        subTitle: null,
        information: [
          "HTML tables allow web developers to arrange data into rows and columns.",
        ],
        codeString: `<!DOCTYPE html>
  <html>
  <head>
  <style>
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  
  tr:nth-child(even) {
    background-color: #dddddd;
  }
  </style>
  </head>
  <body>
  
  <h2>HTML Table</h2>
  
  <table>
    <tr>
      <th>Company</th>
      <th>Contact</th>
      <th>Country</th>
    </tr>
    <tr>
      <td>Alfreds Futterkiste</td>
      <td>Maria Anders</td>
      <td>Germany</td>
    </tr>
    <tr>
      <td>Centro comercial Moctezuma</td>
      <td>Francisco Chang</td>
      <td>Mexico</td>
    </tr>
    <tr>
      <td>Ernst Handel</td>
      <td>Roland Mendel</td>
      <td>Austria</td>
    </tr>
    <tr>
      <td>Island Trading</td>
      <td>Helen Bennett</td>
      <td>UK</td>
    </tr>
    <tr>
      <td>Laughing Bacchus Winecellars</td>
      <td>Yoshi Tannamuri</td>
      <td>Canada</td>
    </tr>
    <tr>
      <td>Magazzini Alimentari Riuniti</td>
      <td>Giovanni Rovelli</td>
      <td>Italy</td>
    </tr>
  </table>
  
  </body>
  </html>`,
      },
      {
        subTitle: "Define an HTML Table",
        information: [
          "A table in HTML consists of table cells inside rows and columns",
        ],
        codeString: `<table>
    <tr>
      <th>Company</th>
      <th>Contact</th>
      <th>Country</th>
    </tr>
    <tr>
      <td>Alfreds Futterkiste</td>
      <td>Maria Anders</td>
      <td>Germany</td>
    </tr>
    <tr>
      <td>Centro comercial Moctezuma</td>
      <td>Francisco Chang</td>
      <td>Mexico</td>
    </tr>
  </table>`,
      },
      {
        subTitle: "Table Cells",
        information: [
          "Each table cell is defined by a <td> and a </td> tag.",
          "td stands for table data.",
          "Everything between <td> and </td> are the content of the table cell.",
        ],
        codeString: `<table>
    <tr>
      <td>Emil</td>
      <td>Tobias</td>
      <td>Linus</td>
    </tr>
  </table>`,
      },
      {
        subTitle: "Table Rows",
        information: [
          "Each table row starts with a <tr> and end with a </tr> tag.",
          "tr stands for table row.",
          "You can have as many rows as you like in a table, just make sure that the number of cells are the same in each row.",
        ],
        codeString: `<table>
    <tr>
      <td>Emil</td>
      <td>Tobias</td>
      <td>Linus</td>
    </tr>
    <tr>
      <td>16</td>
      <td>14</td>
      <td>10</td>
    </tr>
  </table>`,
      },
      {
        subTitle: "Table Headers",
        information: [
          "Sometimes you want your cells to be headers, in those cases use the <th> tag instead of the <td> tag:",
          "By default, the text in <th> elements are bold and centered, but you can change that with CSS.",
        ],
        codeString: `<table>
    <tr>
      <th>Person 1</th>
      <th>Person 2</th>
      <th>Person 3</th>
    </tr>
    <tr>
      <td>Emil</td>
      <td>Tobias</td>
      <td>Linus</td>
    </tr>
    <tr>
      <td>16</td>
      <td>14</td>
      <td>10</td>
    </tr>
  </table>`,
      },
      {
        subTitle: "HTML table tags",
        information: [
          "1- <table>: Defines a table",
          "2- <th>: Defines a header cell in a table",
          "3- <tr>:	Defines a row in a table",
          "4- <td>: Displays a submit button (for submitting the form)",
          "5- <caption>: Displays a clickable button",
          "6- <colgroup>: Specifies a group of one or more columns in a table for formatting",
          "7- <col>: Specifies column properties for each column within a <colgroup> element",
          "8- <thead>: Groups the header content in a table",
          "9- <tbody>: Groups the body content in a table",
          "10- <tfoot>: Groups the footer content in a table",
        ],
        codeString: null,
      },
    ],
    chapterSummary: [],
  },
  {
    id: "5",
    title: "Paragraphs",
    description:
      "A paragraph always starts on a new line, and browsers automatically add some white space...",
    content: [
      {
        subTitle: null,
        information: [
          "The HTML <p> element defines a paragraph.",

          "A paragraph always starts on a new line, and browsers automatically add some white space (a margin) before and after a paragraph.",
        ],
        codeString: `<p>This is a paragraph.</p>
  <p>This is another paragraph.</p>`,
      },
      {
        subTitle: "HTML Display",
        information: [
          "You cannot be sure how HTML will be displayed.",

          "Large or small screens, and resized windows will create different results.",

          "With HTML, you cannot change the display by adding extra spaces or extra lines in your HTML code.",

          "The browser will automatically remove any extra spaces and lines when the page is displayed:",
        ],
        codeString: `<p>
    This paragraph
    contains a lot of lines
    in the source code,
    but the browser
    ignores it.
  </p>
  
  <p>
    This paragraph
    contains         a lot of spaces
    in the source         code,
    but the        browser
    ignores it.
  </p>`,
      },
      {
        subTitle: "HTML Horizontal Rules",
        information: [
          "The <hr> tag defines a thematic break in an HTML page, and is most often displayed as a horizontal rule.",

          "The <hr> element is used to separate content (or define a change) in an HTML page:",

          "The <hr> tag is an empty tag, which means that it has no end tag.",
        ],
        codeString: `<h1>This is heading 1</h1>
  <p>This is some text.</p>
  <hr>
  <h2>This is heading 2</h2>
  <p>This is some other text.</p>
  <hr>`,
      },
      {
        subTitle: "HTML Line Breaks",
        information: [
          "The HTML <br> element defines a line break.",

          "Use <br> if you want a line break (a new line) without starting a new paragraph:",

          "The <br> tag is an empty tag, which means that it has no end tag.",
        ],
        codeString: "<p>This is<br>a paragraph<br>with line breaks.</p>",
      },
      {
        subTitle: "The Poem Problem",
        information: ["This poem will display on a single line:"],
        codeString: `<p>
    My Bonnie lies over the ocean.
  
    My Bonnie lies over the sea.
  
    My Bonnie lies over the ocean.
  
    Oh, bring back my Bonnie to me.
  </p>`,
      },
      {
        subTitle: "Solution - The HTML <pre> Element",
        information: [
          "The HTML <pre> element defines preformatted text.",

          "The text inside a <pre> element is displayed in a fixed-width font (usually Courier), and it preserves both spaces and line breaks:",
        ],
        codeString: `<pre>
    My Bonnie lies over the ocean.
  
    My Bonnie lies over the sea.
  
    My Bonnie lies over the ocean.
  
    Oh, bring back my Bonnie to me.
  </pre>`,
      },
    ],
    chapterSummary: [],
  },
  {
    id: "6",
    title: "Headings",
    description:
      "HTML headings are titles or subtitles that you want to display on a webpage.",
    content: [
      {
        subTitle: null,
        information: [
          "HTML headings are defined with the <h1> to <h6> tags.",

          "<h1> defines the most important heading. <h6> defines the least important heading.",
        ],
        codeString: `<h1>Heading 1</h1>
  <h2>Heading 2</h2>
  <h3>Heading 3</h3>
  <h4>Heading 4</h4>
  <h5>Heading 5</h5>
  <h6>Heading 6</h6>`,
      },
      {
        subTitle: "Headings Are Important",
        information: [
          "Search engines use the headings to index the structure and content of your web pages.",

          "Users often skim a page by its headings. It is important to use headings to show the document structure.",

          "<h1> headings should be used for main headings, followed by <h2> headings, then the less important <h3>, and so on.",

          "Note: Use HTML headings for headings only. Don't use headings to make text BIG or bold.",
        ],
        codeString: null,
      },
      {
        subTitle: "Bigger Headings",
        information: [
          "Each HTML heading has a default size. However, you can specify the size for any heading with the style attribute, using the CSS font-size property:",
        ],
        codeString: "<h1 style='font-size:60px;''>Heading 1</h1>",
      },
    ],
    chapterSummary: [],
  },
];
const getAllDocumentation = (req, res, next) => {
  if (!DUMMY_DOCUMENTATION) {
    throw new HttpError("Could not locate any documentation", 404);
  }
  res.json({ DUMMY_DOCUMENTATION });
};

const getDocumentationById = (req, res, next) => {
  const docId = req.params.docId;
  const documentation = DUMMY_DOCUMENTATION_DATA.find((d) => {
    return d.id === docId;
  });
  if (!documentation) {
    return next(
      new HttpError("Could not find a documentation for the provided id"),
      404
    );
  }
  res.json({ documentation });
};

exports.getAllDocumentation = getAllDocumentation;
exports.getDocumentationById = getDocumentationById;
