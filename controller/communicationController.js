

const communicationService = require("../services/communicationService");

exports.create = async (req, res, next) => {
    // try {
    //     // Validate the request body against the schema
    //     await ticketValidationSchema.validateAsync(req.body, { abortEarly: false });
    // } catch (error) {
    //     const errorMessages = error.details.map(detail => detail.message);
    //     return res.status(422).json({ errors: errorMessages });
    // }
    // Create a new ticket document
    const newTicket = {
        entityType: req.body.entityType,
        entityId: req.body.entityId,
        type: req.body.type,
        title: req.body.title,
        description: req.body.description,
        messages: req.body.messages,
        priority: req.body.priority,
    };

    // Save the new ticket to the database
    communicationService.createCustomer(newTicket, (error, results) => {
        if (error) {
            console.error("Error in creating Customers:", error);
            return next(error);
        } else {
            const response = {
                timestamp_ms: Date.now(),
                action: "create",
                User: {
                    entityType: results.entityType,
                    entityId: results.entityId,
                    type: results.type,
                    title: results.title,
                    description: results.description,
                    messages: results.messages,
                    priority: results.priority,


                }
            };

            return res.status(200).json(response);
        }
    });

};
