import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4001;
// MongoDB Atlas connection string
const uri = process.env.MONGODB_URI;


app.use(cors());
app.use(express.json());


// Log the MongoDB URI (for debugging purposes)
console.log('MongoDB URI:', uri);


// Connect to MongoDB without deprecated options
mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 }) // 5 seconds timeout
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('MongoDB connection error:', err));

// Middleware
app.use(express.json()); // For parsing application/json

// Example route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});


mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});
