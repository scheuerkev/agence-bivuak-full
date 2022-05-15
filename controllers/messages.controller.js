const { createMessage } = require("../queries/message.queries");

exports.createNewMessage = async (req, res, next) => {
  try {
    const body = req.body;
    await createMessage(body);
    res.status(200).json("Message created successfully");
  } catch (e) {
    // const errors = Object.keys(e.errors).map((k) => e.errors[k].message);
    res.status(400).json("Bad request");
  }
};
