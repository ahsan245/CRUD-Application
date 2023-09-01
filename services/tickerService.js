const Ticket = require('../models/ticketModel');
async function createTicket(params, callback) {
    const ticketModel = new Ticket(params);
    ticketModel.save().then((response) => {

        return callback(null, response);

    }
    )
        .catch((error) => {
            return callback(error);
        });



}

module.exports ={
    createTicket
}