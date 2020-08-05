import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible';
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'font-awesome/css/font-awesome.css'

import { 
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  NavBar,
  Toast,
  Tab,
  Tabs,
  Icon,
  Button,
  Sidebar,
  SidebarItem,
  List,
  Search,
  Cell,
  Popup,
  Empty

 } from 'vant';
 Vue
  .use(Tabbar)
  .use(TabbarItem)
  .use(Swipe)
  .use(SwipeItem)
  .use(NavBar)
  .use(Toast)
  .use(Tab)
  .use(Tabs)
  .use(Icon)
  .use(Button)
  .use(Sidebar)
  .use(SidebarItem)
  .use(List)
  .use(Search)
  .use(Cell)
  .use(Popup)
  .use(Empty)




Vue.use(VueAxios, axios)
// 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
// 发起请求之前处理 序列化
axios.interceptors.request.use(config =>{
  // 
  if(config.method == 'post'){
    let paramsString = '';
    for(let key in config.data){
      paramsString += key + "=" + config.data[key] + "&"
    }
    config.data = paramsString.slice(0,-1);
  }
  return config;
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
