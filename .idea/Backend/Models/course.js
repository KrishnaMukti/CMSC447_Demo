// backend/models/Course.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const CourseSchema = new Schema({
    courseId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    credits: { type: Number, required: true },
    prerequisites: {
        type: [[String]], // Array of arrays; each inner array is a group of alternative prerequisites.
        default: []
    },
    description: { type: String },
    professors: { type: [String], default: [] }
});

CourseSchema.index({ courseId: 1 }, { unique: true });
module.exports = mongoose.model('Course', CourseSchema);
