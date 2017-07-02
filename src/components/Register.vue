<template>
	<div class="login">
		<form class="form-horizontal" style="width: 800px;" name="regF">
			<legend style="padding-bottom: 15px;">用户注册</legend>
			<div class="form-group">
				<label class="col-lg-2 control-label">用户名：</label>
				<div class="col-lg-10">
					<input type="text" class="form-control" v-model="username" autofocus autocomplete required/>
					<p class="help-block">你的账户名称，用于登录和显示。</p>
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-2 control-label">口令：</label>
				<div class="col-lg-10">
					<input type="password" class="form-control" v-model="password" required>
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-2 control-label">重复输入口令：</label>
				<div class="col-lg-10">
					<input type="password" class="form-control" v-model="passwordRepeat" required>
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-2 control-label">自我描述：</label>
				<div class="col-lg-10">
					<textarea class="form-control" v-model="message" style="width: 662px;height: 150px;" required></textarea>
				</div>
			</div>
			<div class="form-group">
				<div class="col-lg-offset-2 col-lg-10">
					<button class="btn btn-primary" type="button" @click="registerUser" :disabled="invalid">
						<strong><i class="fa fa-check"></i>&nbsp;注册</strong>
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
		name: 'register',
		data() {
			return {
                invalid: false,
                username: '',
                password: '',
                passwordRepeat: '',
                message: ''
			};
		},
		methods: {
            registerUser() {
                console.log(axios);
                let _this = this;
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
                if (!_this.passwordRepeat) {
					_this.autoError($('#tips'), '请再次输入密码！');
                    return false;
                }
                if (_this.password !== _this.passwordRepeat) {
					_this.autoError($('#tips'), '两次输入密码不一致！');
                    return false;
                }
                _this.invalid = true;
				_this.showLoding();
                axios.axios.post('/api/v1/register', {
                    username: _this.username,
                    password: _this.password,
                    message: _this.message
                }).then(function(rsp) {
                    _this.invalid = false;
					_this.hideLoding();
                    if (rsp.status === 200) {
                        if (rsp.data.success) {
                            _this.username = '';
                            _this.password = '';
                            _this.passwordRepeat = '';
                            _this.message = '';
                            _this.$router.push({
                                path: '/'
                            });
                        } else {
							_this.autoError($('#tips'), rsp.data.msg);
                        }
                    } else {
						_this.autoError($('#tips'), '网络错误，请稍后再试！');
                    }
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
