import cloudinary from "../config/cloudinary.js";
import Blog from "../models/blog.js";
import mongoose from "mongoose";

// Tạo bài viết mới
export const createBlog = async (req, res) => {
  try {
    const { content, title, category, author, description, image } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!title || !category || !author || !description || !content || !image) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc!" });
    }

    const newBlog = new Blog({
      title,
      category,
      author,
      description,
      content,
      image,
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error("Lỗi khi lưu bài viết:", error);
    res.status(500).json({ message: "Lỗi khi tạo bài viết", error });
  }
};

// Lấy tất cả bài viết (không phân trang)
export const getBlogs = async (req, res) => {
  const {
    _page = 1,
    _limit = 3,
    _sort = "createdAt",
    _order = "desc",
    _category,
    _search,
  } = req.query;

  const options = {
    page: _page,
    limit: _limit,
    sort: { [_sort]: _order === "desc" ? -1 : 1 },
  };

  try {
    const filter = {};

    if (_category) {
      filter.category = _category; // Lọc theo danh mục
    }

    if (_search) {
      filter.$or = [
        { title: { $regex: _search, $options: "i" } }, // Tìm theo tiêu đề
        { author: { $regex: _search, $options: "i" } }, // Tìm theo tác giả
      ];
    }

    const data = await Blog.paginate(filter, { ...options });

    const results = {
      data: data.docs,
      currentPage: data.page,
      totalPages: data.totalPages,
      totalItems: data.totalDocs,
      limit: _limit,
    };

    res.status(200).json(results);
  } catch (error) {
    console.error("Lỗi khi lấy bài viết:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Lấy bài viết theo ID
export const getBlogById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Không tìm thấy bài viết" });
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Bài viết không tồn tại" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error("Lỗi khi lấy bài viết:", error);
    res.status(500).json({ message: "Lỗi khi lấy bài viết", error });
  }
};

// Cập nhật bài viết
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, title, category, author, description, image } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!title || !category || !author || !description || !content) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc!" });
    }

    // Tìm bài viết hiện tại
    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      return res.status(404).json({ message: "Bài viết không tồn tại" });
    }

    // Cập nhật các trường khác
    existingBlog.title = title;
    existingBlog.category = category;
    existingBlog.author = author;
    existingBlog.description = description;
    existingBlog.content = content;

    // Cập nhật ảnh nếu có URL mới
    if (image) {
      existingBlog.image = image;
    }

    // Lưu bài viết đã cập nhật
    await existingBlog.save();

    return res.status(200).json(existingBlog);
  } catch (error) {
    console.error("Lỗi khi cập nhật bài viết:", error);
    return res.status(500).json({ message: "Lỗi khi cập nhật bài viết" });
  }
};

// Xóa bài viết
export const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Bài viết không tồn tại" });
    }
    res.status(200).json({ message: "Xóa bài viết thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa bài viết:", error);
    res.status(500).json({ message: "Lỗi khi xóa bài viết", error });
  }
};
