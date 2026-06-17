import userRepo from "./user.repo.js";
import { USER_RESPONSE } from "./user.response.js";
import type { User } from "./user.types.js";

const getUser = async (user: Partial<User>) => {
  try {
    const oldUser = await userRepo.getUser(user);
    if(!oldUser) throw USER_RESPONSE.USER_NOT_FOUND;
    return {...USER_RESPONSE.USER_FOUND, user: oldUser};
  } catch(err) {
    throw err;
  }
}

const createUser = async (user: Pick<User, 'email'|'globalRole'|'createdBy'>) => {
  try {
    const oldUser = await userRepo.getUser({email: user.email});
    if(oldUser) throw USER_RESPONSE.USER_ALREADY_EXISTS;

    await userRepo.createUser(user);
    return USER_RESPONSE.USER_CREATED;
  } catch(err) {
    throw USER_RESPONSE.USER_NOT_CREATED;
  }
}

export default {
  getUser,
  createUser
}