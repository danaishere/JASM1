
import express from 'express';
import Pattern from '../models/pattern.js';

const router = express.Router();

// show all patterns in admin view
router.get('/', async (req, res) => {
  try {
    const patterns = await Pattern.find().sort({ createdAt: -1 });
    res.render('patterns', { title: 'Patterns', patterns });
  } catch (error) {
    res.render('patterns', { title: 'Patterns', error: 'Error loading patterns' });
  }
});


router.get('/add', (req, res) => {
  res.render('add-pattern', { title: 'Add Pattern' });
});

//save new pattern to db
router.post('/add', async (req, res) => {
  try {
    const { name, description, difficulty, category, hookSize, materials, isFree, price } = req.body;
    const pattern = new Pattern({
      name,
      description,
      difficulty,
      category,
      hookSize,
      materials: materials.split(',').map(m => m.trim()),
      isFree: isFree === 'on',
      price: isFree === 'on' ? 0 : parseFloat(price) || 0
    });
    await pattern.save();
    res.redirect('/patterns');
  } catch (error) {
    res.render('add-pattern', { title: 'Add Pattern', error: 'Error adding pattern' });
  }
});

// delete a pattern by ID
router.post('/delete/:id', async (req, res) => {
  try {
    await Pattern.findByIdAndDelete(req.params.id);
  } catch (error) {
    console.error('Delete pattern error:', error);
  }
  res.redirect('/patterns');
});

export default router;
