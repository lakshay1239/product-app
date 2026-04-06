const express = require('express');
const router = express.Router();
const CartItems = require('../models/Cart'); // Import the Post model
const jwt = require('jsonwebtoken');
const Cart = require('../models/Cart');
const userMessages  = require('../Utils/util');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1]; // Extract Bearer token

    if (!token) return res.status(401).json({ message: userMessages.accessDeny });

    try {
        const verified = jwt.verify(token, userMessages.tokenKey);
        req.user = verified;
        next();
    } catch (err) {
        console.log(err)
        res.status(403).json({ message: userMessages.invalidToken });
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
    res.status(500).send(userMessages.serverError);
  }
});

// Route to fetch a single post by ID
router.get('/',authenticateToken, async (req, res) => {
    try {
        const productsStr = await Cart.find({ });
        if (!productsStr) return res.status(404).send(userMessages.productNotFound);
        
        res.json(productsStr);
    } catch (err) {
        console.error(err);
        res.status(500).send(userMessages.serverError);
    }
});

module.exports = router;
