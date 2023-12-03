const { required } = require("joi");
const mongoose = require("mongoose");

const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

const happyClientSchema = new schema({
  username: {
    type: String,
  },
  image: {
    type: String,
  },
  userid: {
    type: ObjectId,
  },
  message: {
    type: String,
    required: true,
  },
  createdDate: {
    type: String,
  },
});

const happyClientModel = mongoose.model("happyclients", happyClientSchema);
module.exports = happyClientModel;
