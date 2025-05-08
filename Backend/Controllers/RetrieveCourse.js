// Controllers/retrieveCourse.js
const { MongoClient, ServerApiVersion } = require('mongodb');

// Your Atlas connection string (adjust DB name as needed)
const uri = "mongodb+srv://test1:Hello12345@4ypdatabase.99j9mje.mongodb.net/4YPDatabase?retryWrites=true&w=majority";

// Common client options
const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

/**
 * Fetches a course document by its courseId.
 * @param {string} courseId
 * @returns {Promise<Object|null>} The course document or null if not found.
 */
async function retrieveCourse(courseId) {
    const client = new MongoClient(uri, options);
    try {
        // Connect to MongoDB
        await client.connect();
        const db = client.db('4YPDatabase');      // <-- use your actual DB name
        const courses = db.collection('courses');

        // Query for the course
        const courseDoc = await courses.findOne({ courseId });
        return courseDoc;
    } catch (err) {
        console.error("Error while retrieving course:", err);
        throw err;
    } finally {
        // Close the client on every call
        await client.close();
    }
}

module.exports = { retrieveCourse };