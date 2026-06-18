import { CompanySchema } from "../feature-modules/company/company.schema.js";
import { UserSchema } from "../feature-modules/user/user.schema.js";

CompanySchema.hasMany(UserSchema, {foreignKey: 'companyId'});
UserSchema.belongsTo(CompanySchema, {foreignKey: 'companyId'});

UserSchema.hasMany(UserSchema, {foreignKey: 'createdBy'});
UserSchema.belongsTo(UserSchema, {foreignKey: 'createdBy'});

export {
  CompanySchema,
  UserSchema
}