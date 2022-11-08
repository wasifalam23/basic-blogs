const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

router
  .route('/')
  .get(blogController.getAllBlog)
  .post(blogController.createBlog);

router
  .route('/:id')
  .get(blogController.getBlogById)
  .patch(blogController.updateBlog)
  .delete(blogController.deleteBlog);

module.exports = router;
