import Vue from 'nativescript-vue'
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    playlist: [],
    form: {
      title: '',
      vid: '',
      category: 0,
      picture: ''
    },
    categories: [
      'GJ',
      'NOOB',
      'TG',
      'Autre'
    ],
  },
  mutations : {
    setForm(state, form) {
      state.form = form;
    },
    setPlaylist(state, playlist) {
      state.playlist = playlist;
    },
  },
  actions: {
    setPlaylist(context, playlist) {
      context.commit('setPlaylist', playlist);
    },
  }
});

Vue.prototype.$store = store;

export default store
