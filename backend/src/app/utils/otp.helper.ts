import { client } from "../connections/redis.connection.js";

export type OtpData = {
  otp: number,
  retries: number,
  createTime: number
}

export const setOTP = async (user_email: string, otpData : OtpData, expiry: number) => {
  try {
    await client.set(
      `otp_${user_email}`, 
      JSON.stringify(
        otpData
      ), 
      {
        expiration: {
          type: "EX",
          value: expiry
        }
      }
    );
  } catch(err) {
    console.error("huhu",err);
    throw err;
  }
}