import express, { request, response } from "express"; 
import { PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose"; 
import cors from 'cors';
import jwt from 'jsonwebtoken'; // For generating tokens
import userRouter from "./routes/userRoutes.js";
import transactionRouter from "./routes/transactionRoutes.js";

const app = express(); 

// Middleware for parsing request body and handling CORS policy
app.use(express.json()); 
app.use(cors()); 

// HTTP method used to get info from the server
app.get('/', (request, response) => {
    console.log(request); 
    return response.status(234).send('Welcome to Mosolo'); 
}); 

// Middleware for parsing the authentication route
app.use('/authentication', userRouter); 
app.use('/transaction', transactionRouter);

// Function for generating random card numbers
// Export so it can be used by userRoutes.js
export function generateCardNumber()
{
    // Generate a random 16-digit card number with spaces after every 4 digits for presentation
    const cardNumber = Array.from({ length:16 }, () => Math.floor(Math.random() * 10))
    .map((digit, index) => (index > 0 && index % 4 === 0 ? ` ${digit}`: digit))
    .join(''); 
    
    return cardNumber;
}

// Function for generating the purchase pins
// Export so it can be used by userRoutes.js
export function generatePurchasePin()
{
    const pinHolder = Math.floor(10000 + Math.random() * 90000);

    return pinHolder; 
}

export function authenticateUser(request, response, next)
{
    const token = request.header('Authorization'); // Get the token from the request header

    if (!token)
    {
        return response.status(401).send({ error: 'Access Denied: No token provided' });
    }

    try 
    {
        const verified = jwt.verify(token, 'your-secret-key'); // Verify the token with your secret key
        request.user = verified; // Attach the user data to the request object
        next(); 
    } 
    catch (error) 
    {
        return response.status(401).send({ error: 'Unauthorized: Invalid token' }); 
    }
}

// String used to connect to MongoDB
mongoose.connect(mongoDBURL)
.then(() => {
    console.log('Database connection successful.'); 

    // making sure the port only starts running when the database is connected
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`); 
    });
})
.catch((error) => {
    console.log(error);
});