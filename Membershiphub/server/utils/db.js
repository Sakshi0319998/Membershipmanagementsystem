import mysql from 'mysql';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

// Function to get a connection from the pool
const getConnection = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return reject(err);
            }
            resolve(connection);
        });
    });
};

// Usage example with async/await
(async () => {
    try {
        const connection = await getConnection();
        const [results] = await connection.query('SELECT * FROM your_table');
        console.log('Query results:', results);
        connection.release(); // Always release the connection back to the pool
    } catch (error) {
        console.error('Error:', error);
    }
})();

// Gracefully close the pool on exit
process.on('SIGINT', () => {
    pool.end(err => {
        if (err) {
            console.error('Error closing the pool:', err);
        } else {
            console.log('Pool closed.');
        }
        process.exit();
    });
});

// Exporting the pool for use in other modules
export default pool;