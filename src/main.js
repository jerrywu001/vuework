// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
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

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {
		App
	}
});
