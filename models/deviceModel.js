const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    company :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    name: {
        type: String,
        required: true,
        maxlength: 256
    },
    properties: {
        type: Object,
        default: {}
    },
    commands: {
        type: Object,
        default: {}
    },
    usage: [{
        type: String,
        enum: ['alexa_home_skill', 'google_home']
    }],
    meta: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    version:{
        type:String,
        required:false,
        default:1
    }
},
{
    toJSON: {
        transform: function (doc, ret) {
            ret.device_uuid = ret._id.toString();
            delete ret._id;
            delete ret.__v;
        }
    }

}

);

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;
