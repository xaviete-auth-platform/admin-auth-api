import joi from "joi";

export const requestValidation = joi.object({
    project_id: joi.string()
        .required()
        .messages({
            "string.empty": "Project id is required",
            "any.required": "Project id is required"
        }),
    code: joi.number()
        .required()
        .messages({
            "number.base": "Status is required",
            "any.required": "Status is required"
        }),
    message: joi.string()
        .required()
        .messages({
            "string.base": "Message is required",
            "any.required": "Message is required"
        }),
    others: joi.object()
});