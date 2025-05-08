// addCourses_CMSConlyFiltered.js - inserts courses, only CMSC prereqs that are also being added
const { MongoClient } = require('mongodb');

// Replace with your connection string.
const uri = "mongodb+srv://test1:Hello12345@4ypdatabase.99j9mje.mongodb.net/?retryWrites=true&w=majority&appName=4YPDatabase";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function updateCourse() {





}