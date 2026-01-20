import { verifyToken } from "../helpers/tokenHandler.js";
import { logger } from "../utils.js"
export const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies?.token;
        logger.debug(`User came  with token`,req.cookies)
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const payload = verifyToken(token);

        req.user = {
            _id: payload.sub,
        };
        logger.debug(`User authenticated with token`)
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
