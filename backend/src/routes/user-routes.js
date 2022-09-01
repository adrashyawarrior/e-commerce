const express = require('express')

const UserController = require('../controllers/user-controller')

const router = express.Router();

router.get('/create', UserController.create);
router.get('/:id/edit', UserController.edit);
router.get('', UserController.index);
router.post('', UserController.store);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.destroy);

module.exports = router;