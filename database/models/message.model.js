const mongoose = require("mongoose");
const schema = mongoose.Schema;

const messageSchema = schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model("message", messageSchema);

module.exports = Message;
