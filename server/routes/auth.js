const express = require('express')
const AuthController = require('../controllers/authController');
const authRoutes = express.Router()

// AUTH
authRoutes.post("/register", AuthController.register);
authRoutes.post("/login", AuthController.login);

// AUTH GOOGLE
authRoutes.post("/google-login", AuthController.googleLogin );

module.exports = authRoutes