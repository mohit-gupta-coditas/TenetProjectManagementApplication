import { compare } from "bcryptjs";
import { env } from "../../../validate.env.js";
import { client } from "../../connections/redis.connection.js";
import { sendToSQS } from "../../utils/aws.helper.js";
import { hashOTP, hashPassword } from "../../utils/hash.password.js";
import { signToken } from "../../utils/jwt.helper.js";
import { privateKey } from "../../utils/jwt.keys.js";
import { setOTP } from "../../utils/otp.helper.js";
import userService from "../user/user.service.js";
import { AUTH_RESPONSE } from "./auth.response.js"; 
import type { GLOBAL_ROLE } from "../../app.data.js";

const setPassword = async (password: string, userId: string) => {
  try {
    const user = await userService.getUser({id: userId});
    user.password = await hashPassword(password);
    user.passwordVersion += 1;
    user.save();

    return AUTH_RESPONSE.PASSWORD_SET;
  } catch(err) {
    throw AUTH_RESPONSE.CANNOT_SET_PASSWORD;
  }
}

const getTokenDetails = async (userId: string) => {
  try{
    const user = await userService.getUser({id: userId});
    return {
      globalRole: user.globalRole,
      email: user.email
    };
  } catch(err) {
    throw err;
  }
}

const sendOTP = async (email: string) => {
  try {
    await userService.getUser({email});

    const randomOTP = Math.round(Math.random()*(9999-1000)) + 1000;

    const exists = await client.get(`otp_${email}`);
    if(exists) await client.del(`otp_${email}`);

    const hashedOTP = await hashOTP(`${randomOTP}`);

    await setOTP(
      email, 
      {
        otp: hashedOTP,
        retries: 4,
        createTime: Date.now()
      },
      env.OTP_TIMER
    );

    await sendToSQS({
      sender_email: env.SES_SENDER_EMAIL,
      to_email: email,  
      subject: 'TENET login',
      message: `Your OTP for login is : ${randomOTP}`
    });

    return AUTH_RESPONSE.OTP_SENT;
  } catch(err: any) {
    if(err.statusCode === 404) {
      return AUTH_RESPONSE.OTP_SENT;
    }
    throw err;
  }
}

const verifyOTP = async (otp: number, email: string) => {
  try {
    const data = await client.get(`otp_${email}`);
    if(!data) throw AUTH_RESPONSE.OTP_EXPIRED;

    const otpData = JSON.parse(data);
    otpData.retries--;

    if(otpData.retries <= 0) {
      await client.del(`otp_${email}`);
      throw AUTH_RESPONSE.OTP_EXPIRED;
    }
    
    await client.del(`otp_${email}`);

    await setOTP(
      email, 
      otpData,
      env.OTP_TIMER - Math.round((Date.now() - otpData.createTime)/1000)
    );

    const isEqual = await compare(`${otp}`, otpData.otp);

    if(!isEqual) throw AUTH_RESPONSE.OTP_INVALID;

    await client.del(`otp_${email}`);

    const currentUser = await userService.getUser({email});

    const accessToken = signToken(
      {
        userId: currentUser.id,
        companyId: currentUser.companyId,
        globalRole: currentUser.globalRole as GLOBAL_ROLE
      },
      privateKey,
      env.ACCESS_TOKEN_TIME
    );

    const refreshToken = signToken(
      {
        userId: currentUser.id,
        companyId: currentUser.companyId,
        globalRole: currentUser.globalRole as GLOBAL_ROLE
      },
      privateKey,
      env.REFRESH_TOKEN_TIME
    );

    return {
      ...AUTH_RESPONSE.LOGIN_SUCCESSFULL, 
      accessToken, 
      refreshToken,
    };

  } catch(err) {
    console.log(err);
    throw err;    
  }
}

export default {
  sendOTP,
  verifyOTP,
  setPassword,
  getTokenDetails
}