const express = require("express");

const upload = require("../multer/multer");
const { getAgent, postAgent, getAgentById } = require("../controller/agent");

const router = express.Router();

router.get("/api/agent", getAgent);
router.post("/api/create/agent", upload.single("image"), postAgent);
router.get("/api/agent/:id", getAgentById);

module.exports = router;
