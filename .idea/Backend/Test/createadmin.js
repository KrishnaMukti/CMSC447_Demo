// scripts/createAdminDriver.js
require('dotenv').config();               // if you keep URI in .env
const { MongoClient, ServerApiVersion } = require('mongodb');
const bcrypt = require('bcryptjs');

// load from .env or hard-code above
const uri = process.env.MONGO_URI ||
    "mongodb+srv://test1:Hello12345@4ypdatabase.99j9mje.mongodb.net/4YPDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB");

        const db = client.db("4YPDatabase");
        const users = db.collection("users");

        // hash the admin password
        const passwordHash = await bcrypt.hash("pass123", 12);

        // insert admin user
        const result = await users.insertOne({
            username: "admin",
            passwordHash,
            createdAt: new Date()
        });

        console.log("🛡️  Admin created with _id:", result.insertedId);
    } finally {
        await client.close();
    }
}

run().catch(err => {
    console.error(err);
    process.exit(1);
});
