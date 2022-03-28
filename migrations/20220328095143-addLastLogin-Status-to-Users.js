'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Users","last_login",{
      type: Sequelize.DATE,
    })
    await queryInterface.addColumn("Users","status",{
      type: Sequelize.ENUM('active', 'inactive'),
      defaultValue: 'active'
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("Users","last_login")
    await queryInterface.removeColumn("Users","status")

  }
};
