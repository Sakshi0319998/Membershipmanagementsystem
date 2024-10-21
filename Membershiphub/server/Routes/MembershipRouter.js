import express from "express";
import pool from "../utils/db.js"; // Assuming you're using a connection pool
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const membershipRouter = express.Router();  // Declare the router

// Membership route
membershipRouter.get('/', (req, res) => {
  res.send('Membership route working');
});

// Membership login route
membershipRouter.post("/membership_login", (req, res) => {
    const sql = "SELECT * FROM membership WHERE email = ?";
    
    pool.query(sql, [req.body.email], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ loginStatus: false, error: "Database query error" });
      }
      
      if (result.length > 0) {
        bcrypt.compare(req.body.password, result[0].password, (err, isMatch) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ loginStatus: false, error: "Error comparing passwords" });
            }
            
            if (isMatch) {
                const token = jwt.sign(
                  { role: "membership", email: result[0].email },
                  process.env.MEMBERSHIP_SECRET_KEY, // Use environment variable
                  { expiresIn: "1d" }  // Token expires in 1 day
                );
                
                // Set cookie with httpOnly and secure flags
                res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
                return res.json({ loginStatus: true });
            } else {
                return res.status(401).json({ loginStatus: false, error: "Wrong password" });
            }
        });
      } else {
          return res.status(404).json({ loginStatus: false, error: "Email not found" });
      }
    });
});

export default membershipRouter;