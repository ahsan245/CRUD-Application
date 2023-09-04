const { version } = require('joi');
const Device = require('../models/deviceModel')
const DeviceList = require('../models/deviceListModel')
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

    Device.findByIdAndUpdate(id, { ...params, version: newVersion }, { useFindAndModify: false })
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

async function deviceList(params,callback) {
    // const cachedEntityUuid = myCache.get("UserId")

    // console.log("cachedEntityUuid", cachedEntityUuid);

    try {
        const devices = await Device.find({ user: "64f1dd1e7b5bea6f62019a33" })
            .populate("user", "uuid meta")
            .populate("company", "display_name meta version")
            .exec();

        if (!devices.length) {
            callback("No Devices found for user with id " + "64f56f844cff3774abd2282d");
        } else {
            callback(null, devices);
        }
    } catch (error) {
        callback(error);
    }



}


module.exports = {
    createDevice,
    deleteDevice,
    updateDevice,
    deviceList
}