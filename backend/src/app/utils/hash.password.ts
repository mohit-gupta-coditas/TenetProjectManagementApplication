import { genSalt, hash } from "bcryptjs"

export const makeHashFunction = (saltNum: number, type: 'OTP' | 'PASSWORD') => async (data: string) => {
  try {
    const salt = await genSalt(saltNum);
    const hashedPassword = await hash(data, salt);
    return hashedPassword;
  } catch(err) {
    throw {statusCode: 500,message: `ERROR WHILE HASHING ${type}`};
  }
}

export const hashPassword = makeHashFunction(5, 'PASSWORD');
export const hashOTP = makeHashFunction(7, "OTP");