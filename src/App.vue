<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app'
	}

</script>

<style>
	body {
		font-family: "open sans", "Helvetica Neue", "Helvetica", "Arial", "sans-serif", "Microsoft YaHei";
		background-color: #fff;
		color: #333;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	/** tips **/

	#tips.tips .info {
		background-color: #f9eec1;
		border: 1px solid #1386bf;
		padding: 0 24px;
		height: 24px;
		border-radius: 3px;
		line-height: 24px;
		color: #333;
	}

	#tips.tips {
		position: fixed;
		top: 50px;
		left: 50%;
		z-index: 3000;
		text-align: center;
		display: none;
		width: 500px;
		height: 26px;
		margin-left: -250px;
	}

	#tips .alert {
		padding: 8px 14px 8px 14px;
		margin-bottom: 18px;
		color: #c09853;
		text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
		background-color: #fcf8e3;
		border: 1px solid #fbeed5;
		-webkit-border-radius: 4px;
		-moz-border-radius: 4px;
		border-radius: 4px;
		*line-height: 35px;
		*height: 35px;
		/** fujia **/
		position: fixed;
		top: 40%;
		left: 50%;
		margin-top: -30px;
		margin-left: -60px;
	}

	#tips .alert-error {
		color: #b94a48;
		background-color: #f2dede;
		border-color: #eed3d7;
	}
	/** tips end **/

	.containBox {
		margin: 20px 80px;
	}

	.loginStatus {
		list-style: none;
		margin: 0;
		padding: 0;
		overflow: hidden;
	}

	.loginStatus li {
		float: left;
		font-size: 14px;
		margin-right: 8px;
	}

	.blogList {
		clear: both;
		margin: 13px 0;
		border: 1px #ddd solid;
		width: 600px;
		padding: 10px;
	}

	.blogInfo {
		border: 1px #ddd solid;
		width: 1000px;
		margin: 10px auto;
		min-height: 700px;
		padding: 15px 20px;
		overflow: hidden;
	}

	.blogTitle {
		font-family: '微软雅黑', 'Microsoft YaHei';
		border-bottom: 1px #ddd solid;
		padding-bottom: 13px;
	}

	.blogTitle h1 {
		font-weight: normal;
		font-size: 28px;
	}

	.blogTitle .titleWarp {}

	.blogTitle .titleWarp span {
		margin-right: 20px;
		font-size: 14px;
	}

	.blogTitle .titleWarp span label {
		display: inline-block;
		font-weight: normal;
	}

	.blogDetail {
		padding-top: 15px;
	}

	.gloading {
		background: url('http://7xkvpt.com1.z0.glb.clouddn.com/gloading.gif') no-repeat center center transparent;
		height: 100px;
		width: 200px;
		position: fixed;
		top: 50%;
		left: 50%;
		margin-top: -50px;
		margin-left: -100px;
	}

	.edui-editor-body {
		max-height: 500px;
		overflow-y: auto;
	}

	.edui-body-container img {
		max-width: 600px;
	}

	.blogDetail img {
		max-width: 850px;
	}

	.reviewWarp {
		position: relative;
	}

	.reviewWarp h3 {
		font-size: 14px;
		font-weight: bold;
		padding-bottom: 15px;
		border-bottom: 1px #ddd solid;
		margin-bottom: 20px;
	}

	.reviewWarp .text-muted {
		position: relative;
		top: 3px;
	}

	.reviewWarp .input-group {
		margin-bottom: 20px;
	}

	.reviewWarp .rwPage {
		margin-top: 20px;
		text-align: right;
	}

	.reviewWarp .reply {
		margin-top: 12px;
	}

	.reviewWarp .well {
		font-family: '微软雅黑', 'Microsoft YaHei';
		margin-top: 8px;
	}

	.table-pic {
		width: 140px;
		height: 140px;
		border: 1px solid #dfdfdf;
		background-color: #fff;
		overflow: hidden;
		position: relative;
	}

	.table-picboxW {
		margin: 5px;
		overflow: hidden;
		height: 130px;
	}

	.table-picbox {
		width: 100%;
		height: 100%;
		line-height: 100%;
		text-align: center;
		display: table;
	}

	.table-picbox span {
		display: table-cell;
		vertical-align: middle;
		width: 100%;
		height: 100%;
	}

	*+html .table-picbox span {
		position: absolute;
		top: 50%;
		width: 100%;
		text-align: center;
		height: auto;
	}

	*+html .table-picbox span img {
		position: relative;
		top: -50%;
		left: -50%;
	}

	.table-picbox:hover .table-picevent,
	.table-picbox:hover input {
		display: block;
	}

	.table-picbox a:link,
	.table-picbox a:visited {
		color: #fff;
	}

	.table-picevent {
		display: none;
		position: absolute;
		bottom: 5px;
		*bottom: 0;
		left: 5px;
		width: 130px;
		height: 27px;
		text-align: center;
		background: #000;
		line-height: 27px;
		cursor: pointer;
		overflow: hidden;
		color: #fff;
		text-decoration: none;
		opacity: .4;
		filter: alpha(opacity=40);
	}

	.table-picevent:hover {
		text-decoration: none;
	}

	.table-picevent input {
		display: none;
		filter: alpha(opacity=0);
		opacity: 0;
		position: absolute;
		right: 0;
		right: 32px\9;
		bottom: 0;
		width: 130px;
		height: 27px;
		cursor: pointer;
	}
	/*头像上传 样式*/

	.table-pic {
		width: 142px;
	}

	.table-pic .webuploader-container {
		position: absolute;
		bottom: 3px;
		left: 3px;
		background: #333;
		width: 134px;
		height: 28px;
		line-height: 28px;
		color: #fff;
		opacity: 0;
		cursor: pointer;
		filter: alpha(opacity=50);
		z-index: 260;
	}

	.table-pic .webuploader-container label {
		position: relative;
	}

	.table-pic:hover .webuploader-container {
		opacity: .5;
		filter: alpha(opacity=50);
	}

	.table-pic .webuploader-container input[type=file],
	input.webuploader-element-invisible {
		opacity: 0;
		cursor: pointer;
		width: 100%;
	}

	.img-circle {
		max-width: 60px;
		margin: 0 8px 0 0;
	}

	.desc-field {
		width: 800px;
		height: 450px;
		line-height: 450px;
		border: 1px #D8D8D8 dashed;
		background-color: #FAFAFA;
		text-align: center;
		font-size: 18px;
		color: #666;
		letter-spacing: 8px;
	}

</style>
