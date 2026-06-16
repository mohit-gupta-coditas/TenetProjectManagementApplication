import { UserSchema } from "../../connections/associations.js";
import type { User } from "./user.types.js";

const createUser = (user: Pick<User, 'email'|'globalRole'|'createdBy'>) => UserSchema.create(user);

const getUser = (user: Partial<User>) => UserSchema.findOne({where: user});

export default {
  createUser,
  getUser
}