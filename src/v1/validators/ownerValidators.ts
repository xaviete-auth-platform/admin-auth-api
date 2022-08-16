import joi from 'joi';

export const ownerRegisterValidation = joi.object({
    name: joi.string()
        .required()
        .messages({
            'string.empty': 'Name is required',
            'any.required': 'Name is required'
        }),
    surname: joi.string()
        .required()
        .messages({
            'string.empty': 'Surname is required',
            'any.required': 'Surname is required'
        }),
    username: joi.string()
        .required()
        .messages({
            'string.empty': 'Username is required',
            'any.required': 'Username is required'
        }),
    email: joi.string().email()
        .required()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Email is not valid',
            'any.required': 'Email is required'
        }),
    password: joi.string()
        .required()
        .messages({
            'string.empty': 'Password is required',
            'any.required': 'Password is required'
        })
}).messages({
    'object.empty': 'Owner is required',
    'any.required': 'Owner is required',
    'object.unknown': 'Some properties are not allowed'
});

export const ownerLoginValidation = joi.object({
    email: joi.string().email()
        .required()
        .messages({
            'string.empty': 'Email is required',
            'any.required': 'Email is required',
            'string.email': 'Email is not valid'
        }),
    password: joi.string()
        .required()
        .messages({
            'string.empty': 'Password is required',
            'any.required': 'Password is required'
        })
}).messages({
    'object.empty': 'Owner is required',
    'any.required': 'Owner is required',
    'object.unknown': 'Some properties are not allowed'
});