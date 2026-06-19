import { DataTypes, Model, Sequelize, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize";

import { sequelize } from "../../connections/pg.connection.js";

export class CompanySchema extends Model<InferAttributes<CompanySchema>, InferCreationAttributes<CompanySchema>>{
  declare id: CreationOptional<string>;
  declare name: string;
  declare email: string;
  declare logoUrl: string;
  declare subscription: string;
  declare isDeleted: CreationOptional<boolean | undefined>;
  declare createdAt: CreationOptional<Date | undefined>;
  declare updatedAt: CreationOptional<Date | undefined>;

  toSafeJSON() {
    const {createdAt, updatedAt, ...rest} = this.toJSON();
    return rest;
  }
}

CompanySchema.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.fn('uuidv4')
  },
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