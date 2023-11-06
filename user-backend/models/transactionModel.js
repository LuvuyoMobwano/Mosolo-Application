import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },
    userName: {
        type: String, // Add a field to store the user's name. 
        required: true,
    },
    transactionType: {
        type: String,
        required: true,
    }, 
    amount: {
        type: Number, 
        required: true,
    },
    timestamp: {
        type: Date, 
        default: Date.now, 
    }, 
}); 

export const Transaction = mongoose.model('transaction', transactionSchema); 