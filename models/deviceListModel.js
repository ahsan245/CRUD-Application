const mongoose = require("mongoose");

const DeviceList = mongoose.model(
    "DeviceList",
    mongoose.Schema(
        {
            list: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Device"
            },
        },
        {
            toJSON:{
                transform: function(doc,ret){
                    delete ret.__v;
                }
            },
        }, {
            timestamps: true
        })
        
    )

module.exports = {
    DeviceList,
}