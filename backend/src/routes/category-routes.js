const express = require('express')

const CategoryController = require('../controllers/category-controller')

const router = express.Router();

router.get('/create', CategoryController.create);
router.get('/:id/edit', CategoryController.edit);
router.get('', CategoryController.index);
router.post('', CategoryController.store);
router.put('/:id', CategoryController.update);
router.delete('/:id', CategoryController.destroy);

module.exports = router;