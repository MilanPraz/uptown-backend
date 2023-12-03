const express = require("express");
const {
  getBlog,
  postBlog,
  getBlogById,
  updateReview,
  getRecentBlog,
  getBlogCount,
  reply,
} = require("../controller/blog");
const auth = require("../middleware/auth");
const upload = require("../multer/multer");

const router = express.Router();

router.get("/api/blog", getBlog);
router.get("/api/recent/blog", getRecentBlog);
router.post("/api/create/blog", upload.single("image"), postBlog);
router.get("/api/blog/:id", getBlogById);
router.put("/api/blog/review/:id", auth, updateReview);
router.put("/api/blog/reply/:id", auth, reply);
router.get("/api/count/blog", getBlogCount);

module.exports = router;
