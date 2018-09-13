const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
    "topic": String,
    "clef": String,
    "keySig": String,
    "timeSig": String,
    "answer": Array[String]
});

const ExerciseModel = mongoose.model(ExerciseSchema);

module.exports = ExerciseModel;