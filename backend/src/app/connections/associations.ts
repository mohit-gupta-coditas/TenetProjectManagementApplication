import { CompanySchema } from "../feature-modules/company/company.schema.js";
import { UserSchema } from "../feature-modules/user/user.schema.js";
import { DomainSchema } from "../feature-modules/domain/domain.schema.js";

CompanySchema.hasMany(UserSchema, {foreignKey: 'companyId'});
UserSchema.belongsTo(CompanySchema, {foreignKey: 'companyId'});

UserSchema.hasMany(UserSchema, {foreignKey: 'createdBy'});
UserSchema.belongsTo(UserSchema, {foreignKey: 'createdBy'});

CompanySchema.hasMany(DomainSchema, {foreignKey: 'companyId'});
DomainSchema.belongsTo(CompanySchema, {foreignKey: 'companyId'});

export {
  CompanySchema,
  UserSchema,
  DomainSchema
}