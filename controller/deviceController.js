const deviceService = require('../services/deviceService')
const { deviceRegisterSchema,idValidationSchema } = require('../helpers/validationSchema')


exports.create = async (req, res, next) => {

    try {
        await deviceRegisterSchema.validateAsync(req.body, { abortEarly: false });
        // await idValidationSchema.validateAsync({ id: req.params.user });
        // await idValidationSchema.validateAsync({ id: req.params.company });
    } catch (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(422).json({ errors: errorMessages });
    }



    const model = {
        user:req.body.user,
        company: req.body.company,
        name: req.body.name,
        properties: req.body.properties,
        commands: req.body.commands,
        usage: req.body.usage,
        meta: req.body.meta,

    };
    deviceService.createDevice(model, (error, results) => {
        if (error) {
            console.error("Error in creating Device:", error);
            return next(error);
        } else {
            const response = {

                timestamp_ms: Date.now(),
                action: "create",
                Device: {
                    user:results.user,
                    company: results.company,
                    uuid: results._id,
                    name: results.name,
                    properties: results.properties,
                    commands: results.commands,
                    usage: results.usage,
                    meta: results.meta,
                    version:results.version
                },

            };
            return res.status(200).json(response);
        }
    });
};


exports.delete = (req, res, next) => {
    var model = {
        id: req.params.id
    }
    deviceService.deleteDevice(model, (error, results) => {
        if (error) {
            return next(error)
        }
        const response = {

            timestamp_ms: Date.now(),
            action: "Delete",
            Device: {
                uuid: results._id,
                name: results.name,
                properties: results.properties,
                commands: results.commands,
                usage: results.usage,
                meta: results.meta,
                version:results.version
            },

        };
        return res.status(200).json(response);

    });

}


exports.update = (req, res, next) => {
    const model = {
        id: req.params.id,
        name: req.body.name,
        properties: req.body.properties,
        commands: req.body.commands,
        usage: req.body.usage,
        meta: req.body.meta,
    };


    deviceService.updateDevice(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            const response = {

                timestamp_ms: Date.now(),
                action: "Update",
                Device: {
                    uuid: results._id,
                    name: results.name,
                    properties: results.properties,
                    commands: results.commands,
                    usage: results.usage,
                    meta: results.meta,
                    version:results.version
                },
                message: `Token is for entity type = User and uuid = ${results._id}`,


            };

            return res.status(200).json(response);

        }
    });
};




