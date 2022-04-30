<template>
  <Page>
    <topbar />
    <tabview />
  </Page>
</template>

<script>
import Topbar from './Topbar.vue';
import AddModal from './AddModal.vue';
import Database from '../models/Database.Model';
import Tabview from './Tabview.vue';
import { Application } from '@nativescript/core';
import { getSharingIntent, toast, fetchApi } from '../utils';
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
      previousIntent : 'mounted'
    }
  },
  async created() {
    global.db = new Database();
    await global.db.openDatabase();
    global.api = '';

    bus.$on('reloadApp', () => {
      this.reloadApp();
    });

    bus.$on('intent', (intent) => {
      this.previousIntent = intent;
    })
    
    bus.$emit('reloadApp');

    Application.android.on('activityNewIntent', async (args) => {
      if (this.previousIntent == 'mounted') {
        this.getIntent('activityNewIntent', args);
      }
    });

    Application.android.on('activityStarted', async (args) => {
      if (this.previousIntent !== 'import') {
        this.getIntent('activityStarted', args);
      }
      if (this.previousIntent == 'import') {
        this.previousIntent = 'modalClosed';
      }
    });
  },
  methods: {
    async getIntent(intent, args) {
      try {
        const url = getSharingIntent(args);
        console.log(intent, this.previousIntent, url);
        if (url == null || intent == this.previousIntent) {
          return false;
        } else {
          this.previousIntent = intent;
          const id = url.split('watch?v=')[1];
          const infos = await fetchApi(`/info/${id}`);
          this.$store.commit('setForm', {
            title: (infos.title + '').replace(/[\\"']/g, ' ').replace(/\u0000/g, ' '),
            vid: infos.id,
            category: 0,
            picture: infos.picture
          });
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
          await global.db.add(form);
          bus.$emit('reloadApp');
        }
        this.previousIntent = 'modalClosed';
      });
    },
  },
  components: {
    Topbar, Tabview, AddModal
  }
};
</script>
