<template>
	<div class="user">
		<div class="form-horizontal" style="width: 850px;">
			<legend style="padding-bottom: 15px;">用户资料修改</legend>
			<div class="form-group">
				<label class="col-lg-2 control-label">用户名：</label>
				<div class="col-lg-10">
					<input type="text" class="form-control" id="username" v-model="user.username" disabled/>
					<p class="help-block">你的账户名称，不可二次修改。</p>
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-2 control-label">头像：</label>
				<div class="col-lg-10">
					<div class="table-pic">
						<div class="table-picboxW">
							<div class="table-picbox">
								<span><img :src="user.head" alt="头像" style="width:130px;height:130px;"/></span>
								<div id="avatarPicker">选择头像</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-2 control-label">新口令：</label>
				<div class="col-lg-10">
					<input type="password" class="form-control" v-model="user.password" />
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-2 control-label">重复输入新口令：</label>
				<div class="col-lg-10">
					<input type="password" class="form-control" v-model="passwordRepeat" />
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-2 control-label">自我描述：</label>
				<div class="col-lg-10">
					<textarea class="form-control" v-model="user.message" style="width: 703px;height: 150px;"></textarea>
				</div>
			</div>
			<div class="form-group">
				<div class="col-lg-offset-2 col-lg-10">
					<button class="btn btn-primary" type="button" @click="submit();" :disabled="invalid">
					<strong><i class="fa fa-check"></i>&nbsp;保存</strong>
				</button>
					<button type="button" onclick="javascript:history.back();" class="btn btn-default">
					<strong><i class="fa fa-arrow-left"></i>&nbsp;返回</strong>
				</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'user',
		data() {
			return {
				invalid: false,
				success: false,
				user: {
					head: '',
					username: '',
					password: '',
					message: ''
				},
				passwordRepeat: ''
			};
		},
		methods: {
			submit() {
				console.log(axios);
				let _this = this;
				if (_this.invalid) {
					return false;
				}
				if (!_this.user.username) {
					_this.autoError($('#tips'), '请输入用户名！');
					return false;
				}
				if (!_this.user.password) {
					_this.autoError($('#tips'), '请输入密码！');
					return false;
				}
				if (!_this.passwordRepeat) {
					_this.autoError($('#tips'), '请再次输入密码！');
					return false;
				}
				if (_this.user.password !== _this.passwordRepeat) {
					_this.autoError($('#tips'), '两次输入密码不一致！');
					return false;
				}
				_this.invalid = true;
				_this.success = false;
				_this.showLoding();
				axios.axios.put('/api/v1/user/update', _this.user).then(function(rsp) {
					_this.invalid = false;
					_this.hideLoding();
					if (rsp.status === 200) {
						if (rsp.data.success) {
							_this.success = true;
							_this.autoInfo($('#tips'), '更新成功！');
						} else {
							_this.autoError($('#tips'), rsp.data.msg);
						}
					} else {
						_this.autoError($('#tips'), '网络错误，请稍后再试！');
					}
				});
			},
			uploaderFile(token, id, name, key, callback) {
				let _this = this;
				setTimeout(function() {
					if ($(id).find('.webuploader-pick').length === 0) {
						var uploader = WebUploader.create({
							auto: true,
							swf: '../assets/js/Uploader.swf',
							server: 'http://upload.qiniu.com?token=' + token,
							pick: id,
							accept: {
								title: 'Images',
								extensions: 'gif,jpg,jpeg,bmp,png',
								mimeTypes: 'image/*'
							},
							compress: {
								width: 640,
								quality: 80,
								allowMagnify: false,
								crop: false,
								preserveHeaders: true,
								noCompressIfLarger: false,
								compressSize: 100 * 1024
							}
						});
						uploader.on('fileQueued', function(file) {
							_this.showLoding();
						});

						uploader.on('uploadProgress', function(file, percentage) {});

						uploader.on('uploadSuccess', function(file, res) {
							_this.hideLoding();
							if (!!callback) callback(res, name, key);
						});

						uploader.on('uploadError', function(file) {
							_this.hideLoding();
							_this.autoError($('#tips'), '上传失败！');
						});

						uploader.on('uploadComplete', function(file) {
							_this.hideLoding();
						});
					}
				}, 370);
			}
		},
		created() {
			let _this = this;
			axios.axios.get('/api/v1/user').then(function(rsp) {
				if (rsp.status === 200 && rsp.data.success) {
					_this.user = rsp.data.data;
					_this.passwordRepeat = _this.user.password;
				} else {
					_this.autoError($('#tips'), '获取用户信息失败！');
				}
			});
		},
		mounted() {
			let _this = this;
			_this.success = false;
			axios.axios.get('/api/v1/uptoken').then(function(rsp) {
				if (rsp.status === 200 && rsp.data.uptoken) {
					_this.uploaderFile(rsp.data.uptoken, '#avatarPicker', 'user', 'avatar', function(res, name, key) {
						if (!!name && !!key) {
							_this.user.head = 'http://7xkvpt.com1.z0.glb.clouddn.com/' + res.key;
							_this.success = true;
							_this.autoInfo($('#tips'), '上传成功！');
						}
						if (!!$('.bootbox-close-button').length) $('.bootbox-close-button').trigger('click');
					});
				}
			});
		}
	};

</script>

<style scoped>
	.user {
		width: 1000px;
		margin: 20px auto 0 auto;
	}

</style>
