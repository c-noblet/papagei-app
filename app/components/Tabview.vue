<template>
  <TabView 
    tabTextColor="#fff"
    tabBackgroundColor="#ff1744"
    selectedTabTextColor="#fff"
    selectedTabHighlightColorProperty="#fff"
    androidSelectedTabHighlightColor="#fff"
    androidTabsPosition="bottom" >
    <TabViewItem title="TOUS">
      <listview :items="playlist" />
    </TabViewItem>
    <TabViewItem title="GJ">
      <listview :items="gjPlaylist" />
    </TabViewItem>
    <TabViewItem title="NOOB">
      <listview :items="noobPlaylist" />
    </TabViewItem>
    <TabViewItem title="TG">
      <listview :items="tgPlaylist" />
    </TabViewItem>
    <TabViewItem title="AUTRE">
      <listview :items="autrePlaylist" />
    </TabViewItem>
  </TabView>
</template>

<script>
import Listview from './Listview.vue';
import { bus } from '../app';
export default {
  components: { Listview },
  name: 'Tabview',
  computed: {
    playlist() {
      return this.$store.state.playlist;
    },
    gjPlaylist() {
      return this.playlist.filter(v => v.category == 0);
    },
    noobPlaylist() {
      return this.playlist.filter(v => v.category == 1);
    },
    tgPlaylist() {
      return this.playlist.filter(v => v.category == 2);
    },
    autrePlaylist() {
      return this.playlist.filter(v => v.category == 3);
    }
  },
  mounted() {
    bus.$emit('reloadApp');
  },
}
</script>
