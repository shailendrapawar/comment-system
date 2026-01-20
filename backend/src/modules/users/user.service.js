import UserModel from './user.model.js'
import { logger } from '../../utils/logger.js'
import mongoose from 'mongoose';
import { handleResponse } from '../../utils/responseHandler.js';

const UserService = {
    async get(id, options = {}) {
        let where = {};
        let user = null
        if (id) {
            if (mongoose.Types.ObjectId.isValid(id)) {
                where._id = id;
                // user = UserModel.findById({ _id: id });
            } else {
                where.email = id;
                // user = UserModel.findById({ email: id });
            }
            user = UserModel.findOne({ email: id });
        }

        if (user && options.lean) {
            user = await user.lean()
        }
        user = await user;
        return user
    },

    async search(query, options) {

    },

    async create(data, options) {

        let user = null

        user = await this.get(data.email)


        if (user) {
            logger.info("User found with  email: ", user)
            throw new Error('User with this email already exists');
        }

        logger.info(`Creating new user with email: ${data.email}`);
        user = new UserModel(data);

        await user.save();
        logger.info(`User created with id: ${user._id}`);
        return user;
    },

    async update(id, data, options) {

    },

    async login(data, options) {
        let user = null

        user = await this.get(data.email, { lean: true })

        if (!user) {
            return null;
        }
        logger.silly("Found user with: " + data.email)

        if (user.password !== data.password) {
            return null
        }

        delete user.password

        return user
    }
}

export default UserService
