var express = require('express');
// node路径解析的核心模块
var path = require('path');
// 处理左上角小图标使用的
var favicon = require('serve-favicon');
// 记录日志的工具
var logger = require('morgan');
// 解析cookie的中间件
var cookieParser = require('cookie-parser');
// 解析post内容的中间件
var bodyParser = require('body-parser');
//引入登录模块所需的中间件
var cookieSession = require('cookie-session')
// 引入路由配置
var index = require('./routes/index');
var user = require('./routes/user');
var position = require('./routes/position');
var candidate = require('./routes/candidate');

var app = express();
//__dirname全局变量，当前文件所在地址的绝对路径
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  name: 'session',
  secret: 'yang',
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use('/', index);
app.use('/api/user', user);
app.use('/api/position', position);
app.use('/api/candidate', candidate);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
