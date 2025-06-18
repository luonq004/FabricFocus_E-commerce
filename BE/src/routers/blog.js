import express from "express";
import {
  createBlog,
  deleteBlog,
  getBlogById,
  getBlogs,
  updateBlog,
} from "../controllers/blog.js";
import upload from "../config/upload.js";

const BlogRouter = express.Router();

BlogRouter.post("/", upload.single("image"), createBlog);

BlogRouter.get("/", getBlogs);

BlogRouter.get("/:id", getBlogById);

BlogRouter.put("/:id", upload.single("image"), updateBlog);

BlogRouter.delete("/:id", deleteBlog);

export default BlogRouter;
