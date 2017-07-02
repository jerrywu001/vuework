import Vue from 'vue';
import App from './App';
import router from './router';

router.beforeEach((to, from, next) => {
	if (to.matched.some(to => {
			return to.meta.requiresAuth == undefined ? true : to.meta.requiresAuth
		})) {
		axios.axios.get('/api/v1/login/check').then(function (rsp) {
			if (rsp.status === 200 && rsp.data.success) {
				next();
			} else {
				next({
					path: '/login',
					query: {
						next_url: decodeURIComponent(to.path)
					}
				});
			}
		});
	} else {
		next();
	}
});

Vue.config.productionTip = false;

Vue.prototype.showLoding = function () {
	$("body").append("<div class='gloading'></div>");
};

Vue.prototype.hideLoding = function () {
	$("body").find(".gloading").remove();
};

Vue.prototype.autoError = function (obj, msg) {
	var dialog = "<span class='alert alert-error'>" + msg + "</span>";
	obj.html(dialog);
	obj.show();
	setTimeout(function () {
		obj.fadeOut("slow");
	}, 1000);
};

Vue.prototype.autoInfo = function (obj, msg) {
	var dialog = "<span class='info'>" + msg + "</span>";
	obj.html(dialog);
	$("#global-loading").hide();
	obj.show();
	setTimeout(function () {
		obj.fadeOut("slow");
	}, 1000);
};



Vue.prototype.trim = function (str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
};

Vue.prototype.isEmpty = function (str) {
	var length = str.replace(/(^\s*)|(\s*$)/g, "").length;
	if (length == 1 && str.charCodeAt(0) == '8203') { //处理 换行控制符
		length = 0;
	}
	return length == 0;
};

//时间格式化
Vue.prototype.format = function (date, fmt) { //author: meizz 
	var o = {
		"M+": date.getMonth() + 1, //月份 
		"d+": date.getDate(), //日 
		"h+": date.getHours(), //小时 
		"m+": date.getMinutes(), //分 
		"s+": date.getSeconds(), //秒 
		"q+": Math.floor((date.getMonth() + 3) / 3), //季度 
		"S": date.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

Vue.prototype.addStyleLink = function (path, id) {
	if (!!document.getElementById(id)) {
		return;
	}
	var link = document.createElement('link');
	link.type = 'text/css';
	link.rel = 'stylesheet';
	link.href = path;
	link.id = id;
	document.getElementsByTagName("head")[0].appendChild(link);
};

Vue.prototype.addScriptLink = function (path, id) {
	if (!!document.getElementById(id)) {
		return;
	}
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = path;
	script.id = id;
	document.getElementsByTagName("head")[0].appendChild(script);
};

Vue.prototype.isParent = function (obj, parentObj) {
	if (!parentObj)
		return false;
	while (obj != undefined && obj != null && !!obj.tagName && obj.tagName.toUpperCase() != 'BODY') {
		if (obj == parentObj) {
			return true;
		}
		obj = obj.parentNode;
	}
	return false;
};

//"yyyy-MM-dd hh:mm:ss" 转化为 DateTime
Vue.prototype.dateStrSplitLineToDate = function (dateStr) {
	if (!!dateStr) {
		return new Date(dateStr.replace(/-/g, '/'));
	}
};

Vue.prototype.decodeHTML = function (s) {
	return s.replace(/&amp;/g, '\&')
		.replace(/&lt;/g, '\<')
		.replace(/&gt;/g, '\>')
		.replace(/&#039;/g, "\'")
		.replace(/&quot;/g, '\"');
}

//将字符串转化为用于显示的字符串
Vue.prototype.htmlTagEscape = function (s) {
	if (!!s) {
		return s.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/'/g, '&#039;')
			.replace(/"/g, '&quot;');
	} else {
		return '';
	}
};

new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {
		App
	}
});
