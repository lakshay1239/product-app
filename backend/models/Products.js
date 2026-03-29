const mongoose = require('mongoose');

let productSchema = mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
});

let product = module.exports = mongoose.model('products', productSchema,'products');