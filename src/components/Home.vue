<template>
	<div class="home">
		<h1>Express</h1>
		<ul class="loginStatus" ng-show="user">
			<li>Welcome <b ng-bind="user"></b></li>
			<li><router-link to="blogSend">发布博客</router-link></li>
			<li><router-link to="user">修改资料</router-link></li>
			<li><router-link to="logout">退出</router-link></li>
		</ul>
		<ul class="loginStatus" ng-hide="user">
			<li>Welcome!</li>
			<li><router-link to="login">登录</router-link></li>
			<li><router-link to="register">注册</router-link></li>
		</ul>
		<div class="blogList">
			<h5 style="font-size: 14px; font-weight: bold; border-bottom: 1px #ddd solid; padding-bottom: 10px;">博客列表</h5>
			<div class="blogListWarp">
				<p ng-repeat="l in list">
					<a target="_blank" title="asdfasdf" href="/u_blogInfo/244244.html">asdfasdfasdfs</a>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App'
			};
		}
	};

</script>

<style scoped>
	.home {
		width: 1000px;
		margin: 20px auto 0 auto;
	}

</style>
