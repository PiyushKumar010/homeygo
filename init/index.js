const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/homeygo";

// Connect to MongoDB
async function main() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("✅ Connected to DB");
    } catch (err) {
        console.error("❌ DB connection error:", err);
    }
}

// Initialize the database
const initDB = async () => {
    try {
        await Listing.deleteMany({});
        initData.data = initData.data.map((obj) => ({...obj, owner:"689708f43bf8bb6435ca5080"}));
        await Listing.insertMany(initData.data);
        console.log("✅ Data was initialized");
    } catch (err) {
        console.error("❌ Data initialization error:", err);
    } finally {
        mongoose.connection.close(); // Optional: close connection after seeding
    }
};

main().then(initDB);
