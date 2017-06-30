var User = require('../lib/db').User;
var express = require('express');
var router = express.Router();

router.post('/register', function (req, res, next) {
    var data = req.body;
    var uname = data.username;
    var pwd = data.password;
    var head = 'http://7xkvpt.com1.z0.glb.clouddn.com/default.png';

    if (uname !== undefined && pwd !== undefined) {
        User.findOne({
			username: uname
		}, (err, doc) => {
            if (doc && Object.keys(doc).length) {
                res.json({
                    success: false,
                    msg: '用户名已存在！'
                });
            } else {
                var user = new User({
                    username: uname,
                    password: pwd,
                    head: data.head || head,
                    message: data.message || ''
                });
				
                user.save((err, row) => {
                    if (row && row.username) {
                        req.session.user = uname;
                        req.session.head = head;
                        res.json({
                            success: true,
                            msg: '注册成功！'
                        });
                    } else {
                        res.json({
                            success: false,
                            msg: '注册失败！'
                        });
                    }
                });
            }
        });
    } else {
        res.json({
            success: false,
            msg: '请填写必填项！'
        });
    }
});

module.exports = router;
