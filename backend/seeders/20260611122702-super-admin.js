'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.insert(
      null,
      'users',
      {
        name: 'Mohit',  
        email: 'darshan.deshmukh@coditas.com',
        password: 'superAdmin',
        globalRole: 'admin'  
      }
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.delete(
      null,
      'users', 
      {
        email: 'darshan.deshmukh@coditas.com'
      }
    );
  }
};
