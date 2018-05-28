<template>
	<div id="tmpl">
		<!--图文表格-->
		<div class="mui-content" id="mui-content" style="background-color:#fff">
			<ul class="mui-table-view mui-grid-view">
				<li v-for="item in list" class="mui-table-view-cell mui-media mui-col-xs-6">
					<router-link v-bind="{'to':'/goods/goodsinfo/'+item.id}">
						<img class="mui-media-object" v-bind:src="item.img_url">
						<div class="mui-media-body">{{item.title}}</div>
						<div class="desc">
							<p>
								<span>￥{{item.sell_price}}</span>
								<s>￥{{item.market_price}}</s>
							</p>
							<p>
								<h6 class="left">热卖中...</h6>
								<h6 class="right">剩余{{item.ctock_quer}}件</h6>
							</p>
						</div>
					</router-link>
				</li>
			</ul>
		</div>

	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import common from '../../kits/common.js'
	export default {
		data() {
			return {
				list:[]
			}
		},
		methods: {
			getlist(){
				var urls = common.apidomain+'/api/getgoods/getindex=1';
				this.$http.get(urls).then(function(res) {
					var data = res.body;
					if(data.status != 0) {
						Toast(data.message);
						return
					} else {
						this.list = data.message;
						return
					}

				})
			}
		},
		created() {
			this.getlist();
		}
	}
</script>

<style scoped>
	#mui-content li {
		border: 1px solid rgba(0, 0, 0, 0.4);
		margin-left: 4px;
		box-shadow: 0 0 4px #000;
		padding: 5px;
	}
	
	#mui-content .mui-media-body {
		color: #0094ff;
	}
	#mui-content .desc{
		height: 60px;
		margin-top: 10px;
		padding: 5px;
		text-align: left;
		background-color: rgba(0,0,0,0.1);
	}
	#mui-content .desc span{
		color: red;
		margin-right: 25px;
	}
	#mui-content a{
		padding: 0;
		margin: 0;
		
	}
	#mui-content .desc .right{
		position: absolute;
		right: 10px;
		bottom: 5px;
	}
	#mui-content .desc .left{
		position: absolute;
		left: 10px;
		bottom: 5px;
	}
</style>