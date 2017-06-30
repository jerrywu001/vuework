<template>
	<div class="home">
		<h1>Express</h1>
		<ul class="loginStatus" v-if="username">
			<li>Welcome <b>{{ username }}</b></li>
			<li><router-link to="blogSend">发布博客</router-link></li>
			<li><router-link to="user">修改资料</router-link></li>
			<li><a href="javascript:;" @click="logout">退出</a></li>
		</ul>
		<ul class="loginStatus" v-if="!username">
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
        name: 'home',
        data() {
            return {
                username: ''
            };
        },
        methods: {
            logout() {
                let _this = this;
                axios.axios.get('/api/v1/logout').then(function(rsp) {
                    if (rsp.status === 200 && rsp.data.success) {
                        _this.username = '';
                        _this.$router.push({
                            path: '/login'
                        });
                    }
                });
            }
        },
        created() {
            let _this = this;
            axios.axios.get('/api/v1/login/check').then(function(rsp) {
                if (rsp.status === 200 && rsp.data.success) {
                    _this.username = rsp.data.username;
                }
            });
        }
    };

</script>

<style scoped>
    .home {
        width: 1000px;
        margin: 20px auto 0 auto;
    }

</style>
