const express = require('express');
const blogController = require('../controllers/blogController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(blogController.getAllBlog)
  .post(authController.protect, blogController.createBlog);

router
  .route('/:id')
  .get(blogController.getBlogById)
  .patch(authController.protect, blogController.updateBlog)
  .delete(blogController.deleteBlog);

module.exports = router;
