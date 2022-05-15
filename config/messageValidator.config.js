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
    .not()
    .isEmpty()
    .withMessage("L'email ne peut pas être vide")
    .bail()
    .isEmail()
    .withMessage("Il y a une erreur dans l'email")
    .bail()
    .normalizeEmail()
    .bail(),
  check("phone")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Le téléphone ne peut pas être vide")
    .bail()
    .isNumeric()
    .withMessage("Il y a une erreur dans le numéro de téléphone")
    .bail(),
  check("message")
    .trim()
    .escape()
    .not()
    .isNumeric()
    .withMessage("Le message ne peut pas être composé uniquement de chiffres")
    .bail()
    .not()
    .isEmpty()
    .withMessage("Le message ne peut pas être vide")
    .bail(),
  (req, res, next) => {
    const e = validationResult(req);

    if (!e.isEmpty()) {
      const errorsArray = e.array();
      const errors = Object.keys(errorsArray).map((k) => errorsArray[k].msg);

      return res.status(400).json({
        success: false,
        errors: errors,
      });
    }

    next();
  },
];
