const mongoose = require("mongoose");
const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

const blogSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["jobs", "visual_assistant", "coffee", "drinks", "foods", "travel"],
  },
  blogDate: {
    type: String,
  },
  reviews: [
    {
      created_by: {
        type: ObjectId,
        ref: "users",
      },
      comment: {
        type: String,
        maxlength: 255,
      },
      replies: [
        {
          created_by: {
            type: ObjectId,
            ref: "users",
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
      reviewDate: {
        type: String,
      },
    },
  ],
});

const blogModel = mongoose.model("blogs", blogSchema);
module.exports = blogModel;
