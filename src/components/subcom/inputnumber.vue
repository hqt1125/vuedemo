<template>
		<div class="conts">
			<div class="inleft" @click="substr">-</div>
				<div class="incont" v-text="cont"></div>
				<div class="inright" @click="add">+</div>
		</div>
</template>

<script>
	export default{
		data(){
			return {
				cont:1
			}
		},
		methods:{
			substr(){
				this.cont--;
				if(this.cont<1){
					this.cont=1;
				}
				this.sendmsg();
				
			},
			add(){
				this.cont++;
				this.sendmsg();
			},
			sendmsg(){
				this.$emit('dataobj',this.cont)
			}
		},
		created(){
			
		}
	}
</script>

<style scoped>
	.conts{
		display: inline-block;
		padding: 0 20px;
	}
	.conts div{
		display: inline-block;
		width: 40px;
		height: 28px;
		text-align: center;
		line-height: 28px;
		border: 1px solid #000;
	}
	.inleft{
		
	}
</style>