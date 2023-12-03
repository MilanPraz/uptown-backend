const express = require("express");
const upload = require("../multer/multer");
const singup = require("../controller/singup");
const login = require("../controller/login");
const { userDetail, commenterDetail } = require("../controller/user");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/api/signup", upload.single("image"), singup);
router.post("/api/login", login);
router.get("/api/user/:id", commenterDetail);
router.get("/api/user", auth, userDetail);

module.exports = router;
