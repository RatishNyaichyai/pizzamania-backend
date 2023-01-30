const express = require('express');
const router = express.Router();
const User = require("../models/userModel");
// const ErrorHandler = require('../utils/errorhandler');
// const catchAsyncErr = require('../middleware/catchAssyncError');
const sendToken = require('../utils/jswtToken');

const jwt = require('jsonwebtoken')


router.post("/register", (req, res) => {
    const { name, email, password } = req.body

    try {
        const newUser = new User({ name, email, password })
        newUser.save()
        res.status(200).json({
            success: true,
            message: 'Register success',
            data: newUser
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        })
    }
})

const secret = "test"

router.post('/login', async (req, res) => {
    console.log('i am apiii', req.body)
    const { email, password } = req.body;
    try {
        console.log('i am in apiii', req.body)
        const user = await User.find({ email, password });
        console.log('result', user)

        if (password === user[0].password) {
            const token = jwt.sign({ username: user[0].email }, secret);
            const currentUser = {
                success: true,
                token: token,
                user,
            }
            console.log('token', currentUser)
            res.status(200).send(currentUser);
        } else {
            res.status(400).json({
                message: 'Login Failed'
            })
        }


    } catch (error) {
        res.status(404).json({
            message: "Something went wrong"
        })
    }
})

router.get('/getallusers', async (req, res) => {

    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (error) {
        res.status(404).json({ message: error.stack });
    }

})
module.exports = router;