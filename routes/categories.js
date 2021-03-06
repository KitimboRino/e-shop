const Category = require('../models/category');
const express = require('express');
const router = express.Router();

//Retrieving Category list
router.get('/', async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(categoryList);
});

//Retrieving Category by id
router.get('/:id', async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res
      .status(500)
      .json({ message: 'The category with the given ID was not found.' });
  }
  res.status(200).send(category);
});

// Saving Category to database (async & await)
router.post('/', async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  category = await category.save();

  if (!category) return res.status(404).send('The cateory cannot be created!');

  res.send(category);
});

// Updating category details
router.put('/:id', async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    { new: true }
  );

  if (!category) return res.status(404).send('the cateory cannot be created!');

  res.send(category);
});

// Delete a categoty using its id (using then & catch)
router.delete('/:id', (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: 'the category is deleted' });
      } else {
        return res
          .status(404)
          .json({ success: false, message: 'category not found' });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;
