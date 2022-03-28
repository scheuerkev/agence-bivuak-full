const { createMessage } = require("../queries/message.queries");

exports.createNewMessage = async (req, res, next) => {
  try {
    const body = req.body;
    await createMessage(body);
    res.render("pages/contact", {
      message: "Votre message a été envoyé avec succès",
    });
  } catch (e) {
    const errors = Object.keys(e.errors).map((k) => e.errors[k].message);
    res.render("pages/contact", { errors });
  }
};
