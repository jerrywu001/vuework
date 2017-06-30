var User = require('../lib/db').User;
var express = require('express');
var router = express.Router();

router.post('/login', function (req, res, next) {
    var data = req.body;
    var uname = data.username;
    var pwd = data.password;

    if (uname !== undefined && pwd !== undefined) {
        User.findOne({
            username: uname,
            password: pwd
        }, (err, doc) => {
            if (doc && Object.keys(doc).length) {
                req.session.user = uname;
                req.session.head = doc.head;
                res.json({
                    success: true,
                    msg: '登录成功！'
                });
            } else {
                res.json({
                    success: false,
                    msg: '用户名或密码错误！'
                });
            }
        });
    } else {
        res.json({
            success: false,
            msg: '请输入用户名或密码！'
        });
    }
});

router.get('/login/check', function (req, res, next) {
    if (!!req.session.user) {
        res.json({
            success: true,
            username: req.session.user
        });
    } else {
        res.json({
            success: false,
            msg: '用户未登录！'
        });
    }
});

router.get('/logout', function (req, res, next) {
    req.session.user = null;
    req.session.head = null;
    res.json({
        success: true,
        msg: '用户退出！'
    });
});

module.exports = router;
