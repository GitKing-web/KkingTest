const express = require('express');
const app = express();
const connectDB = require('./configs/config.index');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 3001;

dotenv.config();

app.listen(PORT, async() => {
    await connectDB()
    .then(() => console.log('DB connected.'))
    .catch((error) => console.log(error))
console.log('server running...', PORT);
})