import * as dotenv from "dotenv";

dotenv.config();

export default {
  mongoDbUrlConnection: process.env.MONGO_URL,
  port: process.env.PORT ? parseInt(process.env.PORT) : 5000,
};
