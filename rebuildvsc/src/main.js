// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//导入全局样式表
import './assets/css/global.css'

//导入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//导入接口文档
import api from './api'
Vue.prototype.$api = api

//使用ElementUI
Vue.use(ElementUI);

//导入防抖
import preventReClick from './utils/debounce'

Vue.use(preventReClick);


Vue.config.productionTip = false

//导入确权函数
import checkAuthModule from './utils/checkAuth';  

Vue.prototype.$checkUserAuth = checkAuthModule.checkUserAuth

//导入双语函数
import i18n from './i18n/index'

Vue.use(i18n);

//导入baseUrl
import { baseUrl } from './config'
Vue.prototype.baseUrl = baseUrl

//引入vue-echarts
import ECharts from 'vue-echarts'
import 'echarts'
Vue.component('v-chart', ECharts)

//导入导出excel函数
import { exportToExcel } from './utils/exportExcel';

Vue.prototype.$exportToExcel = exportToExcel;  


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
