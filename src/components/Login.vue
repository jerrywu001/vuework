<template>
	<div class="login">
		<div class="alert alert-danger alert-dismissable">
			<button aria-hidden="true" data-dismiss="alert" class="close" type="button">x</button>
			<strong><i class="fa fa-times"></i>&nbsp;<b>dfads</b></strong>
		</div>
		<form class="form-horizontal" style="width: 600px;" name="loginF">
			<legend style="padding-bottom: 15px;">用户登录</legend>
			<div class="form-group">
				<label class="col-lg-2 control-label">用户名：</label>
				<div class="col-lg-10">
					<input type="text" id="username" ng-model="login.username" autofocus autocomplete class="form-control" placeholder="用户名" required/>
					<span class="help-block m-b-none">你的账户名称，用于登录和显示。</span>
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-2 control-label">口令：</label>
				<div class="col-lg-10">
					<input type="password" class="form-control" id="password" ng-model="login.password" placeholder="密码" required/>
				</div>
			</div>
			<div class="form-group">
				<div class="col-lg-offset-2 col-lg-10">
					<button class="btn btn-primary" type="button" @click="login();" ng-disabled="loginF.$invalid">
						<strong><i class="fa fa-check"></i>&nbsp;登录</strong>
					</button>
					<button type="button" onclick="javascript:history.back();" class="btn btn-default">
						<strong><i class="fa fa-arrow-left"></i>&nbsp;返回</strong>
					</button>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
	export default {
		name: 'hello',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App'
			};
		},
		methods: {
			login() {
				console.log(axios);
				console.log(_);
				axios.axios.post('/api/v1/login', {
                    username: 'linda',
                    password: '123456'
                }).then(function(rsp) {
                    console.log(rsp);
                });
			}
		}
	};

</script>

<style scoped>
	.login {
		width: 1000px;
		margin: 20px auto 0 auto;
	}

</style>
