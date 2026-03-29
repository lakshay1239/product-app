const express = require('express');
const router = express.Router();
const Products = require('../models/Products'); // Import the Post model

// Route to fetch all posts
router.get('/', async (req, res) => {
  try {
    const productsStr = await Products.find({}); // Find all documents
   
    res.json(productsStr); // Send the data as a JSON response
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Route to fetch a single post by ID
router.get('/:id', async (req, res) => {
    try {
        const productsStr = await Products.find({ name: req.params.id });
        if (!productsStr) return res.status(404).send('Post not found');
        // console.log('heyy')
        res.json(productsStr);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
