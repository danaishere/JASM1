import express from 'express';
import Pattern from '../models/pattern.js';
import Product from '../models/product.js';

const router = express.Router();

//return all patterns as JSON
router.get('/patterns', async (req, res) => {
  try {
    const patterns = await Pattern.find().sort({ createdAt: -1 });
    res.json(patterns);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching patterns' });
  }
});

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

export default router;
