const express = require('express')

const UserController = require('../controllers/user-controller')

const router = express.Router();

router.get('', UserController.index);
router.post('', UserController.create);

module.exports = router;