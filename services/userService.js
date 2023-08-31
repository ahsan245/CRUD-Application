
const { generateAccessToken } = require("../middleware/auth"); 
const User = require("../models/userModel");

const NodeCache = require( "node-cache" );
const myCache = new NodeCache({stdTTL:30});

async function createUser(params, callback) {
    const token = generateAccessToken('User', params._id);
    myCache.set("userToken",token)
    params.token = token; // Assign the generated token to the model


    
    const userModel = new User(params);
    userModel.save().then((response) => {
        
        return callback(null, response);

    }
    )
        .catch((error) => {
            return callback(error);
        });



}

module.exports = 
{
    createUser
}
