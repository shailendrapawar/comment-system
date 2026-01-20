import jwt from "jsonwebtoken";
import { ENV } from "../configs/env.js";

const ACCESS_SECRET = ENV.JWT_ACCESS_SECRET;
const ACCESS_EXPIRES_IN = "1d";

export const issueToken = ({ userId, payload = {} }) => {
    return jwt.sign(
        {
            sub: userId,
            ...payload,
        },
        ACCESS_SECRET,
        { expiresIn: ACCESS_EXPIRES_IN }
    );
};

export const verifyToken = (token) => {
    return jwt.verify(token, ACCESS_SECRET);
};