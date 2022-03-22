const Message = require("../database/models/message.model");

exports.createMessage = (message) => {
  const newMessage = new Message(message);
  return newMessage.save();
};
