const DeviceState = require("../models/device_last_state_model");
const Device = require("../models/deviceModel");

async function createDeviceState(params, callback) {
    // Convert last_updated_ms to a string
   
    const deviceStateModel = new DeviceState(params);
    
    try {
        const response = await deviceStateModel.save();
        return callback(null, response);
    } catch (error) {
        return callback(error);
    }
}


// async function updateDeviceState(params, callback) {
//     const deviceId = params.device; // Assuming "device_uuid" is in the request
//     const propertyValue = params.property; // Assuming you want the first property
// console.log("params",propertyValue)
//     // Check if the device with the provided ID exists in the Device table
//     const existingDevice = await Device.findById(deviceId).exec();

//     if (!existingDevice) {
//         return callback(`Device with ID ${deviceId} not found`);
//     }

//     // Find the DeviceState document by deviceId
//     const deviceState = await DeviceState.findOne({ device: deviceId }).exec();

//     if (!deviceState) {
//         return callback(`Device State Not Found for Device ID ${deviceId}`);
//     }

//     // Check if the property exists in the deviceState
//     if (deviceState.property === propertyValue) {
//         // Update the entire deviceState with data from params
//         deviceState.set(params);
//     } else {
//         return callback(`Property ${propertyValue} not found in Device State`);
//     }

//     // Save the updated deviceState
//     deviceState
//         .save()
//         .then((response) => {
//             callback(null, response);
//         })
//         .catch((error) => {
//             return callback(error);
//         });
// }
async function updateDeviceState(device, callback) {
    const deviceId = device.device;
    const propertyValue = device.property;

    // Check if the device with the provided ID exists in the Device table
    const existingDevice = await Device.findById(deviceId).exec();

    // if (!existingDevice) {
    //     return callback(`Device with ID ${deviceId} not found`);
    // }

    // Find the DeviceState document by deviceId
    const deviceState = await DeviceState.findOne({ device: deviceId }).exec();

    // if (!deviceState) {
    //     return callback(`Device State Not Found for Device ID ${deviceId}`);
    // }

    // Check if the property exists in the deviceState
    if (deviceState.property === propertyValue) {
        // Update the entire deviceState with data from the request
        deviceState.set(device);
    } else {
        return callback(`Property ${propertyValue} not found in Device State`);
    }

    try {
        // Validate the updated deviceState against your schema (if needed)
        // Example validation:
        // await deviceStateSchema.validateAsync(deviceState.toObject(), { abortEarly: false });
    } catch (error) {
        return callback(error);
    }

    // Save the updated deviceState
    const savedDeviceState = await deviceState.save();
    callback(null, savedDeviceState);
}



module.exports={
    createDeviceState,
    updateDeviceState
}

