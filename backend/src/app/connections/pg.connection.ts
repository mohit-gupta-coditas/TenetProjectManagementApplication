import { Sequelize } from "sequelize";
import { env } from "../../validate.env.js";

const sequelize = new Sequelize(
  env.DB_NAME,
  env.DB_USERNAME,
  env.DB_PASSWORD,
  {
    dialect: 'postgres'
  }
);

export const connectToPG = async () => {
  try {
    await sequelize.authenticate();
    console.log(`PG DATABASE CONNECTED SUCCESSFULLY`);
  } catch(err) {
    console.log('PG NOT CONNECTED....');
    throw err;
  }
}