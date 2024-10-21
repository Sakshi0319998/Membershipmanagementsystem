import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';


const router = express.Router();
const adminRouter = express.Router();

// Middleware for checking JWT token
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token; // Assuming you're using cookies
    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, "jwt_secret_key", (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user;
        next();
    });
};

// Example route for admin
adminRouter.get('/some-route', authenticateToken, (req, res) => { 
    res.send("Admin Route");
});

// Admin login
router.post("/adminlogin", async (req, res) => {
    const sql = "SELECT * FROM admin WHERE email = ?";
    try {
        const [result] = await pool.query(sql, [req.body.email]);

        if (result.length > 0) {
            const isMatch = bcrypt.compareSync(req.body.password, result[0].password);
            if (isMatch) {
                const token = jwt.sign(
                    { role: "admin", email: result[0].email },
                    "jwt_secret_key",
                    { expiresIn: "1h" }
                );
                res.cookie('token', token, { httpOnly: true });
                return res.json({ loginStatus: true });
            } else {
                return res.json({ loginStatus: false, Error: "Wrong email or password" });
            }
        } else {
            return res.json({ loginStatus: false, Error: "Wrong email or password" });
        }
    } catch (error) {
        console.error('Error during admin login:', error);
        return res.status(500).json({ loginStatus: false, Error: "Query error" });
    }
});

// Get categories
router.get('/category', async (req, res) => {
    const sql = "SELECT * FROM category";
    try {
        const [result] = await pool.query(sql);
        return res.json({ Status: true, Result: result });
    } catch (err) {
        return res.status(500).json({ Status: false, Error: "Query Error" });
    }
});

// Add category
router.post('/add_category', async (req, res) => {
    const sql = "INSERT INTO category (name) VALUES (?)";
    try {
        await pool.query(sql, [req.body.category]);
        return res.json({ Status: true });
    } catch (err) {
        return res.status(500).json({ Status: false, Error: "Query Error" });
    }
});

// Add membership
router.post('/add_membership', async (req, res) => {
    const sql = "INSERT INTO membership (name, email, password, address, category_id) VALUES (?, ?, ?, ?, ?)";
    
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.category_id
        ];
        
        await pool.query(sql, values);
        return res.json({ Status: true });
    } catch (err) {
        return res.status(500).json({ Status: false, Error: "Query Error" });
    }
});

// Get memberships
router.get('/membership', async (req, res) => {
    const sql = "SELECT * FROM membership";
    try {
        const [result] = await pool.query(sql);
        return res.json({ Status: true, Result: result });
    } catch (err) {
        return res.status(500).json({ Status: false, Error: "Query Error" });
    }
});

// Get membership by ID
router.get('/membership/:id', async (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM membership WHERE id = ?";
    
    try {
        const [result] = await pool.query(sql, [id]);
        return res.json({ Status: true, Result: result });
    } catch (err) {
        return res.status(500).json({ Status: false, Error: "Query Error" });
      }
    });
    
    // Edit membership
    router.put('/edit_membership/:id', async (req, res) => {
        const id = req.params.id;
        const sql = "UPDATE membership SET name=?, email=?, address=?, category_id=? WHERE id=?";
        
        const values = [
            req.body.name,
            req.body.email,
            req.body.address,
            req.body.category_id,
            id
        ];
    
        try {
            await pool.query(sql, values);
            return res.json({ Status: true });
        } catch (err) {
            return res.status(500).json({ Status: false, Error: "Query Error" + err });
        }
    });
    
    // Delete membership
    router.delete('/delete_membership/:id', async (req, res) => {
        const id = req.params.id;
        const sql = "DELETE FROM membership WHERE id = ?";
        
        try {
            await pool.query(sql, [id]);
            return res.json({ Status: true });
        } catch (err) {
            return res.status(500).json({ Status: false, Error: "Query Error" + err });
        }
    });
    
    // Export the routers
    export { router, adminRouter };