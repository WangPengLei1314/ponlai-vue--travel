<template>
	<div class="detailContent">
		<div class="detailImage"><img :src="data.image_lmobile" class="detailImageB"><img :src="data.image" class="detailImageS"></div>
		<div class="datailContentInfo">
			<div class="event-info">
				<h1>{{data.title}}</h1>
				<p><label>时间：</label>{{data.begin_time}} ~ {{data.end_time}}</p>
				<p class="tips">活动结束时间以实际活动为准</p>
				<p><label>地点：</label>{{data.address}}</p>
				<p><label>费用：</label>{{data.fee_str}}</p>
				<p><label>类型：</label><router-link :to="{path:'/typelist?type='+data.category,}">{{data.category_name}}</router-link></p>
				<p><span>{{data.wisher_count}} 人感兴趣</span><span>{{data.participant_count}} 人参加</span></p>
			</div>
			<div class="related_info">
				<h2>活动详情</h2>
				<div class="suggest" v-html="content"></div>
				
			</div>
		</div>
	</div>

</template>

<script>

export default {
	data () {
		return {
			data:'',
			content:''
		}

	},
	created () {
		this.getId();

	},
	methods : {
		getId (){
			var getId = this.$route.params.id
			if(getId != null){
				
				this.$http.jsonp('https://api.douban.com/v2/event/'+getId,{
					
				}).then( (res) => {
					
					let reg = /http(\S*)s/g
					this.data = res.data
					this.content = res.data.content.replace(reg,"https://images.weserv.nl/?url=https")
					
				})

			}
			
		}
	},
	watch : {
		'$route':'getId'

	}
	
}

</script>

<style>

.detailContent{width:100%;}
.detailImage{width:100%;position:relative;background:transparent;border-bottom:1px solid #d9d9d9;}
.detailImageB{width:100%;filter: blur(3px);-webkit-filter: blur(3px);-moz-filter: blur(3px);}
.detailImageS{width:30%;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);}

.datailContentInfo{}
.event-info{background:#fff;padding:15px 10px;}
.event-info h1{font-size:16px;font-weight:normal;color:#454545;margin-bottom:8px;}
.event-info label{color:#696969;}
.event-info p{font-size:14px;color:#696969;line-height:24px;}
.event-info p.tips{color:red;font-size:15px;}
.event-info p a{color:#06c1ae;}
.event-info p span{margin-right:15px;}
.related_info{font-size:14px;color:#454545;margin-bottom:10px;}
.related_info h2{line-height:42px;font-size:16px;margin-left:15px;font-weight:normal;}
.suggest{padding:15px 10px;background:#fff;}
.related_info img{width:100%;}

</style>