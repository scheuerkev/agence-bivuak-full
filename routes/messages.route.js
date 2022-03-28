const router = require("express").Router();
const { validateMessage } = require("../config/messageValidator.config");
const { createNewMessage } = require("../controllers/messages.controller");

router.post("/new", validateMessage, createNewMessage);

module.exports = router;
