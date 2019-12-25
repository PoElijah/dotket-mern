const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const fileRouter = require('./routes/files');
const productRouter = require('./routes/products');


const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({
	limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/api', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/upload', fileRouter);
app.use('/api/products', productRouter);


module.exports = app;
