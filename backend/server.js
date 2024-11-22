import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Azure MySQL connection configuration
const pool = mysql.createPool({
  host: process.env.AZURE_MYSQL_HOST,
  user: process.env.AZURE_MYSQL_USER,
  password: process.env.AZURE_MYSQL_PASSWORD,
  database: process.env.AZURE_MYSQL_DATABASE,
  ssl: {
    rejectUnauthorized: true
  }
});

// API endpoints
app.get('/api/menu-items', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM menu_items');
    res.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    // Add order creation logic here
    const { customer_id, items } = req.body;
    // Insert into orders table
    // Insert into order_items table
    res.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 