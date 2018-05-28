<template>
	<div id="tmpl">
		<!--轮播图-->
		<mt-swipe :auto="4000">
			<mt-swipe-item v-for="item in imgs" :key="item.id">
				<img v-bind:src="item.img" />
			</mt-swipe-item>
		</mt-swipe>
		
	</div>
</template>

<script>
	export default{
		props:['imgs'],//父子组件传值
		data(){
			return {
				
			}
		},
		methods:{
			
		},
		created(){
			
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
</style>