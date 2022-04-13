const HttpError = require("../models/http-error");
const HtmlDocumentation = require("../models/documentation.js")

const getAllDocumentation = async(req, res, next) => {

    let documentation;
    try {
        documentation = await HtmlDocumentation.find();
    } catch (err) {
        const error = new HttpError("Something went wrong, please try again", 404)
        return next(error);
    }
    if (!documentation) {
        const error = new HttpError("Could not locate the HTML reference page", 404);
        return next(error);
    }
    res.json({
        documentation: documentation.map(htmlDocumentation => htmlDocumentation.toObject({ getters: true }))
    });
};

const getDocumentationById = async(req, res, next) => {
    const docId = req.params.docId;

    let documentation;
    try {
        documentation = await HtmlDocumentation.findById(docId);
    } catch (err) {
        const error = new HttpError("Something went wrong, could not find the specific documentation.", 500);
        return next(error);
    }

    if (!documentation) {
        const error = new HttpError("Could not find a reference for the provided id", 404);
        return next(error);
    }
    res.json({
        documentation: documentation.toObject({ getters: true })
    });
};

const getRandomDocumentation = async(req, res, next) => {
    
    var random = Math.floor(Math.random() * 20);
    let documentation;
    try {
        documentation = await HtmlDocumentation.findOne().skip(random);
    } catch (err) {
        const error = new HttpError("Something went wrong, please try again", 404)
        return next(error);
    }
    if (!documentation) {
        const error = new HttpError("Could not locate the HTML reference page", 404);
        return next(error);
    }
    res.json({
        documentation: documentation.toObject({ getters: true })
    });
}

exports.getAllDocumentation = getAllDocumentation;
exports.getDocumentationById = getDocumentationById;
exports.getRandomDocumentation = getRandomDocumentation;