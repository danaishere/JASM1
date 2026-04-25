// routes/api.js — Public JSON API endpoints consumed by the React frontend

import express from 'express';
import Pattern from '../models/pattern.js';
import Product from '../models/product.js';

const router = express.Router();

// GET /api/patterns — return all patterns as JSON
router.get('/patterns', async (req, res) => {
  try {
    const patterns = await Pattern.find().sort({ createdAt: -1 });
    res.json(patterns);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching patterns' });
  }
});

// GET /api/products — return all products as JSON
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

export default router;
