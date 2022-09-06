const express = require('express')
const AuthController = require('../controllers/auth-controller')

const UserLoginRequest = require('../requests/users/user-login-request')

const router = express.Router();

router.post('/login', UserLoginRequest, AuthController.login);
router.post('/customers/login', AuthController.customerLogin);
router.post('/customers/register', AuthController.customerReginstration);

module.exports = router;