var express = require('express');
var session = require('express-session');
var sessionstore = require('sessionstore');
var cookieParser = require('cookie-parser');
var webpack = require('webpack');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

/** session **/
app.use(session({
	secret : 'fens.me',
	cookie: { maxAge: 1800000 },
    store: sessionstore.createSessionStore()
}));

/** 跨域 **/
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    //预检请求使用
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
});

routes(app);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
