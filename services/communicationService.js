
const Customers = require('../models/customerModel');
const {generateAccessToken} = require('../middleware/auth');


const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 30 });


async function createCustomer(params, callback) {

    const token = generateAccessToken('customer', params._id);
    myCache.set("customerToken",token)
    params.token = token; // Assign the generated token to the model


    const userModel = new Customers(params);
    userModel.save().then((response) => {

        return callback(null, response);

    }
    )
        .catch((error) => {
            return callback(error);
        });



}
module.exports = {
    createCustomer
}