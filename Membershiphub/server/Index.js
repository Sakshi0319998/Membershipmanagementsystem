import express from "express";
import cors from 'cors';
import { adminRouter } from "./Routes/AdminRoute.js";
import membershipRouter from "./Routes/MembershipRouter.js";
import dotenv from 'dotenv';
import morgan from 'morgan';
import mysql from 'mysql';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'your_database_name',
});

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(morgan('dev')); // HTTP request logging

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});
app.use('/auth', adminRouter);
app.use('/membership', membershipRouter);
app.use(express.static('Public'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
const server = app.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000');
});

// Graceful shutdown
process.on('SIGINT', () => {
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});