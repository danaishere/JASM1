// index.js — Main entry point for the Cozy Loops Express backend.
// Connects to MongoDB, registers middleware, and mounts all route modules.

import express from 'express';
import path from 'path';
import cors from 'cors';
import 'dotenv/config';
import dns from 'node:dns/promises';

import connectDB from './components/crochet/db.js';
import Pattern from './models/pattern.js';
import Product from './models/product.js';
import patternRoutes from './routes/patterns.js';
import productRoutes from './routes/products.js';
import apiRoutes from './routes/api.js';

dns.setServers(['1.1.1.1']);

const __dirname = import.meta.dirname;
const app = express();
const port = process.env.PORT || '8888';

// ── Database ─────────────────────────────────────────────────
connectDB();

// ── Middleware ────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*'
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── View Engine ───────────────────────────────────────────────
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// ── Dashboard ─────────────────────────────────────────────────
app.get('/', async (req, res) => {
  try {
    const patternCount = await Pattern.countDocuments();
    const productCount = await Product.countDocuments();
    res.render('index', { title: 'Dashboard', patternCount, productCount });
  } catch (error) {
    res.render('index', { title: 'Dashboard', error: 'Error loading dashboard' });
  }
});

// ── Routes ────────────────────────────────────────────────────
app.use('/patterns', patternRoutes);  // Admin pattern pages
app.use('/products', productRoutes);  // Admin product pages
app.use('/api', apiRoutes);           // JSON API for React frontend

// ── Start Server ──────────────────────────────────────────────
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
