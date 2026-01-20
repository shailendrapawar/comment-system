import mongoose from "mongoose";
import PostModel from "./post.model.js"
import postModel from "./post.model.js";

const populate = [{ path: "authorId", select: "name " }]

const PostService = {


    async get(id, options) {
        let result = null;
        if (mongoose.Types.ObjectId.isValid(id)) {
            result = await postModel.findById(id).populate(populate);
        }

        if (result?.isDeleted) {
            return null
        }
        return result
    },

    async search(query, options = {}) {
        console.log(query.authorId)
        let where = {}

        where.isDeleted = false

        if (query.authorId) {
            // console.log(authorId)
            where.authorId = new mongoose.Types.ObjectId(query?.authorId)
        }

        let result = await postModel.find(where)
        // console.log(result)
        return result
    },

    async create(data, options) {
        let newEntity = new PostModel(data);
        newEntity = await newEntity.save();
        return newEntity
    },

    async update(id, data, options) {
    },
}

export default PostService
