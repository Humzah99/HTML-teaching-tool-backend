const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const documentationSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    content: {
        subTitle: {
            type: String,
            required: false
        },
        information: [{
            type: String,
            required: false
        }],
        codeString: {
            type: String,
            required: false
        }

    },
    chapterSummary: [{
        type: String,
        required: false
    }]
});

module.exports = mongoose.model('HtmlDocumentation', documentationSchema);