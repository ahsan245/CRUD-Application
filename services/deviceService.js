const { version } = require('joi');
const Device = require('../models/deviceModel')

async function createDevice(params, callback) {
    
    const deviceModel = new Device(params);
    deviceModel.save().then((response) => {
        
        return callback(null, response);

    }
    )
        .catch((error) => {
            return callback(error);
        });



}

async function deleteDevice(params, callback) {
    const id = params.id;
    Device.findByIdAndRemove(id)
        .then((response) => {
            if (!response) {
                callback({
                    message: `Device Not Deleted with id ${id}`
                });
        
            }
            else {
                callback(null, response)
            }
        })
        .catch((error) => {
            return callback(error)
        });
}

async function updateDevice(params, callback) {
    const id = params.id
    const existingDevice = await Device.findById(id).exec();

    const newVersion = parseInt(existingDevice.version) + 1;

    Device.findByIdAndUpdate(id,{ ...params,version:newVersion}, { useFindAndModify: false })
        .then((response) => {
            if (!response) {
                callback(`Device Not Updated with Id ${id}`);
            } else {
                callback(null, response);
            }
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports={
    createDevice,
    deleteDevice,
    updateDevice
}