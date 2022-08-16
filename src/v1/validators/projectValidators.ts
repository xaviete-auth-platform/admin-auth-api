import joi from 'joi';

export const projectValidation = joi.object({
    name: joi.string()
        .required()
        .messages({
            'string.base': 'Name is required',
            'string.empty': 'Name is required',
            'string.required': 'Name is required',
            'any.required': 'Name is required'
        }),
    owner: joi.string()
        .required()
        .messages({
            'string.base': 'Owner id is required',
            'string.empty': 'Owner id is required',
            'string.required': 'Owner id is required',
            'any.required': 'Owner id is required'
        }),
    token: joi.string(),
    settings: joi.object()
});