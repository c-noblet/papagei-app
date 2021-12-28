<template>
  <ActionBar
    title="Papagei"
    android:flat="true"
  >
    <ActionItem
      text="Paramètres"
      android.position="popup"
      @tap="promptUrl"
    />
  </ActionBar>
</template>

<script>
import { toast } from '../utils';
import { bus } from '../app';
export default {
  name: 'Topbar',
  methods: {
    deleteDatabase() {
      global.db.deleteAll();
    },
    async promptUrl() {
      const result = await prompt({
        title: "Saisissez l'url de l'API",
        okButtonText: "Sauvegarder",
        cancelButtonText: "Fermer",
        defaultText: global.api,
      });
      if (result.result) {
        await global.db.setSettings('api', result.text);
        toast('Paramètre enregistré');
        bus.$emit('reloadApp');
      }
    },
  }
}
</script>
