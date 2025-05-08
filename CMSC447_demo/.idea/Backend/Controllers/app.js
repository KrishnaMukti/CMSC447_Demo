// Controllers/app.js

const express = require('express');
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { checkCourseSequence } = require('../Utils/DataAlgo');
const courseRoutes = require('../Routes/CourseRoutes');
const adminRoutes = require('../Routes/adminRoutes'); // added admin routes

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI
    || 'mongodb+srv://test1:Hello12345@4ypdatabase.99j9mje.mongodb.net/4YPDatabase?retryWrites=true&w=majority';

async function startServer() {
    // 1) Connect to MongoDB (for your courseRoutes)
    const client = new MongoClient(MONGO_URI, {
        serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    await client.connect();
    console.log('✅ MongoDB connected');

    // 2) Create Express app
    const app = express();
    app.use(express.json());

    // 3) Serve Pages folder at root, defaulting to index.html
    app.use(
        '/',
        express.static(path.join(__dirname, '../../Pages'), { index: 'index.html' })
    );

    // 4) Serve other static assets if needed
    app.use('/utils', express.static(path.join(__dirname, '../Utils')));
    app.use('/Backend/Models', express.static(path.join(__dirname, '../Models')));

    // 5) API routes
    app.use('/api/course', courseRoutes);

    // Admin routes added here
    app.use('/api/admin', adminRoutes);

    const { checkCourseSequence } = require('../Utils/DataAlgo');

    app.post('/api/compare', (req, res) => {
        const { plan, track } = req.body;
        const result = checkCourseSequence(plan, track); // ✅ FIXED: Track passed in
        return res.json(result);
    });



    // 6) 404 fallback
    app.use((req, res) => res.status(404).send('Not Found'));

    // 7) Start listening
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
}

startServer().catch(err => {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
});
