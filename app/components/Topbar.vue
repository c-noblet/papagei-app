<template>
  <ActionBar
    title="Papagei"
    android:flat="true"
  >
    <ActionItem
      text="Connecter le Bot"
      android.position="popup"
      @tap="connectBot"
    />
    <ActionItem
      text="Paramètres"
      android.position="popup"
      @tap="showSettingModal"
    />
    <ActionItem
      text="Delete All"
      android.position="popup"
      @tap="deleteDatabase"
    />
  </ActionBar>
</template>

<script>
import SettingModal from './SettingModal.vue';
import { toast } from '../utils';
import { bus } from '../app';
export default {
  name: 'Topbar',
  computed: {
    modal() {
      return this.$store.state.modal;
    },
  },
  methods: {
    deleteDatabase() {
      global.db.deleteAll();
    },
    async showSettingModal() {
      this.$showModal(SettingModal).then(async (form) => {
        try {
          if (form.api && form.channel) {
            await global.db.setSettings(form);
            toast('Paramètre enregistré');
            bus.$emit('reloadApp');
          }
        } catch (error) {
          console.log(error);
        }
      });
    },
    async connectBot() {
      await fetch(`${global.api}/connect/${global.channel}`)
    }
  },
  components: {
    SettingModal
  }
}
</script>

<style scoped>
  /*ActionBar {
    background-color: #e74c3c;
    color: #ffffff;
  }*/
</style>
