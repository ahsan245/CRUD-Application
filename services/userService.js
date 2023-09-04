
const { generateAccessToken } = require("../middleware/auth"); 
const User = require("../models/userModel");

const NodeCache = require( "node-cache" );
const myCache = new NodeCache({stdTTL:30});

async function createUser(params, callback) {
    const userModel = new User(params);

    userModel.save().then((response) => {
        // Generate a token using the _id from the response
        const token = generateAccessToken('User', response._id);
        myCache.set("userToken",token)
        
        // Save the generated token inside the user model
        userModel.token = token;

        // Update the user model with the token
        userModel.save().then((updatedUser) => {
            return callback(null, updatedUser);
        }).catch((error) => {
            return callback(error);
        });
    }).catch((error) => {
        return callback(error);
    });
}
module.exports = 
{
    createUser
}
