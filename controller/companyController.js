const companyService = require("../services/companyService")
const uuid = require("uuid")
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 30 });
const payload = new NodeCache({});
const { generateAccessToken } = require("../middleware/auth");
const { version } = require("mongoose");
const { companyRegisterSchema } = require('../helpers/validationSchema')

exports.create = async (req, res, next) => {

    try {
        await companyRegisterSchema.validateAsync(req.body, { abortEarly: false });
    } catch (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(422).json({ errors: errorMessages });
    }



    const model = {
        display_name: req.body.display_name,
        meta: req.body.meta,
        version: 1,
    };

    // // const token = generateAccessToken(model.uuid); 
    // const token = generateAccessToken('Company', uuid);
    // myCache.set("companyToken",token)


    // model.token = token; // Assign the generated token to the model

    companyService.createCompany(model, (error, results) => {
        if (error) {
            console.error("Error in create company:", error);
            return next(error);
        } else {
            const response = {

                timestamp_ms: Date.now(),
                action: "create",
                company: {
                    uuid: results._id,
                    display_name: results.display_name,
                    token: results.token,
                    version: results.version,
                    meta: results.meta,

                },

            };
            return res.status(200).json(response);
        }
    });
};


exports.update = (req, res, next) => {
    const model = {
        id: req.params.id,
        display_name: req.body.display_name,
        meta: req.body.meta,
    };


    companyService.updateCompany(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            const response = {

                timestamp_ms: Date.now(),
                action: "Update",
                company: {
                    uuid: results._id,
                    display_name: results.display_name,
                    meta: results.meta,
                    version: results.version,

                },
                message: `Token is for entity type = Company and uuid = ${results._id}`,


            };

            return res.status(200).json(response);

        }
    });
};
exports.delete = (req, res, next) => {
    var model = {
        uuid: req.body.uuid
    }
    companyService.deleteCompany(model, (error, results) => {
        if (error) {
            return next(error)
        }
        else {
            return res.status(200).send({
                message: "Success",
                data: results
            });
        }
    })

}

exports.findAll = (req, res, next) => {
    var model = {
        uuid: req.body.uuid,
        display_name: req.body.display_name,
        token: req.body.token,
        meta: req.body.meta,
        version: req.body.version,

    }

    companyService.getCompany(model, (error, results) => {
        if (error) {
            return next(error)
        }
        else {
            return res.status(200).send({
                message: "Success",
                data: results
            });
        }
    })
}