var express = require('express');
var qiniu = require('qiniu');
var router = express.Router();

//获取上传token处理
router.get('/uptoken', function (req, res, next) {
	var accessKey = 'OzeBqlS0Gy3mD-c2EBjr-aiMWFg4gAp0UwNl2gQD';
	var secretKey = 'DRJVRKuTZsiyzVcZPT0W_gSfM5HPtzjL5NpUfkxU';
	var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
	var putPolicy = new qiniu.rs.PutPolicy({
		scope: 'progress'
	});
	var token = putPolicy.uploadToken(mac);
	res.header("Cache-Control", "max-age=0, private, must-revalidate");
	res.header("Pragma", "no-cache");
	res.header("Expires", 0);
	if (token) {
		res.json({
			uptoken: token
		});
	} else {
		res.json({
			uptoken: ''
		});
	}
});

module.exports = router;
