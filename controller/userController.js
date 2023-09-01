
const {userRegisterSchema } = require('../helpers/validationSchema')
const userService = require('../services/userService')
const {producer} = require('../rabbit/createUser')


exports.create = async (req, res, next) => {
    producer(req.body);


    try {
        await userRegisterSchema.validateAsync(req.body, { abortEarly: false });
    } catch (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(422).json({ errors: errorMessages });
    }
    


    const model = {
        company_uuid: req.body.company_uuid,
        meta: req.body.meta,
        
    };
    userService.createUser(model, (error, results) => {
        if (error) {
            console.error("Error in creating User:", error);
            return next(error);
        } else {
            const response = {
            
                timestamp_ms: Date.now(),
                action: "create",
                User: {
                    uuid: results._id,
                    company_uuid:results.company_uuid,
                    token:results.token,
                    meta:results.meta,
                    
                },
                
            };
            return res.status(200).json(response);
        }
    });
};
