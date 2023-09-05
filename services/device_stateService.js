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


async function updateDeviceState(device, callback) {
    const deviceId = device.device;
    const propertyValue = device.property;

    try {
        // Find all DeviceState documents with the same device and property
        const matchingDeviceStates = await DeviceState.find({ device: deviceId, property: propertyValue }).exec();

        if (!matchingDeviceStates || matchingDeviceStates.length === 0) {
            return callback(`No matching Device State found for Device ID ${deviceId} and Property ${propertyValue}`);
        }

        // Update each matching DeviceState document
        for (const matchingDeviceState of matchingDeviceStates) {
            // Update the entire deviceState with data from the request
            matchingDeviceState.set(device);
            console.log("Updated Device State", matchingDeviceState);

            try {
                // Validate the updated deviceState against your schema (if needed)
                // Example validation:
                // await deviceStateSchema.validateAsync(matchingDeviceState.toObject(), { abortEarly: false });
            } catch (error) {
                return callback(error);
            }

            // Save the updated deviceState
            await matchingDeviceState.save();
        }

        callback(null, matchingDeviceStates); // Return an array of updated DeviceStates
    } catch (error) {
        return callback(error);
    }
}


module.exports={
    createDeviceState,
    updateDeviceState
}

