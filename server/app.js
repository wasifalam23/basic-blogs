const express = require('express');
const morgan = require('morgan');
const blogRouter = require('./routes/blogRoutes');

const app = express();
app.use(express.json());

app.use(morgan('dev'));

app.use('/api/v1/blogs', blogRouter);

module.exports = app;
