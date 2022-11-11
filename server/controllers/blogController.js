const catchAsync = require('../utils/catchAsync');
const Blog = require('../models/blogModel');
const AppError = require('../utils/appError');

const checkPermission = async (loggedInUserId, blogId, next) => {
  const blog = await Blog.findById(blogId);

  if (!blog) {
    return next(new AppError('No blog found with that ID', 404));
  }

  const authorId = blog.author.id;
  const permissionGranted = loggedInUserId === authorId ? blogId : undefined;

  return permissionGranted;
};

exports.getAllBlog = catchAsync(async (req, res, next) => {
  const blogs = await Blog.find().populate({
    path: 'comments',
  });

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
  req.body.author = req.user.id;

  const blog = await Blog.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      blog,
    },
  });
});

exports.updateBlog = catchAsync(async (req, res, next) => {
  const contactId = await checkPermission(req.user.id, req.params.id, next);

  if (!contactId) {
    return next(
      new AppError('You do not have permission to perform this action', 401)
    );
  }

  const updateValues = {
    title: req.body.title,
    description: req.body.description,
  };

  const newBlog = await Blog.findByIdAndUpdate(contactId, updateValues, {
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
  const contactId = await checkPermission(req.user.id, req.params.id, next);

  if (!contactId) {
    return next(
      new AppError('You do not have permission to perform this action', 401)
    );
  }

  await Blog.findByIdAndDelete(contactId);

  res.status(200).json({
    status: 'success',
    data: null,
  });
});
