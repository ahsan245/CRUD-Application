const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    company_uuid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
    },
    token: {
        type: String,
        required: false,
    },
    meta: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }


}
    ,
    {
        toJSON: {
            transform: function (doc, ret) {
                ret.uuid = ret._id.toString();
                delete ret._id;
                delete ret.__v;
            }
        }

    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
