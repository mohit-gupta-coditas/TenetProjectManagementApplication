import { Op, Transaction, type WhereOptions } from "sequelize";
import userRepo from "./user.repo.js";
import { USER_RESPONSE } from "./user.response.js";
import type { User, UserOptions } from "./user.types.js";
import { CREATION_ROLE, GLOBAL_ROLE } from "../../app.data.js";

const getUser = async (user: Partial<User>) => {
  try {
    const oldUser = await userRepo.getUser(user);
    if(!oldUser) throw USER_RESPONSE.USER_NOT_FOUND;
    return oldUser;
  } catch(err) {
    throw err;
  }
}

const createUser = async (user: Pick<User, 'email'|'createdBy'|'companyId'>, transaction?: Transaction) => {
  try {
    const oldUser = await userRepo.getUser({email: user.email});
    if(oldUser) throw USER_RESPONSE.USER_ALREADY_EXISTS;

    const creatingUser = await userRepo.getUser({id: user.createdBy!});
    if(!creatingUser) throw USER_RESPONSE.YOU_DONT_EXIST;
    
    const globalRole = CREATION_ROLE[creatingUser.globalRole];
    await userRepo.createUser({...user, globalRole}, transaction);
    return USER_RESPONSE.USER_CREATED;
  } catch(err) {
    throw USER_RESPONSE.USER_NOT_CREATED;
  }
}

const getAllUser = async (options: UserOptions, companyId: string) => {
  try {
    const where: WhereOptions<User> = {};
    const limit = options.limit ?? 10;
    const offset = options.offset ?? 0;
    const order:any = [[]];
        
    where.companyId = {
      [Op.eq] : companyId
    }

    if(options.search) {
      where[Op.or as any] = {
        name: {
          [Op.like]: `%${options.search}%`
        },
        email: {
          [Op.like]: `%${options.search}%`
        }
      }
    }

    if(options.globalRole) {
      where.globalRole = {
        [Op.eq]: options.globalRole
      }
    }
    
    where.isDeleted = {
      [Op.eq] : (options.isDeleted === false) ? options.isDeleted : true
    }
    
    if(options.orderBy) {
      order[0].push(options.sortBy, options.orderBy);
    }
    
    const allusers = await userRepo.getAllUsers(where, limit, offset, order);
    return allusers;
  } catch(err) {
    throw err;
  }
}

const updateUser = async (user: Partial<User>, id: string) => {
  try {
    const oldUser = await userRepo.getUser({id});
    if(!oldUser) throw USER_RESPONSE.USER_NOT_FOUND;

    const isUpdated = await userRepo.updateUser(user, id);
    if(!isUpdated) throw USER_RESPONSE.USER_NOT_UPDATED;

    return USER_RESPONSE.USER_UPDATED;
  } catch(err) {
    throw err;
  }
}

const deleteUser = async (id: string) => {
  try {
    const oldUser = await userRepo.getUser({id});
    if(!oldUser) throw USER_RESPONSE.USER_NOT_FOUND;

    const isUpdated = await userRepo.updateUser({isDeleted: true}, id);
    if(!isUpdated) throw USER_RESPONSE.USER_NOT_DELETED;

    return USER_RESPONSE.USER_DELETED;
  } catch(err) {
    throw err;
  }
}


export default {
  getUser,
  createUser,
  getAllUser,
  updateUser,
  deleteUser
}