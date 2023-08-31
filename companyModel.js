const mongoose = require('mongoose')
const companySchema = mongoose.Schema(
    {

        display_name: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: false
        },
        meta: {
            type: String,
            required: true
        },
        version: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {
            transform: function (doc, ret) {
                ret.uuid = ret._id.toString();
                delete ret._id;
                delete ret.__v;
            }
        }

    }
)

const Company = mongoose.model('Company', companySchema);

module.exports = Company
