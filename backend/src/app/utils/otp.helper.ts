import { client } from "../connections/redis.connection.js";

export type OtpData = {
  otp: string,
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
    throw err;
  }
}