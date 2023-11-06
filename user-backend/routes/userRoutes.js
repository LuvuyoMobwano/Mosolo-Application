// Imports needed for user authentication
import express from "express";
import bcrypt from 'bcrypt'; // For hasing passwords
import jwt from 'jsonwebtoken'; // For generating tokens
import { randomBytes } from 'crypto';
import validator from "validator";
import { parsePhoneNumberFromString } from 'libphonenumber-js';

import { User } from "../models/userModel.js";
import { generateCardNumber, authenticateUser } from "../index.js";

// variable that is used as the router.
const userRouter = express.Router();

// API route for registration.
userRouter.post('/register', async (request, response) => {
    try {
        const { fullName, email, phoneNumber, password } = request.body;

        if (!request.body.fullName || !request.body.email || !request.body.phoneNumber || !request.body.password) {
            // making sure all the required fields are full
            return response.status(400).json({ error: 'Enter all required fields' });
        }

        // Email validation
        if (!validator.isEmail(email)) {
            return response.status(400).json({ error: 'Email is not valid (check for @ symbol and domain)' });
        }

        // Phone number validation
        const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber);
        if (!parsedPhoneNumber || !parsedPhoneNumber.isValid()) {
            return response.status(400).json({ error: 'Phone number is not valid (check for area code)' });
        }

        // Checking if user with the given email or phone number already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { phoneNumber }],
        });

        if (existingUser) {
            return response.status(400).json({ error: 'User already exists.' });
        }

        // Generate a card number for the user.
        const cardNumber = generateCardNumber();

        // Hash the password before storing it.
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // creating the variable that will carry the information for the new user.
        const newUser = {
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            cardNumber: cardNumber,
            balance: 50, // this is for testing purposes. It will be removed later.
        };

        const user = await User.create(newUser);

        return response.status(201).json(user);
    }
    catch (error) {
        console.log('Error registering the user: ', error);
        return response.status(500).json({ error: 'An internal server error occured.' });
    }
});

// API route for login.
userRouter.post('/login', async (request, response) => {
    try {
        const { email, password } = request.body;

        if (!request.body.email || !request.body.password) {
            return response.status(400).json({ error: "Enter all required fields" });
        }

        // Email validation
        if (!validator.isEmail(email)) {
            return response.status(400).json({ error: 'Email is not valid (check for @ symbol and domain)' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return response.status(404).json({ error: 'User not found.' });
        }

        // Compare the provided password with the hashed password in the database 
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return response.status(401).json({ error: 'Incorrect Password.' });
        }

        // Generating a random secret key
        const secretKey = randomBytes(64).toString('hex');

        // Storing the secret key in an environment variable
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '30m' });

        return response.status(200).json({ message: 'Login Successful', userID: user._id, token });
    }
    catch (error) {
        console.log('Error loggin in: ', error);
        return response.status(500).json({ error: 'An internal server error occured.' });
    }
});

// API route for logout.
userRouter.post('/logout/:id', /*authenticateUser,*/ async (request, response) => {
    try {
        // Invalidate the token (optional, but recommended in a real application)
        // You can store the invalidate token in a blacklist to prevent further use
        // For this example, we'll just send a success message
        return response.status(200).json({ message: 'Logout Successful' });
    }
    catch (error) {
        console.log('Error logging out: ', error);
        return response.status(500).json({ error: 'An internal server error occured.' });
    }
});

export default userRouter;