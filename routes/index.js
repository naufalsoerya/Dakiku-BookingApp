const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router();
const authRoutes = require('./auth');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
const AuthController = require('../controllers/authController');

router.use(authRoutes)

module.exports = router