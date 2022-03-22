const router = require("express").Router();
const { createNewMessage } = require("../controllers/messages.controller");

router.post("/new", createNewMessage);

module.exports = router;
