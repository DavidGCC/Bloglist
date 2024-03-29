const path = require('path');

const express = require('express');
const blogRouter = require('./controllers/blogs');


const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/loginRouter');
const testRouter = require('./controllers/testRouter');

const mongoUrl = config.MONGODB_URL;
mongoose
    .connect(mongoUrl, {
        useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
    })
    .then((res) => {
        logger.info('Connected to MongoDB');
    })
    .catch((err) => {
        logger.error('Couldn\'t connect to MongoDB', err);
    });

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use(middleware.requestLogger);

app.use(express.static('build'));


if (process.env.NODE_ENV === 'test') {
    app.use('/api/test', testRouter);
}

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.get('/healthcheck', (req, res) => res.send('works'));

// FOR CLIENT-SIDE ROUTING
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
