const Joi = require('joi');
const validationMessages = require('./message.json'); // Adjust the path to your messages.json file

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

const idValidationSchema = Joi.object({
    id: Joi.string()
        .custom((value, helpers) => {
            if (!Types.ObjectId.isValid(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        }, 'MongoDB ObjectId')
        .required().messages(validationMessages.id)
});

const deviceRegisterSchema = Joi.object({
    user: Joi.string().required().messages({
        'string.empty': 'User is required',
        'any.required': 'User is required'
    }),
    company: Joi.string().required().messages({
        'string.empty': 'Company is required',
        'any.required': 'Company is required'
    }),
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


const ticketValidationSchema = Joi.object({
    alert: Joi.boolean().default(true)
        .messages({
            'boolean.base': 'Alert must be a boolean'
        }),
    autorespond: Joi.boolean().default(true)
        .messages({
            'boolean.base': 'Autorespond must be a boolean'
        }),
    source: Joi.string().default('API')
        .messages({
            'string.base': 'Source must be a string'
        }),
    name: Joi.string().required().max(256)
        .messages({
            'string.empty': 'Name is required',
            'string.max': 'Name cannot exceed 256 characters'
        }),
    email: Joi.string().required().email()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Invalid email format'
        }),
    phone: Joi.string()
        .messages({
            'string.base': 'Phone must be a string'
        }),
    subject: Joi.string().required()
        .messages({
            'string.empty': 'Subject is required'
        }),
    ip: Joi.string()
        .messages({
            'string.base': 'IP must be a string'
        }),
    message: Joi.string().required()
        .messages({
            'string.empty': 'Message is required'
        }),
    attachments: Joi.array().items(Joi.object({
        name: Joi.string(),
        data: Joi.string(),
        type: Joi.string().default('text/plain'),
        encoding: Joi.string().default('base64')
    })).messages({
        'array.base': 'Attachments must be an array'
    })
}).messages({
    'object.unknown': 'Unsupported field sent'
});

const deviceStateSchema = Joi.object({
    device: Joi.string().required().messages({
        'string.empty': 'Device is required',
        'any.required': 'Device is required',
      }),
      company: Joi.string().required().messages({
        'string.empty': 'Company is required',
        'any.required': 'Company is required',
      }),
    
    property: Joi.string().max(128).required().messages({
      'string.empty': 'Property is required',
      'string.max': 'Property cannot exceed 128 characters',
      'any.required': 'Property is required',
    }),
    value: Joi.string().max(16).required().messages({
      'string.empty': 'Value is required',
      'string.max': 'Value cannot exceed 16 characters',
      'any.required': 'Value is required',
    }),
    type: Joi.required().messages({
      'any.required': 'Type is required',
    }),
    last_updated_ms: Joi.number().integer().required().messages({
      'number.empty': 'Last Updated Milliseconds is required',
      'number.integer': 'Last Updated Milliseconds must be an integer',
      'any.required': 'Last Updated Milliseconds is required',
    }),
  });

module.exports = ticketValidationSchema;

module.exports = {
    companyRegisterSchema,
    userRegisterSchema,
    authHeaderSchema,
    deviceRegisterSchema,
    ticketValidationSchema,
    idValidationSchema,
    deviceStateSchema
};
