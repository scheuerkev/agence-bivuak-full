const { check, validationResult } = require("express-validator");

exports.validateAuth = [
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
  check("password")
    .trim()
    .escape()
    .bail()
    .not()
    .isEmpty()
    .withMessage("Le mot de passe ne peut pas être vide")
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
