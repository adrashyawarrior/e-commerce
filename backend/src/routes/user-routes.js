const express = require('express')

const UserController = require('../controllers/user-controller')

const router = express.Router();

router.get('/:id/edit', UserController.edit);
router.get('', UserController.index);
router.post('', UserController.create);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.destroy);

module.exports = router;