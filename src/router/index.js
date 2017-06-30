import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import Register from '@/components/Register';
import BlogSend from '@/components/BlogSend';
import User from '@/components/User';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home,
			meta: {
				requiresAuth: false
			}
    	},
		{
			path: '/login',
			name: 'Login',
			component: Login,
			meta: {
				requiresAuth: false
			}
    	},
		{
			path: '/register',
			name: 'Register',
			component: Register,
			meta: {
				requiresAuth: false
			}
    	},
		{
			path: '/blogSend',
			name: 'BlogSend',
			component: BlogSend
    	},
		{
			path: '/user',
			name: 'User',
			component: User
    	}
  	]
});
