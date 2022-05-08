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
import { toast, readTextFromUri } from '../utils';
import { bus } from '../app';
import { openFilePicker } from '@nativescript-community/ui-document-picker';
export default {
  name: 'Topbar',
  methods: {
    deleteDatabase() {
      global.db.deleteAll();
    },
    // Export database into json file
    async exportDb() {
      await global.db.exportData();
    },
    // Open File chooser for file import
    async importDb() {
      try {
        const files = await openFilePicker({
          extensions: ['json']
        });
        const content = readTextFromUri(files.files[0]);
        await global.db.importData(JSON.parse(content));
        bus.$emit('reloadApp');
      } catch (error) {
        console.error(error);
      }
    },
    // API url setter
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
