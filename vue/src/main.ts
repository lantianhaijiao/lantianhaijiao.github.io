/*
 * @Author: haobin.wang
 * @Date: 2024-02-05 18:15:03
 * @LastEditors: haobin.wang
 * @LastEditTime: 2024-04-03 18:25:08
 * @Description: Do not edit
 */
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('VueDatePicker', VueDatePicker);

app.mount('#app')
