import * as dotenv from "dotenv";

dotenv.config();

export default {
  mongoDbUrlConnection: process.env.MONGO_URL,
  port: process.env.PORT ? parseInt(process.env.PORT) : 5000,
  accessKeySecret: process.env.ACCESS_TOKEN || "access",
  refreshKeySecret: process.env.REFRESH_TOKEN || "refresh",
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
};
