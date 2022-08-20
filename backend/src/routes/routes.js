const express = require('express')

const errorRoutes = require('./error-routes')
const userRoutes = require('./user-routes')

const router = express.Router();

router.use(express.json());
router.use('/users', userRoutes);
router.use('*', errorRoutes);

module.exports = router;