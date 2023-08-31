const Joi = require('joi');

const companyRegisterSchema = Joi.object({
    display_name: Joi.string().required().messages({
        'string.empty': 'Display name cannot be empty',
        'any.required': 'Display name is required'
    }),
    meta: Joi.string().required().messages({
        'string.empty': 'Meta cannot be empty',
        'any.required': 'Meta is required'
    }),
    version: Joi.string().required().messages({
        'string.empty': 'Version cannot be empty',
        'any.required': 'Version is required'
    })
});

const userRegisterSchema = Joi.object({
    company_uuid: Joi.string().required().messages({
        'string.empty': 'Company is required',
        'any.required': 'Company is required'
    }),
    meta: Joi.string().required().messages({
        'string.empty': 'Meta cannot be empty',
        'any.required': 'Meta is required'
    })
});
const authHeaderSchema = Joi.object({
    authorization: Joi.string()
        .required()
        .regex(/^Bearer\s+/i)
        .custom((value, helpers) => {
            if (!value.startsWith('Bearer ')) {
                return helpers.error('Authorization header with Bearer token is required');
            }
            return value;
        })
});

const deviceRegisterSchema = Joi.object({
    name: Joi.string()
        .required()
        .max(256)
        .messages({
            'string.empty': 'Name is required',
            'string.max': 'Name cannot exceed 256 characters'
        }),
    properties: Joi.object()
        .default({})
        .messages({
            'object.base': 'Invalid properties format'
        }),
    commands: Joi.object()
        .default({})
        .messages({
            'object.base': 'Invalid commands format'
        }),
    usage: Joi.array().items(
        Joi.string().valid('alexa_home_skill', 'google_home')
    ).messages({
        'array.base': 'Usage must be an array',
        'any.only': 'Invalid usage value'
    }),
    meta: Joi.any()
        .default({})
        .messages({
            'object.base': 'Invalid meta format'
        })
});

module.exports = {
    companyRegisterSchema,
    userRegisterSchema,
    authHeaderSchema,
    deviceRegisterSchema
};
