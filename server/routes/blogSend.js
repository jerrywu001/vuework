var User = require('../lib/db').User;
var express = require('express');
var router = express.Router();

router.get('/user', function (req, res, next) {
	var uname = req.session.user;
	var data = req.body;

	if (uname) {
		User.findOne({
			username: uname
		}, (err, doc) => {
			if (doc && Object.keys(doc).length) {
				res.json({
					success: true,
					data: doc
				});
			} else {
				res.json({
					success: false,
					msg: '未找到用户！'
				});
			}
		});
	} else {
		res.json({
			success: false,
			msg: '用户未登录！'
		});
	}
});

router.put('/user/update', function (req, res, next) {
	var data = req.body;
	console.log(data);
	var uname = data.username;
	var pwd = data.password;
	var head = data.head;
	var message = data.message;

	if (uname && pwd && head) {
		User.findOneAndUpdate({
			username: uname
		}, {
			$set: {
				username: uname,
				password: pwd,
				head: head,
				message: message
			}
		}, (err, doc) => {
			console.log(doc);
			if (doc && Object.keys(doc).length) {
				res.json({
					success: true,
					data: doc
				});
			} else {
				res.json({
					success: false,
					msg: '更新失败！'
				});
			}
		});
	} else {
		res.json({
			success: false,
			msg: '请填写完整信息！'
		});
	}
});

module.exports = router;
