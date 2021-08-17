const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

const UsersSchema = new Schema({
  id: {
    type: Number
  },
  title: {
    type: String,
    required: true
  },
  blog: {
    type: String,
    required: true
  },
  comments: {
    type: String
  },
  img: {
    data: String,
    contentType: String
  }
});

module.exports = Blogs = mongoose.model("blog", UsersSchema);
