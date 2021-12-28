import Vue from 'nativescript-vue'
import store from './store';
import Home from './components/Home'

//Vue.config.silent = false;

export const bus = new Vue();

new Vue({
  render: (h) => h('frame', [h(Home)]),
  store
}).$start()
