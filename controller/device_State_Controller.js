
const deviceStateService = require("../services/device_stateService");
const { deviceStateSchema } = require("../helpers/validationSchema");
const JSONBig = require('json-bigint');



exports.create = async (req, res, next) => {

    try {
        await deviceStateSchema.validateAsync(req.body, { abortEarly: false });
    } catch (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(422).json({ errors: errorMessages });
    }



    const model = {
        device: req.body.device,
        company: req.body.company,
        property: req.body.property,
        value: req.body.value,
        type: req.body.type,
        last_updated_ms: (req.body.last_updated_ms.toString()),

    };
    deviceStateService.createDeviceState(model, (error, results) => {
        if (error) {
            console.error("Error in creating DeviceState:", error);
            return next(error);
        } else {
            const response = {

                timestamp_ms: Date.now(),
                action: "create",
                DeviceState: {
                    device: results.device,
                    company: results.company,
                    property: results.property,
                    name: results.name,
                    value: results.value,
                    type: results.type,
                    last_updated_ms: results.last_updated_ms,
                },

            };
            const jsonResponse = JSONBig.stringify(response);

            return res.status(200).json(JSONBig.parse(jsonResponse)); // Parse it back to JSON

        }
    });
};


exports.update = async (req, res, next) => {
    const deviceList = req.body.list; // Get the list of devices from the request

    // Iterate through the list of devices and update each DeviceState
    const updatedDeviceStates = [];

    for (const device of deviceList) {
        const model = {
            device: device.device[0],
            property: device.properties[0].property,
            value: device.properties[0].value,
            type: device.properties[0].type,
            last_updated_ms: device.last_updated_ms,
        };

        // try {
        //     await deviceStateSchema.validateAsync(model, { abortEarly: false });
        // } catch (error) {
        //     const errorMessages = error.details.map(detail => detail.message);
        //     return res.status(422).json({ errors: errorMessages });
        // }

        deviceStateService.updateDeviceState(model, (error, result) => {
            if (error) {
                console.error("Error in Updating DeviceState:", error);
                return res.status(500).json({ error: "Error in Updating DeviceState", message: error.message });
            } else {
                updatedDeviceStates.push(result);

                if (updatedDeviceStates.length === deviceList.length) {
                    // All devices have been updated, send the response
                    const response = {
                        timestamp_ms: Date.now(),
                        action: "Update",
                        DeviceStates: updatedDeviceStates,
                    };

                    const jsonResponse = JSONBig.stringify(response);

                    return res.status(200).json(JSONBig.parse(jsonResponse)); // Parse it back to JSON
                }
            }
        });
    }
};



// exports.update = async (req, res, next) => {

//     // try {
//     //     await deviceStateSchema.validateAsync(req.body, { abortEarly: false });
//     //     // await idValidationSchema.validateAsync({ id: req.params.user });

//     // } catch (error) {
//     //     const errorMessages = error.details.map(detail => detail.message);
//     //     return res.status(422).json({ errors: errorMessages });
//     // }



//     const model = {
//         device: req.body.device,
//         property: req.body.properties[0].property,
//         value: req.body.properties[0].value,
//         type: req.body.properties[0].type,
//         last_updated_ms: req.body.properties[0].last_updated_ms,

//     };

//     deviceStateService.updateDeviceState(model, (error, results) => {
//         if (error) {
//             console.error("Error in Updating DeviceState:", error);
//             return res.status(500).json({ error: "Error in Updating DeviceState", message: error.message });

//         } else {
//             const response = {

//                 timestamp_ms: Date.now(),
//                 action: "Update",
//                 DeviceState: {
//                     device: results.device,
//                     company: results.company,
//                     property: results.property,
//                     name: results.name,
//                     value: results.value,
//                     type: results.type,
//                     last_updated_ms: results.last_updated_ms,
//                 },

//             };
//             const jsonResponse = JSONBig.stringify(response);

//             return res.status(200).json(JSONBig.parse(jsonResponse)); // Parse it back to JSON

//         }
//     });

// };


