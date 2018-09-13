const mongoose = require('mongoose');
const fs = require('fs');
const LessonModel = require('./LessonsDatabase');

mongoose.createConnection("mongodb://localhost/doremi-app");

let dummyData;

lessonData = fs.readFile(__dirname + "/assets/lessonData.json", (err, data) => {
    if (err) throw err;
    dummyData = JSON.parse(data);
    newLesson = new LessonModel(dummyData);
    newLesson.save(err => {
        if (err) throw err;
    });
});