const Blog = require('../models/blogModel');

exports.getAllBlog = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      status: 'success',
      data: {
        results: blogs.length,
        blogs,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      err,
    });
  }
};

exports.createBlog = async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body);

    res.status(201).json({
      status: 'success',
      blog,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
};
