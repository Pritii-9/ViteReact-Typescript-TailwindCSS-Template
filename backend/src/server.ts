import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose'; // MongoDB ORM
import cors from 'cors'; // Cross-Origin Resource Sharing

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/quotebuilder';

// --- Mongoose Connection ---
async function connectDB() {
    try {
        // Use 'await' here since we are using top-level await in an ESM context
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('MongoDB connection error. Please check your URI and service:', error);
        // Exit process with failure code
        process.exit(1);
    }
}

// Immediately call the connection function
connectDB();


// --- Middleware ---
// Enable All CORS Requests
app.use(cors()); 
// Body parser for JSON data
app.use(express.json()); 

// --- Basic Route ---
// Basic route with TypeScript types for Request and Response
app.get('/', (req: Request, res: Response) => {
  // Use status(200).json() for standard API responses
  res.status(200).json({ 
    message: 'Hello from the MERN-TS backend!', 
    dbStatus: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// --- Server Start ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
