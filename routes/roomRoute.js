const express = require("express");
const {
  getRoom,
  postRoom,
  getRoomById,
  updateReview,
  reply,
  deleteRoom,
  editRoom,
} = require("../controller/room");
const upload = require("../multer/multer");
const auth = require("../middleware/auth");
// const getRoom = require("../controller/room");
const router = express.Router();

router.get("/api/room", getRoom);
router.get("/api/room/:id", getRoomById);
router.post("/api/create/room", auth, upload.single("image"), postRoom);
router.put("/api/room/review/:id", auth, updateReview);
router.delete("/api/room/delete/:id", auth, deleteRoom);
router.put("/api/room/edit/:id", auth, upload.single("image"), editRoom);
module.exports = router;
