const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'A blog must have a title'],
  },

  description: {
    type: String,
    trim: true,
    required: [true, 'A blog must have some description'],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A blog must belong to an author'],
  },
});

blogSchema.pre(/^find/, function (next) {
  this.populate({ path: 'author', select: '-__v' });
  next();
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
