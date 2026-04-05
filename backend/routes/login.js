const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Users = require('../models/User');
const app = express();
app.use(express.json())

router.post('/login', async (req, res) => {
    // 1. Verify user credentials from DB...
    // 2. If valid, create token:
    
    const { email, password } = req.body;

    const users = await Users.find({ email: email });  
    
    if (users.length>0 && email === users[0].email && password === users[0].password) {
        const token = jwt.sign(
        { userId: users[0].email }, 
        'ahgjagjfggdjfh', 
        { expiresIn: '2m' }
         );
    
        return res.status(200).json({ 
            message: "Login successful!", 
            token: token
        });
    } else {
        return res.status(401).json({ 
            message: "Invalid credentials" 
        });
    }
    
});

module.exports = router;