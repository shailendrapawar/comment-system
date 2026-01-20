import CommentModel from "./comment.model.js";
import PostService from "../post/post.service.js"

import mongoose from "mongoose";
import { logger } from "../../utils/logger.js";
import commentModel from "./comment.model.js";

const populate = [{ path: "authorId", select: "name " }]

const CommentService = {

    async get(id, options) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("invalid mongo id");
        }

        const entity = await CommentModel.findById(id)
        logger.silly(`getting entity: ${JSON.stringify(entity)}`)
        if (entity.isDeleted) {
            return null
        }
        return entity
    },

    async search(query, options) {
        if (!query.postId || !mongoose.Types.ObjectId.isValid(query.postId)) {
            throw new Error("Invalid postId");
        }

        let where = {
            postId: new mongoose.Types.ObjectId(query.postId),
            isDeleted: false
        }

        // top-level comments
        if (!query.parentId) {
            where.parentId = null;
        }

        // replies
        if (query.parentId) {
            if (!mongoose.Types.ObjectId.isValid(query.parentId)) {
                throw new Error("Invalid parentId");
            }
            where.parentId = new mongoose.Types.ObjectId(query.parentId);
        }

        const skip = Math.max(parseInt(options.skip, 10) || 0, 0);
        const limit = Math.min(parseInt(options.limit, 10) || 20, 100);

        const [items, total] = await Promise.all([
            commentModel
                .find(where)
                .sort({ createdAt: -1 })
                .populate(populate)
                .skip(skip)
                .limit(limit)
                .lean(),
            commentModel.countDocuments(where)
        ]);

        return {
            items,
            count: items.length,
            total
        };
    },

    async create(data, options) {

        let { postId, parentId = null } = data;
        let entity = null;

        //1: find postId
        const post = await PostService.get(postId, { lean: false })

        if (!post) {
            throw new Error("Post not found");
            return
        }

        entity = new CommentModel({
            text: data.text,
            postId: new mongoose.Types.ObjectId(data.postId),
            authorId: data.authorId
        })

        // if parent comment exists
        if (parentId && mongoose.Types.ObjectId.isValid(parentId)) {
            logger.info("parent id found, searching for parent")
            const parentComment = await this.get(parentId, { lean: false });

            if (parentId && !parentComment) {
                throw new Error("No parent comment found");
                return
            }
            entity.parentId = new mongoose.Types.ObjectId(data.parentId);
            parentComment.replyCount = parentComment.replyCount + 1
            await parentComment.save()
        }
        await entity.save()

        post.commentCount = post.commentCount += 1
        await post.save()

        return entity.populate(populate)

    },

    async update(id, data, context) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid comment id");
        }

        let entity = await this.get(id);
        if (!entity) {
            throw new Error("Comment not found");
        }

        const user = context?.user
        if (entity?.authorId?.toString() != user?._id?.toString()) {
            throw new Error("Not allowed to edit");
        }

        if (data.text) {
            entity.text = data.text
        }

        if (data.delete) {
            entity.isDeleted = data.delete
            //also mark evry child isDeletd :true
            await commentModel.updateMany({ parentId: entity?._id }, {
                $set: {
                    isDeleted: true
                }
            })
        }

        await entity.save();
        return entity
    },
}

export default CommentService
