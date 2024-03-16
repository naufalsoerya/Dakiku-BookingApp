const { Booking, Event } = require('../models');

async function authorizationBooking(req, res, next) {
    try {
        let {id} = req.params
        let data = await Booking.findByPk(id)
        
        if(!data) throw {name: "NotFound"}

        if(req.user.id === data.UserId) {
            next()
        } else {
            throw {name: "Forbidden"}
        }
    } catch(error) {
        next(error)
    }
}

async function authorizationEvent(req, res, next) {
    try {
        let {id} = req.params
        let data = await Event.findByPk(id)
        
        if(!data) throw {name: "NotFound"}

        if(req.user.id === data.UserId) {
            next()
        } else {
            throw {name: "Forbidden"}
        }
    } catch(error) {
        next(error)
    }
}

module.exports = {authorizationBooking, authorizationEvent}