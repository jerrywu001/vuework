<template>
	<div class="blogsend">
		<div class="form-horizontal" style="width: 600px;">
			<legend style="padding-bottom: 15px;">发布博客</legend>
			<div class="form-group">
				<label class="col-lg-2 control-label">标题：</label>
				<div class="col-lg-10">
					<input type="text" class="form-control" v-model="title" style="width: 700px;" autofocus/>
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-2 control-label">采集图片：</label>
				<div class="col-lg-10">
					<select class="form-control m-b" ng-model="vm.code" ng-options="img.code as img.label for img in vm.iSavePic" style="width: 100px;">
				</select>
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-2 control-label">内容：</label>
				<div class="col-lg-10">
					<div class="desc-field" @click="initUeditor($event);"> 点击编辑</div>
					<script type="text/plain" id="desc" style="width:800px;height:400px;"></script>
				</div>
			</div>
			<div class="form-group">
				<div class="col-lg-offset-2 col-lg-10">
					<button class="btn btn-primary" type="button" ng-click="submit();"><strong><i class="fa fa-check"></i>&nbsp;发布</strong></button>
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
		name: 'blogsend',
		data() {
			return {
				invalid: false,
				success: false,
				title: ''
			};
		},
		methods: {
			initUeditor(e) {
				let _this = this;
				window.UMEDITOR_HOME_URL = '/src/assets/js/umeditor/';
				_this.addStyleLink(UMEDITOR_HOME_URL + 'themes/default/css/umeditor.css', 'umeditor');
				$LAB
					.script(UMEDITOR_HOME_URL + 'umeditor.config.js')
					.script(UMEDITOR_HOME_URL + 'umeditor.min.js')
					.script(UMEDITOR_HOME_URL + 'lang/zh-cn/zh-cn.js')
					.wait(function() { //注意 重新改了 UMEDITOR_CONFIG 133行
						e.target.style.display = 'none';
						var um = UM.getEditor('desc');
						//全屏bug
						$(document).off('click', '.edui-btn-fullscreen');
						$(document).on('click', '.edui-btn-fullscreen', function() {
							if ($(this).hasClass('edui-active')) {
								$('.edui-editor-body').css('max-height', $(window).height() - $('.edui-toolbar').height() + 'px');
							} else {
								$('.edui-editor-body').css('max-height', '500px');
							}
						});
					});
			}
		}
	};

</script>

<style scoped>
	.blogsend {
		width: 1000px;
		margin: 20px auto 0 auto;
	}

</style>
