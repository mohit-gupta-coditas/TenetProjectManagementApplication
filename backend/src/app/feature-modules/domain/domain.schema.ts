import { DataTypes, Model, Sequelize, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize";
import { sequelize } from "../../connections/pg.connection.js";

export class DomainSchema extends Model<
  InferAttributes<DomainSchema>, 
  InferCreationAttributes<DomainSchema>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare companyId: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare isDeleted: CreationOptional<Boolean>;
  declare createdBy: string;
}

DomainSchema.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: Sequelize.fn('uuidv4')
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  companyId: {
    type: DataTypes.UUID,
    allowNull: false,
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
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  createdBy: {
    type: DataTypes.UUID,
    allowNull: false,
  }
}, {
  sequelize,
  tableName: 'domains',
  timestamps: true
});