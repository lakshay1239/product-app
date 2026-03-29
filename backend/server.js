const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// If using dotenv
// require('dotenv').config(); 

const app = express();
const PORT = 3000;
// Use your connection string directly or from an environment variable
const mongoDBURL = 'mongodb://localhost:27017/mongo1';
app.use(cors());

// Connect to MongoDB
mongoose.connect(mongoDBURL, {
    dbName: 'local'
})
.then(() => {
    console.log('MongoDB connected successfully');
    // Start the server after successful DB connection
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process on connection failure
});

// Basic route (optional)
// app.get('/', (req, res) => {
//     res.send('Hello, Express with MongoDB!');
// });
const postsRouter = require('./routes/products');
app.use('/products', postsRouter); 
