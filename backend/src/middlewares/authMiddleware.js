import { verifyToken } from "../helpers/tokenHandler.js";

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const payload = verifyToken(token);

        req.user = {
            _id: payload.sub,
        };

        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
