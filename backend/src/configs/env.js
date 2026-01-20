import { config, configDotenv } from "dotenv"
configDotenv()
export const ENV = {
    PORT: Number(process.env.PORT) || 3000,
    NODE_ENV: process.env.NODE_ENV || "development",

    MONGO_URL: process.env.MONGO_URL,
    DB_NAME: process.env.DB_NAME || "comment-system",

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "uk04ac2006",

    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173"
}