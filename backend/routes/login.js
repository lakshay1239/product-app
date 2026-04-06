const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Users = require('../models/User');
const app = express();
import { userMessages } from '../Utils/util'

app.use(express.json())

router.post('/login', async (req, res) => {
    
    const { email, password } = req.body;

    const users = await Users.find({ email: email });  
    
    if (users.length>0 && email === users[0].email && password === users[0].password) {
        const token = jwt.sign(
        { userId: users[0].email }, 
        userMessages.tokenKey, 
        { expiresIn: '10m' }
         );
    
        return res.status(200).json({ 
            message: userMessages.loginSuccess, 
            token: token
        });
    } else {
        return res.status(401).json({ 
            message: userMessages.invalidCred 
        });
    }
    
});

module.exports = router;