const mongoose = require('mongoose');

// Define the schema
const CustomerSchema = new mongoose.Schema({
  entityType: String,
  entityId: String,
  type: String,
  title: String,
  description: String,
  messages: [String], // Array of strings for messages
  priority: Number
});

// Create the model
const Customers = mongoose.model('Customers', CustomerSchema);

module.exports = Customers;