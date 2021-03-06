var exports;
var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'test');
// mongoose.connect('mongodb://tester:123456@127.0.0.1:27017/test?authSource=admin');
db.on('error', console.error.bind(console, 'mongodb 连接错误！'));
db.once('open', () => {
	console.log('mongodb 连接成功！');
});

exports.User = db.model('user', new mongoose.Schema({
	username: String,
	password: String,
	head: String,
	message: String,
	role: {
		type: Number,
		default: 0
	}
}));

exports.Blog = db.model('blog', new mongoose.Schema({
	title: String,
	nick: String,
	content: String
}));

exports.Review = db.model('review', new mongoose.Schema({
	title: String,
	nick: String,
	head: String,
	time: Date,
	content: String,
	replyTo: String,
	quoteCntent: String
}));

module.exports = exports;
