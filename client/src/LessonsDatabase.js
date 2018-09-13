const mongoose = require('mongoose');


const lessonSchema = new mongoose.Schema({
    "title": String,
    "subheader": String,
    "level": String,
    "body": String
});

const LessonModel = mongoose.model(lessonSchema);
module.exports = LessonModel;