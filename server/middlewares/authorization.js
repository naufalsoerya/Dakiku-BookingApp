const { Booking } = require('../server/models');

async function authorization(req, res, next) {
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

module.exports = authorization