<template>
  <view class="container">
    <topbar />
    <button 
      :on-press="deleteAll"
      title="delete all"
    />
    <text>Hello World</text>
    <view v-if="playlist.length >= 1">
      <text v-for="item in playlist" :key="item.id">{{ item.title }}</text>
    </view>
  </view>
</template>

<script>
import configs from './configs';
import { toast } from './utils';
import DatabaseModel from './model/Database.Model';
import Topbar from './components/Topbar.vue';
import ShareMenu from "react-native-share-menu";
import { AppState } from 'react-native';

export default {
  data() {
    return {
      db: null,
      playlist: []
    }
  },
  async mounted() {
    console.log('mounted');
    this.db = new DatabaseModel();
    await this.db.openDatabase();
    this.playlist = await this.db.getAll();

    AppState.addEventListener('change', async (status) => {
      if (status == 'active') {
        ShareMenu.getInitialShare(async (item) => {
          if (item.data) {
            const id = item.data.split('watch?v=')[1];
            const result = await fetch(`${configs.api}/info/${id}`)
            const info = await result.json();
            console.log(info);
            await this.db.add({
              id: info.id,
              title: info.title,
              picture: info.picture
            });
            toast(info.title);
            this.playlist = await this.db.getAll();
          }
        });
      }
    });
  },
  methods: {
    deleteAll() {
      this.db.deleteAll();
    },
  },
  beforeDestroy() {
    if (this.db) {
      this.db.close();
    }
  },
  components: {
    Topbar
  }
}
</script>

<style>
.container {
  background-color: white;
  flex: 1;
}
</style>
