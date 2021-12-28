<template>
  <ListView for="item in items" @itemTap="onPlay(item.vid)">
    <v-template>
      <GridLayout columns="90, *, auto" rows="auto">
        <Image :src="item.picture" class="img-rounded" row="0" col="0" stretch="aspectFill" @tap="onPlay(item.vid)" />
        <Label :text="item.title" row="0" col="1" @tap="onPlay(item.vid)" />
        <Button text="X" row="0" col="2" @tap="onDelete(item.id)" />
      </GridLayout>
    </v-template>
  </ListView>
</template>

<script>
import { bus } from '../app';
import { toast } from '../utils';

export default {
  name: 'Listview',
  props: ['items'],
  methods: {
    async onPlay(vid) {
      try {
        await fetch(`${global.api}/play/${vid}`)
        toast('Play');
      } catch (error) {
        console.log(error);
      }
    },
    async onDelete(id) {
      global.db.delete(id);
      toast('Vidéo supprimé');
      bus.$emit('reloadApp');
    }
  },
}
</script>
