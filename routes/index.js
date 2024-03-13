const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router();
const authRoutes = require('./auth');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.use(authRoutes)

// CRUD Mountain
router.get('/mountain', authentication, Controller.getMountain)
router.get('/mountain/:id', authentication, Controller.getMountainById)
router.patch('/mountain/:id', authentication, authorization, Controller)

module.exports = router