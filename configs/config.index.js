const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connectDB = async () => {
    await mongoose.connect(process.env.LOCALHOST)
}

module.exports = connectDB;