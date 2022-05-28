const router = require("express").Router();
//const {ensureAuthenticated} = require('../config/guards.config');
const { validateAuth } = require("../config/authValidator.config");

const {
  signinForm,
  signin,
  signout,
  signinWithGoogle,
  googleAuthCb,
} = require("../controllers/auth.controller");

router.get("/signin/form", signinForm);
router.post("/signin", validateAuth, signin);
router.get("/google", signinWithGoogle);
router.get("/google/cb", googleAuthCb);
router.get("/signout", signout);

module.exports = router;
