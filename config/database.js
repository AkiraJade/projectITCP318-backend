const mongoose = require('mongoose');

let isConnected = false;

const connectDatabase = async () => {
    if (!process.env.DB_URI) {
        console.error('MongoDB error: DB_URI environment variable is missing.');
        return;
    }

    if (isConnected || mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        const con = await mongoose.connect(process.env.DB_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        isConnected = true;
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
    }
};

module.exports = connectDatabase;
