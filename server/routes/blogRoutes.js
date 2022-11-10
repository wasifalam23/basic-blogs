const express = require('express');
const commentRoutes = require('../routes/commentRoutes');
const blogController = require('../controllers/blogController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use('/:blogId/comments', commentRoutes);

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
