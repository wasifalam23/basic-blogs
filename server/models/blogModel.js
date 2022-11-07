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
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
