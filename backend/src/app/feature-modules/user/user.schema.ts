import { DataTypes, Model, Sequelize, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize";
import { sequelize } from "../../connections/pg.connection.js";
import { CompanySchema } from "../company/company.schema.js";


export class UserSchema extends Model<InferAttributes<UserSchema>, InferCreationAttributes<UserSchema>>{
  declare id: CreationOptional<string>;
  declare name: CreationOptional<string>;
  declare email: string;
  declare password: CreationOptional<string>;
  declare companyId: CreationOptional<string>;
  declare passwordVersion: CreationOptional<number>;
  declare globalRole: "admin" | "superAdmin" | "member";
  declare isDeleted: CreationOptional<boolean | undefined>;
  declare createdAt: CreationOptional<Date | undefined>;
  declare updatedAt: CreationOptional<Date | undefined>;
  declare createdBy: CreationOptional<string | undefined>;

  toSafeJSON() {
    const {password, passwordVersion, createdAt, updatedAt, createdBy, ...rest} = this.toJSON();
    return rest;
  }
}

UserSchema.init({
   id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: Sequelize.fn('uuidv4')
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user'
  },  
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
  companyId: {
    type: DataTypes.UUID,
    allowNull: true,
    defaultValue: null,
    references: {
      model: CompanySchema,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
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
    defaultValue: Sequelize.fn('now')
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('now')
  },
  createdBy: {
    type: DataTypes.UUID,
    allowNull: true, 
    references: {
      model: CompanySchema,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
  }
}, {
  sequelize,
  tableName: 'users',
  timestamps: true
});