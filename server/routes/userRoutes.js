//This is for our user handler functions
import express from "express"
import User from "../models/userModel.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = express.Router()

//create user - /create/user
router.post('/create/user', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        // Save the user to the database
        const user = await newUser.save();
    
        res.status(200).json({ message: 'New user created', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


//login user - /login/user
router.post('/login/user', async (req, res) => {
    // Check if email and password are correct
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // If credentials are correct, generate access token
        const accessToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1hr' });
        res.status(200).json({ message: 'Login successful', token: accessToken });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
