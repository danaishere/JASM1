import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.render('products', { title: 'Products', products });
  } catch (error) {
    res.render('products', { title: 'Products', error: 'Error loading products' });
  }
});

router.get('/add', (req, res) => {
  res.render('add-product', { title: 'Add Product' });
});

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

router.post('/delete/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
  } catch (error) {
    res.redirect('/products');
  }
});

export default router;
