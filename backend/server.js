const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// If using dotenv
// require('dotenv').config(); 

const app = express();
app.use(express.json())
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
const loginRouter = require('./routes/login');
const cartRouter = require('./routes/cart');

app.use('/products', postsRouter); 
app.use('/user', loginRouter); 
app.use('/cart', cartRouter); 
