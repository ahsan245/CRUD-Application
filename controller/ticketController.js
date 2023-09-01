const {ticketValidationSchema} = require("../helpers/validationSchema");
const ticketService = require("../services/tickerService");


exports.createTicket = async (req, res, next) => {
    // try {
    //     // Validate the request body against the schema
    //     await ticketValidationSchema.validateAsync(req.body, { abortEarly: false });
    // } catch (error) {
    //     const errorMessages = error.details.map(detail => detail.message);
    //     return res.status(422).json({ errors: errorMessages });
    // }
        // Create a new ticket document
        const newTicket = {
            alert: req.body.alert,
            autorespond: req.body.autorespond,
            source: req.body.source,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            subject: req.body.subject,
            ip: req.body.ip,
            message: req.body.message,
        };

        // Save the new ticket to the database
        ticketService.createTicket(newTicket,(error, results) => {
            if (error) {
                console.error("Error in creating Ticket:", error);
                return next(error);
            } else {
                const response = {
                    timestamp_ms: Date.now(),
                    action: "create",
                    Ticket: {
                        id: results._id,
                    }
                };
                return res.status(200).json(response);
            }
        });
    
};
