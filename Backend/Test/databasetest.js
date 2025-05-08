// databasetest.js

// In databasetest.js:
const { Course } = require('../Models/classes.js');

// Import MongoClient from the mongodb package.
const { MongoClient } = require('mongodb');

// Replace with your actual MongoDB connection string and database name.
const uri = "mongodb+srv://test1:Hello12345@4ypdatabase.99j9mje.mongodb.net/yourDatabaseName?retryWrites=true&w=majority&appName=4YPDatabase";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function testDatabase() {
    try {
        // Connect to MongoDB.
        await client.connect();
        console.log("Connected to MongoDB.");

        // Select your database and collection.
        const database = client.db("yourDatabaseName"); // Replace with your DB name.
        const coursesCollection = database.collection("courses");

        // Query for the course document with courseId "CMSC 201"
        const courseDoc = await coursesCollection.findOne({ courseId: "CMSC 101" });
        if (!courseDoc) {
            console.log(`Course with ID "CMSC 201" not found.`);
            return;
        }
        console.log("Retrieved course document:", courseDoc);

        // Convert prerequisites to a semicolon-delimited string.
        const prerequisitesString = (courseDoc.prerequisites && courseDoc.prerequisites.length > 0)
            ? courseDoc.prerequisites.map(group => group.join("|")).join(",")
            : "";

        // Build a semicolon-delimited string in the format expected by your Course class.
        // Example format: "CMSC 201; Data Structures; 3; CMSC 101; Introduction to data structures; Prof. X,Prof. Y;"
        const courseDataString = `${courseDoc.courseId}; ${courseDoc.title}; ${courseDoc.credits}; ${prerequisitesString}; ${courseDoc.description}; ${courseDoc.professors.join(",")};`;

        // Create an instance of the Course class using the constructed string.
        const courseObject = new Course(courseDataString);

        // Output the created Course object.
        console.log("Created Course Object:", courseObject);
    } catch (error) {
        console.error("Error during database test:", error);
    } finally {
        // Close the MongoDB client connection.
        await client.close();
    }
}

// Run the test function.
testDatabase().catch(console.error);
