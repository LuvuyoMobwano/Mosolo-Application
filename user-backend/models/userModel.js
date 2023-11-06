import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullName: {
        type: String, 
        required: true,
    }, 
    email: {
        type: String, 
        required: true, 
        unique: true,
    }, 
    phoneNumber: {
        type: String, 
        required: true, 
        unique: true,
    }, 
    password: {
        type: String, // Passwords must be hashed before storing
        required: true,
    }, 
    cardNumber: {
        type: String, // Add a card number field
    },
    balance: {
        type: Number,
    }, 
    airtime: {
        type: Number, 
        default: 0,
    }, 
    data: {
        type: Number, 
        default: 0,
    }, 
    electricity: {
        type: Number, 
        default: 0,
    },
    waterBill: {
        type: Number, 
        default: 0,
    },
},
{
    timestamps: true,
}); 

export const User = mongoose.model('user', userSchema); 