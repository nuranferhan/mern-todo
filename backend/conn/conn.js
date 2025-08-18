require('dotenv').config({ path: '../.env' });
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected");
    } catch (error) {
        console.error("Connection Error:", error.message);
        process.exit(1);
    }
};

connectDB();

module.exports = connectDB; 