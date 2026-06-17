import { DataTypes, Model, Sequelize, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize";

import { sequelize } from "../../connections/pg.connection.js";

export class CompanySchema extends Model<InferAttributes<CompanySchema>, InferCreationAttributes<CompanySchema>>{
  declare id: CreationOptional<string>;
  declare name: string;
  declare email: string;
  declare logoUrl: string;
  declare subscription: string;
  declare isDeleted: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

CompanySchema.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  logoUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subscription: {
    type: DataTypes.ENUM(
      'half',
      'full',
      'basic'
    ),
    allowNull: false
  }, 
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: Sequelize.fn('uuidv4')
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('now')
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('now')
  },
}, {
  sequelize,
  timestamps: true,
  tableName: 'companies'
});