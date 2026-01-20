import PostService from "./post.service.js"
import { logger } from "../../utils/logger.js"
import { handleResponse } from "../../utils/responseHandler.js"

const MODULE = "POST"

const PostController = {

    async get(req, res) {

        try {
            const { id } = req.params
            if (!id) throw new Error("Invalid id");

            const result = await PostService.get(id, {})
            // console.log(result);
            if (!result) {
                return handleResponse(res, { status: 404, succes: "false", data: result })
            }
            return handleResponse(res, { status: 200, succes: true, message: "Post found", data: result })

        } catch (error) {
            logger.error(`Error`, error)
        }
    },

    async search(req, res) {
        try {

            // console.log(req.query)
            let result = await PostService.search(req.query, {})

            result = { items: result || [], count: result.length || 0 }

            return handleResponse(res,
                { status: 200, success: true, message: "Posts retrived", data: result }
            )

        } catch (error) {
            logger.error(`Error`, error)
        }
    },

    async create(req, res) {
        try {

            const { user, body } = req;

            const payload = {
                authorId: user?._id,
                content: body.content
            }

            const result = await PostService.create(payload, {});

            return handleResponse(res, { status: 200, message: "Post created", data: result })
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
}

export default PostController
