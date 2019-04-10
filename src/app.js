require('dotenv').config();

import createError from 'http-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan';
import indexRouter from './routes/index'

import v1Route from './routes/v1'

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', indexRouter);

app.use('/v1', v1Route)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
let apiError = err

if(!err.status){
  apiError = createError(err)
}

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log(apiError.status)
  console.log(apiError.message)

  return res.status(apiError.status)
            .json({message: apiError.message})
  /*res.status(err.status || 500);
  res.render('error');*/
});

// bin/www 를 그대로 사용하기 위해서 예외적으로 commonJs 문법을 적용
module.exports = app;
