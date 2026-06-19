import { createClient } from 'redis';
import { env } from '../../validate.env.js';
export const client = createClient({
  username: env.REDIS_USERNAME,
  password: env.REDIS_PASSWORD,
  socket: {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT
  }
});

export const redisSetup = async () => {
  try {
    await client.connect();
    console.log('CONNECTED TO REDIS...');
  } catch(err) {
    console.log('Redis Client Error', err)
    throw {
      message: 'REDIS NOT CONNECTED'
    };
  }
}