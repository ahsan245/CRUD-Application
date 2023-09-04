const mongoose = require("mongoose");
const { Schema } = mongoose;

const deviceLastStateSchema = new Schema({
  device: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Device",
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  property: {
    type: String,
    maxlength: 128,
  },
  value: {
    type: String,
    maxlength: 16,
  },
  type: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  last_updated_ms: {
    type: BigInt,
    required: true,
  },
});

const DeviceLastState = mongoose.model("DeviceLastState", deviceLastStateSchema);

module.exports = DeviceLastState;
