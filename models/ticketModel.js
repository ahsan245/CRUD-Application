
const mongoose = require('mongoose');


const ticketSchema = new mongoose.Schema({
    email:
    {
        type: String,
        required: true
    },
    name:
    {
        type: String,
        required: true
    },
    subject:
    {
        type: String,
        required: true
    },
    message:
    {
        type: String,
        required: true
    },
    type:
    {
        type: String,
        default: 'text/plain'
    },
    alert:
    {
        type: Boolean,
        default: true
    },
    autorespond:
    {
        type: Boolean,
        default: true
    },
    ip:
        { type: String },
    priority:
        { type: Number },
    source:
    {
        type: String,
        default: 'API'
    },
    topicId:
        { type: String },
   
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
