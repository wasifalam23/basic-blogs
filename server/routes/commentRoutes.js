const express = require('express');
const authController = require('../controllers/authController');
const commentController = require('../controllers/commentController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(commentController.getAllComments)
  .post(authController.protect, commentController.createComment);

router
  .route('/:id')
  .patch(authController.protect, commentController.updateComment)
  .delete(authController.protect, commentController.deleteComment);

module.exports = router;
