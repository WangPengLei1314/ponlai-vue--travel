
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/iconcss/iconfont.css'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import store from './store/store'


Vue.use(ElementUI)
Vue.use(VueResource)

Vue.http.interceptors.push((request, next) =>{ 

 let TOKEN=sessionStorage.getItem('STORAGE_TOKEN'); 
 if(TOKEN){ 
  
  request.headers.set('TOKEN',TOKEN); 
 } 
 store.commit('loading',true)

 next((response) => { 

store.commit('loading',false)

   return response;
 }); 
}); 


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
