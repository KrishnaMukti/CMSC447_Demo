// Routes/CourseRoutes.js
const express = require('express');
const router  = express.Router();
const { getCourseById } = require('../Controllers/CourseController');

// GET /api/course/:courseId
router.get('/:courseId', getCourseById);

module.exports = router;

