<template>
	<div id="tmpl">
		<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in list">
					<router-link v-bind="{to:'/news/newsinfo/'+item.id}">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							{{item.title}}
							<p class="mui-ellipsis" v-text="item.zhaiyao"></p>
							<div class="ft">
								<span>发表时间：{{item.add_time}}</span>
								<span class="click">点击数：{{item.click}}</span>
							</div>
						</div>
					</router-link>
				</li>
			</ul>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import common from '../../kits/common.js'
	export default{
		data(){
			return {
				list:[]
			}
		},
		created(){
			this.getnewalist();
		},
		methods:{
			getnewalist(){
				var urls=common.apidomain+'/api/getnewslist';
				this.$http.get(urls).then(function(res){
					var data = res.body;
					console.log(data)
					if(data.status != 0) {
						Toast(data.manage);
						return
					}else{
						this.list = data.list;
						return
					}
				})
			}
		}
	}
</script>

<style scoped>
	.mui-table-view img{
		height: 80px;
		width: 80px;
	}
	.mui-table-view .mui-media-object{
		max-width: 80px;
		line-height: 80px;
	}
	.ft{
		margin-top: 1em;
		font-size: 12px;
		color: #0094ff;
	}
	.ft .click{
		margin-left: 20px;
	}
</style>