import UserService from "./user.service.js"
import { logger } from "../../utils/logger.js"
import { handleError, handleResponse } from "../../utils/responseHandler.js"
import { issueToken } from "../../helpers/tokenHandler.js"
import { ENV } from "../../configs/env.js"

const MODULE = "USER"

const UserController = {

    async get(req, res) {

        try {

        } catch (error) {
            logger.error(`Error`, error)
        }
    },

    async search(req, res) {

        try {

        } catch (error) {
            logger.error(`Error`, error)
        }
    },
    async update(req, res) {

        try {

        } catch (error) {
            logger.error(`Error`, error)
        }
    },

    async register(req, res) {
        try {
            const user = await UserService.create(req.body, {});
            handleResponse(res, { status: 201, message: "User registered successfully", data: user })
        } catch (error) {
            logger.error(error.message)
            handleError(res, { status: 400, message: error.message })
        }
    },

    async login(req, res) {

        try {

            const user = await UserService.login(req.body, {});
            if (!user) {
                return handleError(res, { status: 400, message: "Invalid credentials" })
            }
            const token = issueToken({ userId: user?._id, purpose: "access", payload: { email: user?.email } })

            res.cookie("token", token, {
                httpOnly: true,
                secure: ENV.NODE_ENV === "production",
                secure: false,
                sameSite: "lax",
                maxAge: 24 * 60 * 60 * 1000
            })

            console.log("token set", token)


            return handleResponse(res, { status: 200, message: "User login successfully", data: { token, user } })
        } catch (error) {
            logger.error(`Error`, error)
            handleError(res, { status: 400, message: error.message })
        }
    }
}

export default UserController
