import express from 'express';
import Pattern from '../models/Pattern.js';
import Product from '../models/Product.js';

const router = express.Router();

// GET /api/patterns — JSON feed for React frontend
router.get('/patterns', async (req, res) => {
  try {
    const patterns = await Pattern.find().sort({ createdAt: -1 });
    res.json(patterns);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching patterns' });
  }
});

// GET /api/products — JSON feed for React frontend
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

export default router;
