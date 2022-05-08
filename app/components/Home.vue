<template>
  <Page>
    <topbar />
    <ActivityIndicator v-if="loading" :busy="loading"/>
    <tabview v-else />
  </Page>
</template>

<script>
import Topbar from './Topbar.vue';
import AddModal from './AddModal.vue';
import Database from '../models/Database.Model';
import Tabview from './Tabview.vue';
import { Application } from '@nativescript/core';
import { getSharingIntent, fetchApi } from '../utils';
import { bus } from '../app';
export default {
  computed: {
    modal() {
      return this.$store.state.modal;
    },
    form() {
      return this.$store.state.form;
    },
  },
  data() {
    return {
      playlist: [],
      loading : false
    }
  },
  async created() {
    global.db = new Database();
    await global.db.openDatabase();
    global.api = '';

    // App reloader
    bus.$on('reloadApp', () => {
      this.reloadApp();
    });
    
    bus.$emit('reloadApp');

    // Listen to new video intents
    Application.android.on('activityNewIntent', async (args) => {
      this.getIntent('activityNewIntent', args);
    });
  },
  methods: {
    // Parse video adding intents
    async getIntent(intent, args) {
      try {
        const url = getSharingIntent(args);
        if (url == null) {
          return false;
        } else {
          this.loading = true;
          const id = url.split('watch?v=')[1];
          const infos = await fetchApi(`/info/${id}`);
          this.$store.commit('setForm', {
            title: (infos.title + '').replace(/[\\"']/g, ' ').replace(/\u0000/g, ' '),
            vid: infos.id,
            category: 0,
            picture: infos.picture
          });
          this.loading = false;
          this.showModal();
          return url;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async reloadApp() {
      const settings = await global.db.getSettings();
      global.api = settings.api;
      const playlist = await global.db.getAll();
      this.$store.dispatch('setPlaylist', playlist);
    },
    async showModal() {
      this.$showModal(AddModal).then(async (form) => {
        if (form.hasOwnProperty('vid')) {
          // Add data into database
          await global.db.add(form);
          bus.$emit('reloadApp');
        }
      });
    },
  },
  components: {
    Topbar, Tabview, AddModal
  }
};
</script>
