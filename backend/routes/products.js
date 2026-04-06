const express = require('express');
const router = express.Router();
const Products = require('../models/Products'); // Import the Post model
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1]; // Extract Bearer token

    if (!token) return res.status(401).json({ message: userMessages.accessDeny});

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
router.get('/', authenticateToken,async (req, res) => {
  try {
    const productsStr = await Products.find({}); // Find all documents
   
    res.json(productsStr); // Send the data as a JSON response
  } catch (err) {
    console.error(err);
    res.status(500).send(userMessages.serverError);
  }
});

// Route to fetch a single post by ID
router.get('/:id',authenticateToken, async (req, res) => {
    try {
        const productsStr = await Products.find({ name: req.params.id });
        if (!productsStr) return res.status(404).send(userMessages.productNotFound);
        
        res.json(productsStr);
    } catch (err) {
        console.error(err);
        res.status(500).send(userMessages.serverError);
    }
});

module.exports = router;
