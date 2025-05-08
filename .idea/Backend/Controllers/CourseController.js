const { retrieveCourse } = require('./RetrieveCourse');
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://test1:Hello12345@4ypdatabase.99j9mje.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const db = client.db("4YPDatabase");
const courses = db.collection("courses");

// GET handler
async function getCourseById(req, res) {
    try {
        const rawId = req.params.id || req.params.courseId;
        if (!rawId) return res.status(400).json({ error: 'Missing courseId' });

        const doc = await retrieveCourse(rawId);
        if (!doc) return res.status(404).json({ error: 'Course not found' });

        res.json(doc);
    } catch (err) {
        console.error('→ Error retrieving course:', err);
        res.status(500).json({ error: 'Server error' });
    }
}

// POST handler
async function createOrUpdateCourse(req, res) {
    try {
        const course = req.body;
        if (!course || !course.courseId) {
            return res.status(400).json({ error: 'Missing courseId in request body' });
        }

        course.courseId = course.courseId.trim().toUpperCase();
        await client.connect();
        await courses.updateOne(
            { courseId: course.courseId },
            { $set: course },
            { upsert: true }
        );

        res.json({ status: "success" });
    } catch (err) {
        console.error("→ Error saving course:", err);
        res.status(500).json({ error: "Failed to save course" });
    }
}

// DELETE handler
async function deleteCourse(req, res) {
    try {
        const courseId = req.params.id.trim().toUpperCase();
        await client.connect();
        await courses.deleteOne({ courseId });

        res.json({ status: "deleted" });
    } catch (err) {
        console.error("→ Error deleting course:", err);
        res.status(500).json({ error: "Failed to delete course" });
    }
}

// ✅ EXPORT EVERYTHING
module.exports = {
    getCourseById,
    createOrUpdateCourse,
    deleteCourse
};
