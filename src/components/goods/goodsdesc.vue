<template>
	<div id="tmpl">
		<div id="desc">
			<h4 v-text="info.title" class="title"></h4>
		<p class="line"></p>
		<p v-html="info.content"></p>
		</div>
		
	</div>
</template>

<script>
	import silder from '../subcom/silder.vue';
	import { Toast } from 'mint-ui';
	import common from '../../kits/common.js'
	export default{
		data(){
			return {
				id:0,
				info:{}
			}
		},
		methods:{
			getinfo(){
				/*12为当前id，因为假数据暂时写死 this.id替换*/
				var urls = common.apidomain+'/api/goods/getdesc/12';
				this.$http.get(urls).then(function(res) {
					var data = res.body;
					if(data.status != 0) {
						Toast(data.manage);
						return
					} else {
						this.info = data.message[0];
						return
					}

				})
			}
		},
		created(){
			this.id=this.$route.params.id;
			this.getinfo();
		}
	}
</script>

<style scoped>
	#desc{
		padding: 8px;
	}
	.line{
		height: 1px;
		border: 1px solid rgba(0,0,0,0.2);
	}
	.title{
		color: #0094ff;
		padding: 5px;
	}
</style>