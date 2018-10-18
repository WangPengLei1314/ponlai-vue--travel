<template>
  <div class="app">
    <div class="wrapper">
    <div id="loading" v-show="loading">
    <div class="loading" v-loading="loading" element-loading-background="rgba(255, 255, 255, 0.8)"></div>

  </div>
      <div class="header" >
          <span v-if="isshow"><router-link :to="{path:'/city'}">{{message.cityCn}}<i class="el-icon-arrow-down"></i></router-link></span>
          <span class="backpage" v-else @click="$router.back(-1)"><i class="el-icon-arrow-left"></i></span>
          同城旅游
          <div class="home-btn">
            <router-link :to="{path:'/'}"><i class="iconfont icon-home"></i></router-link>
          </div>
      </div>

        <keep-alive>
          <router-view v-bind="message" @cityName="getCityName" @getType="getType"></router-view>
        </keep-alive>

    </div>

  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  data () {
    return {
      isshow:true,
      message:{
        cityEn:'shanghai',
        cityCn:'上海',
        getType:''

      },

    }

  },
  mounted () {
    this.router();

    
  },
  computed : {
    ...mapState({
      loading:state => state.loading

    })

  },
  methods : {
    getCityName (data) {
      this.message.cityEn = data.cityEn
      this.message.cityCn = data.cityCn

    },
    getType (data) {
      this.message.getType = data

    },

    router () {

     if(this.$route.path != "/"){
        this.isshow = false

      }else{
        this.isshow = true

      }
    }

  },
  watch : {

    '$route':'router',

  }

}
</script>

<style>



/*默认样式*/

*{margin:0;padding:0;}
body{color:#43200c;font-family: 'arial.ttf';}
ul,ol,li{list-style:none;}
img{border:none;vertical-align: middle;}
img[src=""],img:not([src]){opacity:0;}
a{text-decoration:none;}
input,button,select,textarea,a{outline:none;}

/* loading加载 */
#loading{max-width:450px;width:100%;position:fixed;left:0;right:0;top:0;bottom:0;margin:0 auto;z-index:9999;}

.loading{height:100%;}
.el-loading-spinner .path{stroke:#06c1ae;}


.app{position:relative;left:0;right:0;top:0;bottom:0;background:#f9f9f9;}
.wrapper{max-width:450px;height:100%;margin:0 auto;position:relative;}
.wrapper::-webkit-scrollbar-thumb{background-color: #ccc;}
.wrapper::-webkit-scrollbar{width:5px;background-color:transparent;}
.wrapper::-webkit-scrollbar-track{background:transparent;}

#loading{max-width:450px;width:100%;position:fixed;left:0;right:0;top:0;bottom:0;margin:0 auto;z-index:9999;}

.loading{height:100%;}

.header{height:50px;line-height:50px;text-align:center;color:#fff;position:relative;background:#06c1ae;font-size:15px;z-index:999;}
.header span{line-height:50px;position:absolute;left:10px;top:0;cursor:pointer;}
.header span a{color:#fff;}
.header .backpage i{display:inline-block;font-size:30px;margin-top:10px;}
.banner img{width:100%;}

.home-btn{height:50px;position:absolute;right:10px;top:0;}
.home-btn i{font-size:30px;color:#fff;}


</style>
