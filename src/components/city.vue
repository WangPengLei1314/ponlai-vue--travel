<template>
	<div class="city">
        <h2><label>当前定位城市：</label>{{cityCn}}</h2>
        <p>热门城市</p>
        <ol>
            <li v-for="(city,index) in citys" v-if="index<14" @click="sendCity(city.uid,city.name)">{{city.name}}</li>

        </ol>
    </div>

</template>

<script>
	
export default {

  data () {
    return {
      citys:[],
      cityCn:'上海'
    }

  },
  created () {
    this.getCity();

  },
  methods : {
    getCity () {
      this.$http.jsonp('https://api.douban.com/v2/loc/list',{
          params:{
          },

        }).then((res) => {
          this.citys = res.data.locs;

        }, (err) => {
          console.log(err)
        })

    },
    sendCity (cityEn,cityCn) {
    	this.cityCn = cityCn
    	this.$emit('cityName',{cityEn,cityCn})
    	this.$router.push({name:'Home',});
    }

  },
  watch:{
  	'$route':'getCity'

  }

}

</script>
<style scoped>
.city{max-width:450px;background:#f0efed;padding:10px;box-sizing:border-box;position:fixed;top:50px;bottom:0px;}
.city h2{height:40px;line-height:40px;background:#fdfdfc;font-size:14px;font-weight:normal;color:#06c1ae;padding-left:15px;}
.city h2 label{color:#444;}
.city p{margin:15px 0;font-size:16px;}
ol{overflow:auto;}
ol li{width:25%;height:40px;line-height:40px;display:inline-block;color:#454545;text-align:center;font-size:15px;border-bottom:1px solid #ddd8ce;border-left:1px solid #ddd8ce;background:#fdfdfc;box-sizing: border-box;cursor:pointer;}

</style>