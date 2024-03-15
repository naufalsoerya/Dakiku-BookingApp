const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router();
const authRoutes = require('./auth');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
const upload = require('../middlewares/multer');

router.use(authRoutes)

// CRUD Mountain
router.get('/mountain', authentication, Controller.getMountain)
router.get('/mountain/:id', authentication, Controller.getMountainById)

// CRUD Booking
router.get('/booking', authentication, Controller.getBooking)
router.patch('/payment', authentication, Controller.patchPayment)
router.post('/booking/:id', authentication, Controller.postBooking)
router.put('/booking/:id', authentication, authorization, Controller.putBooking)
router.delete('/booking/:id', authentication, authorization, Controller.deleteBooking)

// CRUD Event
router.get('/event', authentication, Controller.getEvent)
router.post('/event/:id', authentication, Controller.postEvent)
router.patch('/event/:id', authentication, authorization, upload.single("photo"), Controller.patchEvent)

module.exports = router