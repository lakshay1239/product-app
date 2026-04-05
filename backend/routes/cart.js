const express = require('express');
const router = express.Router();
const CartItems = require('../models/Cart'); // Import the Post model
const jwt = require('jsonwebtoken');
const Cart = require('../models/Cart');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1]; // Extract Bearer token

    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const verified = jwt.verify(token, 'ahgjagjfggdjfh');
        req.user = verified;
        next();
    } catch (err) {
        console.log(err)
        res.status(403).json({ message: "Invalid Token" });
    }
};

// Route to fetch all posts
router.post('/addItem', authenticateToken,async (req, res) => {
  try {
    const { product } = req.body;
    await CartItems.insertOne(product);

    res.json({}); // Send the data as a JSON response
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Route to fetch a single post by ID
router.get('/',authenticateToken, async (req, res) => {
    try {
        const productsStr = await Cart.find({ });
        if (!productsStr) return res.status(404).send('Post not found');
        
        res.json(productsStr);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
