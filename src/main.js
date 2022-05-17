import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入全局样式
import './assets/css/global.css'
// 导入vuex
import store from './store'
// 导入Echarts
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts

// 导入axios
import axios from 'axios'
// 配置根路径
axios.defaults.baseURL = 'https://ccpc-cert.acmclub.cn:8081/'
Vue.prototype.$http = axios


Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
