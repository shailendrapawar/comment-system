import mongoose from "mongoose"
import { logger } from "../utils/logger.js"; // optional logger
import { ENV } from "./env.js"
export async function connectDB() {
    const uri = ENV.MONGO_URL

    try {
        await mongoose.connect(uri);
        logger?.success("✅ Mongo connected successfully with db:", ENV.DB_NAME?.toUpperCase());
        return true
    } catch (err) {
        logger?.error(`❌ Mongo connection failed: with db: ${ENV.DB_NAME?.toUpperCase()}`, err);
        process.exit(1);
    }
}

// export default mongoose;