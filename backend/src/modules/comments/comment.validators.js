import Joi from "joi"
const objectId = Joi.string().hex().length(24);
export const createCommentSchema = Joi.object({
    postId: objectId.required(),

    parentId: objectId.allow(null),

    text: Joi.string()
        .trim()
        .min(1)
        .max(2000)
        .required()
});

export const updateCommentSchema = Joi.object({

    text: Joi.string()
        .trim()
        .min(1)
        .max(2000),

    isDeleted: Joi.boolean()
});