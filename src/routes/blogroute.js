const express = require("express");
const imageUpload = require("../middleware/upload");
const router = express.Router();
const blogController = require("../controllers/blogcontroller");

router.post(
  "/insertblog",
  imageUpload.single("image"),
  blogController.insertBlog
);
router.put("/updateblog/:id", blogController.UpdateBLog);
router.get("/getblog", blogController.getBLog);
router.get("/getsingleblog/:id", blogController.getSingleBLog);
router.delete("/deleteblog/:id", blogController.DeleteBLog);

module.exports = router;
