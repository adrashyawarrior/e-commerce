const express = require('express')
const AuthController = require('../controllers/auth-controller')

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/customers/login', AuthController.customerLogin);
router.post('/customers/register', AuthController.customerReginstration);

module.exports = router;