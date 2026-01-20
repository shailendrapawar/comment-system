import PostService from "./comment.service.js"
import { logger } from "../../utils/logger.js"
import CommentService from "./comment.service.js"
import { createCommentSchema, updateCommentSchema } from "./comment.validators.js"
import { handleResponse, handleError } from "../../utils/responseHandler.js"
import { buildPagination } from "../../utils/buildPagination.js"
const MODULE = "POST"

const CommentController = {

    async get(req, res) {

        try {


        } catch (error) {
            logger.error(`Error`, error)
        }
    },

    async search(req, res) {
        try {
            const { query } = req
            // console.log(query)
            const pagination = buildPagination(req.query)
            logger.info(`Searching comments for query:`, req.query)
            const result = await CommentService.search(query, { ...pagination });

            return handleResponse(res, {
                status: 200,
                success: true,
                message: "Comments fetched",
                data: result
            })

        } catch (error) {
            logger.error(`Error`, error)
            handleError(res, { status: 400, message: `${error.message}`, data: null })
        }
    },

    async create(req, res) {
        try {

            const { error, value } = createCommentSchema.validate(req.body);
            if (error) {

                return handleError(res, { status: 400, message: `Validation error: ${error.message}` })
            }
            const payload = {
                ...value,
                authorId: req?.user?._id
            }

            const result = await CommentService.create(payload, {})
            logger.info(`Creating comment with payload:`, payload)
            if (!result) {
                return handleResponse(res, {
                    status: 400,
                    success: false,
                    message: "Comment not created",
                    data: null
                })
            }

            return handleResponse(res, {
                status: 201,
                success: true,
                message: "Comment created",
                data: result
            })

        } catch (error) {
            logger.error(`Error`, error)
            handleError(res, { status: 400, message: `${error.message}`, data: null })
        }
    },

    async update(req, res) {
        try {

            const { id } = req.params;
            const user = req.user
            const { error, value } = updateCommentSchema.validate(req.body)
            if (error) {
                return handleError(res, { status: 400, message: `Validation error: ${error.message}` })
            }

            logger.info(`Updating comment: ${id} and payload`, value)
            const result = await CommentService.update(id, value, { user })
            // console.log(result)
            return handleResponse(res,
                { status: 200, success: true, message: "Comment updated", data: result }
            )
        } catch (error) {
            logger.error(`Error`, error)
            return handleError(res, { status: 400, message: `${error.message}`, data: null })
        }
    },

}

export default CommentController
