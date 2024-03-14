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
// router.patch('/mountain/:id', authentication, authorization, Controller)

// CRUD Booking
router.get('/booking', authentication, Controller.getBooking)
router.post('/booking/:id', authentication, Controller.postBooking)
router.put('/booking/:id', authentication, authorization, Controller.putBooking)
router.delete('/booking/:id', authentication, authorization, Controller.deleteBooking)
router.patch('/payment', authentication, authorization, Controller.patchPayment)

// CRUD Event
router.get('/event', authentication, Controller.getEvent)
router.post('/event/:id', authentication, Controller.postEvent)

module.exports = router