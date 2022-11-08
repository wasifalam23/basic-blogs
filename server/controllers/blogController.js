const catchAsync = require('../utils/catchAsync');
const Blog = require('../models/blogModel');
const AppError = require('../utils/appError');

exports.getAllBlog = catchAsync(async (req, res, next) => {
  const blogs = await Blog.find();
  res.status(200).json({
    status: 'success',
    data: {
      results: blogs.length,
      blogs,
    },
  });
});

exports.getBlogById = catchAsync(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  console.log(blog);
  if (!blog) {
    return next(new AppError('No blog found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      blog,
    },
  });
});

exports.createBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      blog,
    },
  });
});

exports.updateBlog = catchAsync(async (req, res, next) => {
  const newBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!newBlog) {
    return next(new AppError('No blog found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      blog: newBlog,
    },
  });
});

exports.deleteBlog = catchAsync(async (req, res, next) => {
  await Blog.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: 'success',
    data: null,
  });
});
