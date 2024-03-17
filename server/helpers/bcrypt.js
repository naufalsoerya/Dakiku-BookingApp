const bcrypt = require('bcrypt');

const hashPassword = (plainPass) => {
    return bcrypt.hashSync(plainPass, bcrypt.genSaltSync(10));
}

const comparePassword = (plainPass, hashedPass) => {
    return bcrypt.compareSync(plainPass, hashedPass)
}

module.exports = { hashPassword, comparePassword }