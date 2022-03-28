const { check, validationResult } = require("express-validator");

exports.validateMessage = [
  check("name")
    .trim()
    .escape()
    .not()
    .isNumeric()
    .withMessage("Le nom ne peut pas être composé uniquement de chiffres")
    .bail()
    .not()
    .isEmpty()
    .withMessage("Le nom ne peut pas être vide")
    .bail(),
  check("email")
    .trim()
    .escape()
    .isEmail()
    .withMessage("Erreur dans l'email")
    .bail()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage("L'email ne peut pas être vide")
    .bail(),
  check("message")
    .trim()
    .escape()
    .not()
    .isNumeric()
    .withMessage("Le message ne peut pas être composé uniquement de chiffres")
    .not()
    .isEmpty()
    .withMessage("Le message ne peut pas être vide")
    .bail(),
  (req, res, next) => {
    const e = validationResult(req);
    if (!e.isEmpty()) {
      const errorsArray = e.array();
      const errors = Object.keys(errorsArray).map((k) => errorsArray[k].msg);

      return res.render("pages/contact", { errors });
    }
    next();
  },
];
