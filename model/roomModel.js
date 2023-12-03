const mongoose = require("mongoose");

const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

const roomSchema = new schema({
  home_name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  lot_area: {
    type: Number,
    required: true,
  },
  bedRooms: {
    type: Number,
    required: true,
  },
  bathRooms: {
    type: Number,
    required: true,
  },
  garage: {
    type: Boolean,
    required: true,
  },
  stories: {
    type: Number,
    required: true,
  },
  roofing: {
    type: String,
    enum: ["new", "old", "moderate"],
    required: true,
  },
  yearBuild: {
    type: String,
    required: true,
  },
  floorArea: {
    type: Number,
    required: true,
  },
  basement: {
    type: Boolean,
    required: true,
  },
  water: {
    type: Boolean,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  reviews: [
    {
      rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
      },
      created_by: {
        type: ObjectId,
        ref: "users",
      },
      reviewerPhoto: {
        type: String,
      },
      comment: {
        type: String,
        maxlength: 255,
      },

      reviewDate: {
        type: String,
      },
    },
  ],
  agent: {
    ref: "agents",
    type: ObjectId,
  },
});

const roomModel = mongoose.model("room", roomSchema);
module.exports = roomModel;
