const { createMessage } = require("../queries/articles.queries");

exports.createNewMessage = async (req, res, next) => {
  try {
    const body = req.body;
    await this.createNewMessage(body);
    res.render("/contact", {
      message: "Votre message a été envoyé avec succès",
    });
  } catch (e) {
    const errors = Object.keys(e.errors).map((k) => e.errors[k].message);
    res.status(400).render("/contact", { errors });
  }
};
