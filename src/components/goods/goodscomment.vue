<template>
	<div id="tmpl">
			<div id="comment">
			<comment :id='id'></comment>
		</div>
	</div>
</template>

<script>
	import silder from '../subcom/silder.vue';
	import comment from '../subcom/comment.vue';//导入子组件
	import { Toast } from 'mint-ui';
	import common from '../../kits/common.js'
	export default{
		components:{
			comment//注册子组件
		},
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
			//this.getinfo();
		}
	}
</script>

<style scoped>
	
</style>