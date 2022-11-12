const multer = require('multer');
const sharp = require('sharp');
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

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images', 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadBlogImage = upload.single('image');

exports.resizeBlogImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `blog-${Date.now()}-${Math.round(
    Math.random() * 1e9
  )}.jpeg`;

  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`uploads/blogs/${req.file.filename}`);

  next();
});

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
  req.body.image = req.file.filename;

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
    image: req.file.filename,
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