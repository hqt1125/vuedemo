<template>
	<div id="tmpl">
		<!--轮播图-->
		<silder :imgs='lunbo'></silder>
		<!--九宫格-->
		<div class="mui-content">
			<ul class="mui-table-view mui-grid-view mui-grid-9">
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<router-link to="/news/newslist">
						<span class="mui-icon mui-icon-home"></span>
						<div class="mui-media-body">新闻资讯</div>
					</router-link>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<router-link to="/photo/photolist">
						<span class="mui-icon mui-icon-email"></span>
						<div class="mui-media-body">图片分享</div>
					</router-link>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<router-link to="/goods/goodslist">
						<span class="mui-icon mui-icon-chatbubble"></span>
						<div class="mui-media-body">商品购买</div>
					</router-link>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<router-link to="/feedback">
						<span class="mui-icon mui-icon-location"></span>
						<div class="mui-media-body">留言板</div>
					</router-link>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<router-link to="/vide">
						<span class="mui-icon mui-icon-search"></span>
						<div class="mui-media-body">视频专区</div>
					</router-link>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<router-link to="/callme">
						<span class="mui-icon mui-icon-phone"></span>
						<div class="mui-media-body">联系我们</div>
					</router-link>
				</li>
			</ul>
		</div>

	</div>

</template>

<script>
	import { Toast } from 'mint-ui';
	import common from '../kits/common.js';
	import silder from './subcom/silder.vue';
	export default {
		components:{
			silder
		},
		data() {
			return {
				lunbo: ''
			}
		},
		created() {
			this.getimgs();
		},
		methods: {
			getimgs() {
				var urls = common.apidomain+'/api/gitlunbo';
				this.$http.get(urls).then(function(res) {
					var data = res.body;
					if(data.status != 0) {
						Toast(data.manage);
						return
					} else {
						this.lunbo = data.list;
						return
					}

				})

			}
		}
	}
</script>

<style scoped>
	.mint-swipe {
		height: 300px;
	}
	
	.mint-swipe-item {
		width: 100%;
		height: 100%;
	}
	
	.mint-swipe-item img {
		width: 100%;
		height: 100%;
	}
	.mui-content{
		background-color: #fff;
	}
	.mui-content ul{
		background-color: #fff;
	}
	.mui-grid-view.mui-grid-9 .mui-table-view-cell{
		border: 0;
	}
	.mui-grid-view.mui-grid-9{
		border: 0;
	}
	.mui-icon-home:before,.mui-icon-email:before,.mui-icon-chatbubble:before,.mui-icon-location:before,.mui-icon-search:before,.mui-icon-phone:before{
		content: '';
		display: inline-block;
		width: 50px;
		height: 50px;
		background-repeat: round;
	}
	.mui-icon-home:before{
		background-image:url(../../statics/imgs/1.png);
	}
	.mui-icon-email:before{
		background-image:url(../../statics/imgs/2.png);
	}
	.mui-icon-chatbubble:before{
		background-image:url(../../statics/imgs/3.png);
	}
	.mui-icon-location:before{
		background-image:url(../../statics/imgs/4.png);
	}
	.mui-icon-search:before{
		background-image:url(../../statics/imgs/5.png);
	}
	.mui-icon-phone:before{
		background-image:url(../../statics/imgs/6.png);
	}
</style>