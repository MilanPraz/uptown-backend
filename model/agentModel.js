const mongoose = require("mongoose");

const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

const agentSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  total_sales: {
    type: Number,
    requied: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  home_types: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const agentModel = mongoose.model("agents", agentSchema);
module.exports = agentModel;
