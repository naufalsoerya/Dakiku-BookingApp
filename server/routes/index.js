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
router.delete('/booking/:id', authentication, authorization, Controller.deleteBooking)

// CRUD Event
router.get('/event', authentication, Controller.getEvent)
router.post('/event', authentication, Controller.postEvent)
router.put('/event/:id', authentication, authorization, Controller.putEvent)
router.patch('/event/:id', authentication, authorization, upload.single("photo"), Controller.patchEvent)

module.exports = router