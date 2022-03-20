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
    <ActionItem
      text="Exporter les sons"
      android.position="popup"
      @tap="exportDb"
    />
    <ActionItem
      text="Importer les sons"
      android.position="popup"
      @tap="importDb"
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
    async exportDb() {
      await global.db.exportData();
    },
    async importDb() {
      await global.db.importData();
    },
    async promptUrl() {
      const result = await prompt({
        title: "Saisissez l'url de l'API",
        okButtonText: "Sauvegarder",
        cancelButtonText: "Fermer",
        defaultText: global.api,
      });
      if (result.result) {
        console.log(result);
        await global.db.setSettings('api', result.text);
        toast('Paramètre enregistré');
        bus.$emit('reloadApp');
      }
    },
  }
}
</script>
