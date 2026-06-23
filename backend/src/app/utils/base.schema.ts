import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize";

export class BaseSchema<M extends Model> extends Model<
  InferAttributes<M>, 
  InferCreationAttributes<M>
>{ 
  declare id : CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}