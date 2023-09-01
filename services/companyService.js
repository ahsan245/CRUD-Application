const { response } = require("express");
const Company = require("../companyModel");
const { generateAccessToken } = require("../middleware/auth"); 
const jwt = require("jsonwebtoken");
const { version } = require("mongoose");
const {companyRegisterSchema } = require('../helpers/validationSchema')

const NodeCache = require( "node-cache" );
const myCache = new NodeCache({stdTTL:30});


async function getCompany(params, callback) {
    var condition ={};
    Company
        .find(condition,"uuid display_name token meta version")
        .sort(params.sort)
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error)

        });
}
async function createCompany(params, callback) {
    const token = generateAccessToken('Company', params._id);
    myCache.set("companyToken",token)
    params.token = token; 


    
    const companyModel = new Company(params);
    companyModel.save().then((response) => {
        
        return callback(null, response);

    }
    )
        .catch((error) => {
            return callback(error);
        });



}



async function updateCompany(params, callback) {
    const id = params.id
    const existingCompany = await Company.findById(id).exec();
    const newVersion = parseInt(existingCompany.version) + 1;

    Company.findByIdAndUpdate(id,{ ...params,version:newVersion}, { useFindAndModify: false })
        .then((response) => {
            if (!response) {
                callback(`Company Not Updated with Id ${id}`);
            } else {
                callback(null, response);
            }
        })
        .catch((error) => {
            return callback(error);
        });
}

async function deleteCompany(params, callback) {
    const uuid = params.uuid;
    Company.findByIdAndRemove(uuid)
        .then((response) => {
            if (!response) {
                callback(`Company Not Deleted with id ${uuid}`)
            }
            else {
                callback(null, response)
            }
        })
        .catch((error) => {
            return callback(error)
        });
}


module.exports = {
    getCompany,
    createCompany,
    updateCompany,
    deleteCompany
}