<template>
	<div class="login">
		<form class="form-horizontal" style="width: 600px;" name="loginF">
			<legend style="padding-bottom: 15px;">用户登录</legend>
			<div class="form-group">
				<label class="col-lg-2 control-label">用户名：</label>
				<div class="col-lg-10">
					<input type="text" v-model="username" autofocus autocomplete class="form-control" placeholder="用户名" required/>
					<span class="help-block m-b-none">你的账户名称，用于登录和显示。</span>
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-2 control-label">口令：</label>
				<div class="col-lg-10">
					<input type="password" class="form-control" v-model="password" placeholder="密码" required/>
				</div>
			</div>
			<div class="form-group">
				<div class="col-lg-offset-2 col-lg-10">
					<button class="btn btn-primary" type="button" @click="login" :disabled="invalid">
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
		name: 'login',
		data() {
			return {
				invalid: false,
				username: '',
				password: ''
			};
		},
		methods: {
			login() {
				console.log(axios);
				let _this = this;
				let query = this.$route.query;
				let next_url = query && query.next_url ? query.next_url : '/';

				if (_this.invalid) {
					return false;
				}
				if (!_this.username) {
					_this.autoError($('#tips'), '请输入用户名！');
					return false;
				}
				if (!_this.password) {
					_this.autoError($('#tips'), '请输入密码！');
					return false;
				}
				_this.invalid = true;
				_this.showLoding();
				axios.axios.post('/api/v1/login', {
					username: _this.username,
					password: _this.password
				}).then(function(rsp) {
					_this.hideLoding();
					_this.invalid = false;
					if (rsp.status === 200) {
						if (rsp.data.success) {
							_this.msg = '';
							_this.username = '';
							_this.password = '';
							_this.$router.push({
								path: decodeURIComponent(next_url)
							});
						} else {
							_this.autoError($('#tips'), rsp.data.msg);
						}
					} else {
						_this.autoError($('#tips'), '网络错误，请稍后再试！');
					}
				});
			}
		},
		created() {
			let _this = this;
			axios.axios.get('/api/v1/login/check').then(function(rsp) {
				if (rsp.status === 200 && rsp.data.success) {
					_this.$router.push({
						path: '/'
					});
				}
			});
		}
	};

</script>

<style scoped>
	.login {
		width: 600px;
		margin: 20px auto 0 auto;
	}

</style>
