'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(
      'roles',
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.fn('uuidv4')
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        companyId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        createdBy: {
          type: DataTypes.UUID,
          allowNull: true
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.fn('now')
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.fn('now')
        },
        isDeleted: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        }
      }
    );

    await queryInterface.addConstraint(
      'roles',
      {
        type: 'foreign key',
        fields: ['companyId'],
        name: 'fk_company_and_domain',
        references: {
          table: 'companies',
          field: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      }
    );

    await queryInterface.addConstraint(
      'roles',
      {
        type: 'foreign key',
        fields: ['createdBy'],
        name: 'fk_domains_createdBy_user',
        references: {
          table: 'users',
          field: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      }
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('roles');
  }
};
