const express = require('express');
const router = express.Router();
const CourseController = require('../Controllers/CourseController');

// GET a course
router.get('/:id', CourseController.getCourseById);

// CREATE or UPDATE a course
router.post('/', CourseController.createOrUpdateCourse);

// DELETE a course
router.delete('/:id', CourseController.deleteCourse);  // <-- line 12

module.exports = router;
