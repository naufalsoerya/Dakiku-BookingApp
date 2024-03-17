'use strict';
const fs = require('fs');
const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let readData = JSON.parse(fs.readFileSync("./data/user.json", "utf-8"))
    readData.forEach(item => {
      item.password = hashPassword(item.password)
      item.updatedAt = new Date()
      item.createdAt = new Date()
    });
    await queryInterface.bulkInsert('Users', readData)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
