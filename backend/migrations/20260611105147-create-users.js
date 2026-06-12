'use strict';

import { DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('users', {
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
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      companyId: {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: null
      },
      passwordVersion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      globalRole: {
        type: DataTypes.ENUM(
          'superAdmin',
          'admin',
          'member'
        ),
        allowNull: false,
      },
      isDeleted : {
        type : DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
      createdBy: {
        type: DataTypes.UUID,
        allowNull: true, 
      }
    });

    await queryInterface.addConstraint(
      'users',
      {
        type: 'foreign key',
        fields: ['companyId'],
        name: 'fk_user_and_company',
        references: {
          table: 'companies',
          field: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    );

    await queryInterface.addConstraint(
      'users',
      {
        type: 'foreign key',
        fields: ['createdBy'],
        name: 'fk_user_and_user',
        references: {
          table: 'users',
          field: 'id'
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
    await queryInterface.dropTable('users');
  }
};
