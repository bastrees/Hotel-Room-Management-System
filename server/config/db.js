const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/hrms', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to the database!');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
}

module.exports = connectDb;
