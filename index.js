import express from 'express';
import path from 'path';
import cors from 'cors';
import 'dotenv/config';
import dns from 'node:dns/promises';

import connectDB from './components/crochet/db.js';
import patternRoutes from './routes/patterns.js';
import productRoutes from './routes/products.js';
import apiRoutes from './routes/api.js';
import Pattern from './models/Pattern.js';
import Product from './models/Product.js';

dns.setServers(['1.1.1.1']);

const __dirname = import.meta.dirname;
const app = express();
const port = process.env.PORT || '8888';

connectDB();

app.use(cors()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', async (req, res) => {
  try {
    const patternCount = await Pattern.countDocuments();
    const productCount = await Product.countDocuments();
    res.render('index', { title: 'Dashboard', patternCount, productCount });
  } catch (error) {
    res.render('index', { title: 'Dashboard', error: 'Error loading dashboard' });
  }
});

app.use('/patterns', patternRoutes);
app.use('/products', productRoutes);
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
