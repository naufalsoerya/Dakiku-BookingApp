'use strict';
const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let readData = JSON.parse(fs.readFileSync("./data/mountain.json", "utf-8"))
    readData.forEach(item => {
      item.updatedAt = new Date()
      item.createdAt = new Date()
    });
    await queryInterface.bulkInsert('Mountains', readData)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Mountains', null, {});
  }
};
