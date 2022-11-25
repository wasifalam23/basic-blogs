const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const globalErrorHandler = require('./controllers/errorController');
const blogRouter = require('./routes/blogRoutes');
const userRouter = require('./routes/userRoutes');
const commentRouter = require('./routes/commentRoutes');
const AppError = require('./utils/appError');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'uploads')));

app.use(morgan('dev'));

app.use('/api/v1/blogs', blogRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/comments', commentRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
