// routes/products.js — Admin UI routes for managing crochet products

import express from 'express';
import Product from '../models/product.js';

const router = express.Router();

// GET /products — show all products in admin view
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.render('products', { title: 'Products', products });
  } catch (error) {
    res.render('products', { title: 'Products', error: 'Error loading products' });
  }
});

// GET /products/add — show add form
router.get('/add', (req, res) => {
  res.render('add-product', { title: 'Add Product' });
});

// POST /products/add — save new product to database
router.post('/add', async (req, res) => {
  try {
    const { name, description, category, price, stockQuantity, inStock } = req.body;
    const product = new Product({
      name,
      description,
      category,
      price: parseFloat(price),
      stockQuantity: parseInt(stockQuantity) || 0,
      inStock: inStock === 'on'
    });
    await product.save();
    res.redirect('/products');
  } catch (error) {
    res.render('add-product', { title: 'Add Product', error: 'Error adding product' });
  }
});

// POST /products/delete/:id — delete a product by ID
router.post('/delete/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
  } catch (error) {
    console.error('Delete product error:', error);
  }
  res.redirect('/products');
});

export default router;
