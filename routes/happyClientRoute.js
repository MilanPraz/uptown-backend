const express = require("express");

const auth = require("../middleware/auth");
const { getHappyClient, addHappyClient } = require("../controller/happyClient");

const router = express.Router();

router.get("/api/happyclient", getHappyClient);
router.post("/api/happyclient/create", auth, addHappyClient);

module.exports = router;
