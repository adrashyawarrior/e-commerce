const express = require('express')
const AuthController = require('../controllers/auth-controller')

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/customer/login', AuthController.customerLogin);
router.post('/customer/register', AuthController.customerReginstration);

module.exports = router;