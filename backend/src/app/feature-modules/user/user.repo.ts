import type { WhereOptions } from "sequelize";
import { UserSchema } from "../../connections/associations.js";
import type { User } from "./user.types.js";

const createUser = (user: Pick<User, 'email'|'globalRole'|'createdBy'>) => UserSchema.create(user);

const getUser = (user: Partial<User>) => UserSchema.findOne({where: user});

const getAllUsers = (where: WhereOptions<Pick<User, "name" | "companyId" | "email">>, limit: number, offset: number, order: any) => UserSchema.findAll({where, limit, offset, order});

const updateUser = (user: Partial<User>, id: string) => UserSchema.update(user, {where: {id}});

export default {
  createUser,
  getUser,
  getAllUsers,
  updateUser
}