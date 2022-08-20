const express = require('express')

const ErrorController = require('../controllers/error-controller')

const router = express.Router();

router.get('*', ErrorController.notFound);

module.exports = router;