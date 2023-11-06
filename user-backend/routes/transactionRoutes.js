import express, { request, response } from "express";
import mongoose from "mongoose";
import { User } from "../models/userModel.js";
import { Transaction } from "../models/transactionModel.js";
import { generatePurchasePin } from "../index.js";
import validator from "validator";
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const transactionRouter = express.Router();

// API route for fetching user's card number for the wallet section.
transactionRouter.get('/wallet/:id', /*authenticateUser,*/ async (request, response) => {
    try {
        // finding the user based on their card number
        const { id } = request.params;

        const user = await User.findById(id);

        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }

        // return the user's card number and account balance
        return response.status(200).json({
            data: {
                cardNumber: user.cardNumber,
                balance: user.balance,
                airtime: user.airtime,
                data: user.data,
                electricity: user.electricity,
                waterBill: user.waterBill
            }
        });
    }
    catch (error) {
        console.log('Error fetching user wallet information: ', error);
        return response.status(500).json({ error: 'An internal server error occured.' });
    }
});

// API route for getting user's account info.
transactionRouter.get('/account-info/:id', /*authenticateUser,*/ async (request, response) => {
    try {
        const { id } = request.params;

        const user = await User.findById(id);

        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }

        // Returning the requested user account information
        const accountInfo = {
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
        };

        return response.status(200).json(accountInfo);
    }
    catch (error) {
        console.log('Error fetching user account information: ', error);
        return response.status(500).json({ error: 'An internal server error occured.' });
    }
});

// API route for editing user account.
transactionRouter.put('/edit-account/:id', /*authenticateUser,*/ async (request, response) => {
    try {
        const { id } = request.params;
        const { fullName, email, phoneNumber } = request.body;

        // Find the user by their card number
        const user = await User.findById(id);

        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }

        if (email && !validator.isEmail(email)) {
            return response.status(400).json({ error: 'Email is not valid (check for @ symbol and domain)' });
        }

        const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber);
        if (phoneNumber && (!parsedPhoneNumber || !parsedPhoneNumber.isValid())) {
            return response.status(400).json({ error: 'Phone number is not valid (check for area code)' });
        }

        // Update the user's account information
        if (fullName) {
            user.fullName = fullName;
        }
        if (email) {
            user.email = email;
        }
        if (phoneNumber) {
            user.phoneNumber = phoneNumber;
        }

        // Save the updated user document
        await user.save();

        return response.status(200).json({ message: 'Account updated successfully', user });
    }
    catch (error) {
        console.log('Error editing user account: ', error);
        return response.status(500).json({ error: 'An internal server error occured.' });
    }
});

// API route for deleting user account.
transactionRouter.delete('/delete-account/:id', /*authenticateUser,*/ async (request, response) => {
    try {
        // Finding the user based on their ob
        const { id } = request.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return response.status(404).json({ message: 'Account not found' });
        }

        return response.status(200).json({ message: 'Account deleted successfully' });
    }
    catch (error) {
        console.log('Error deleting user account: ', error);
        return response.status(500).json({ error: 'An internal server error occured.' });
    }
});

// API route for purchasing airtime.
transactionRouter.post('/purchase-airtime/:id', /*authenticateUser,*/ async (request, response) => {
    try {
        const { id } = request.params;
        const { amount } = request.body;

        // Find the user by their card number
        const user = await User.findById(id);

        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }

        // Check if the user has sufficient balance for the airtime purchase
        if (user.balance < amount) {
            return response.status(400).json({ error: 'Insufficient balance' });
        }

        const pinHolder = generatePurchasePin();
        const pin = '*100*' + pinHolder + '#';

        // Use an atomic update to deduct the amount from the user's balance and update the airtime field
        const updatedUser = await User.findByIdAndUpdate(id, {
            $inc: { balance: -amount, airtime: amount }
        }, { new: true });

        // Creating a record of a new transaction
        const transaction = new Transaction({
            user: user._id,
            userName: user.fullName,
            transactionType: 'Airtime',
            amount: amount,
        });

        await transaction.save();

        return response.status(200).json({ message: 'Artime purchase successful: ', pin, balance: updatedUser.balance });
    }
    catch (error) {
        console.log('Error purchasing airtime: ', error);
        return response.status(500).json({ error: 'An internal server error occured.' });
    }
});

// API route for purchasing cellular data.
transactionRouter.post('/purchase-data/:id', /*authenticateUser,*/ async (request, response) => {
    try {
        const { id } = request.params;
        const { amount } = request.body;

        // Find the user by their MongoDB object ID
        const user = await User.findById(id);

        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }

        // Check if the user has sufficient funds for data purchase
        if (user.balance < amount) {
            return response.status(400).json({ error: 'Insufficient balance' });
        }

        const pinHolder = generatePurchasePin();
        const pin = '*110*' + pinHolder + '#';

        // Use an atomic update to deduct the cost of the data from the user's balance and update the data field
        const updatedUser = await User.findByIdAndUpdate(id, {
            $inc: { balance: -amount, data: amount }
        }, { new: true });

        // Creating a record of a new transaction
        const transaction = new Transaction({
            user: updatedUser._id,
            userName: updatedUser.fullName,
            transactionType: 'Data',
            amount: amount,
        });

        await transaction.save();

        return response.status(200).json({ message: 'Cellular data purchase successful: ', pin, balance: updatedUser.balance });
    }
    catch (error) {
        console.log('Error purchasing cellular data: ', error);
        return response.status(500).json({ error: 'An internal server error occured.' });
    }
});

// API route for purchasing electricity.
transactionRouter.post('/purchase-electricity/:id', /*authenticateUser,*/ async (request, response) => {
    try {
        const { id } = request.params;
        const { meterNumber, amount } = request.body;

        // Find the user by their card number
        const user = await User.findById(id);

        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }

        if (!meterNumber) {
            return response.status(400).json({ error: 'Meter number is required' });
        }

        // Check if the user has sufficient balance for the electricity purchase
        if (user.balance < amount) {
            return response.status(400).json({ error: 'Insufficient balance' });
        }

        const pinHolder = generatePurchasePin();
        const pin = '*120*' + pinHolder + '#';

        // Use an atomic update to deduct the amount from the user's balance and update the electricity field
        const updatedUser = await User.findByIdAndUpdate(id, {
            $inc: { balance: -amount, electricity: amount }
        }, { new: true });

        // Creating a record of a new transaction
        const transaction = new Transaction({
            user: updatedUser._id,
            userName: updatedUser.fullName,
            transactionType: 'Electricity',
            amount: amount,
        });

        await transaction.save();

        return response.status(200).json({ message: 'Electricity purchase successful: ', pin, balance: updatedUser.balance });
    }
    catch (error) {
        console.log('Error purchasing electricity: ', error);
        return response.status(500).json({ error: 'An internal server error occured.' });
    }
});

// API route for paying the water bill. 
transactionRouter.post('/pay-water-bill/:id', /*authenticateUser,*/ async (request, response) => {
    try {
        const { id } = request.params;
        const { meterNumber, amount } = request.body;

        // Find the user by thier ID.
        const user = await User.findById(id);

        if (!user) {
            return response.status(404).json({ error: 'User not found.' });
        }

        if (!meterNumber) {
            return response.status(400).json({ error: 'Meter number is required.' });
        }

        // Checking if the user has sufficient balance for the water bill payment.
        if (user.balance < amount) {
            return response.status(400).json({ error: 'Insufficient balance.' });
        }

        // Use an atomic update to deduct the amount from the user's balance and update the waterBill field
        const updatedUser = await User.findByIdAndUpdate(id, {
            $inc: { balance: -amount, waterBill: amount }
        }, { new: true });

        // Creating a record of the transaction. 
        const transaction = new Transaction({
            user: updatedUser._id,
            userName: updatedUser.fullName,
            transactionType: 'Water Bill',
            amount: amount,
        });

        await transaction.save();

        return response.status(200).json({ message: 'Water bill payment successful', balance: updatedUser.balance });
    }
    catch (error) {
        console.log('Error paying water bill: ', error);
        return response.status(500).json({ error: 'An internal server error occured.' });
    }
});

// API route for paying a beneficiary
transactionRouter.post('/pay-beneficiary/:id', /*authenticateUser,*/ async (request, response) => {
    try {
        const { id } = request.params; 
        const { beneficiaryCardNumber, amount } = request.body; 

        // Find the user by their ID
        const user = await User.findById(id); 

        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }

        // Find the beneficiary by their card number
        const beneficiary = await User.findOne({ cardNumber: beneficiaryCardNumber });

        if (!beneficiary) {
            return response.status(404).json({ error: 'Beneficiary not found'})
        }

        //Check if the user has sufficient balance for the payment. 
        if (user.balance < amount) {
            return response.status(400).json({ error: 'Insufficient balance' }); 
        }

        // Use an atomic update to deduct the amount from the user's balance
        const updatedUser = await User.findByIdAndUpdate(id, {
            $inc: { balance: -amount }
        }, {new: true });

        // Perform an atomic update to add the amount to the beneficiary's balance.
        const updatedBeneficiary = await User.findOneAndUpdate(
            { cardNumber: beneficiaryCardNumber },
            { $inc: { balance: amount } }, 
            { new: true }
        );

        // Creating a record of the transaction
        const transaction = new Transaction({
            user: updatedUser._id,
            userName: updatedUser.fullName,
            transactionType: 'Beneficiary Payment',
            amount: amount,
        });

        await transaction.save(); 

        return response.status(200).json({ message: 'Payment to beneficiary successful', balance: updatedUser.balance}); 
    } 
    catch (error) {
        console.log('Error making payment to beneficiary: ', error);
        return response.status(500).json({ error: 'An internal server error occurred.' }); 
    }
});

export default transactionRouter; 