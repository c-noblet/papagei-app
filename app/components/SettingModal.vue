<template>
  <Frame id="setting-modal">
    <Page height="240">
      <ActionBar title="Modifier les Paramètres" />
      <StackLayout class="p-10">
        <GridLayout height="40" rows="*" columns="auto,*">
          <Label row="0" col="0" class="font-weight-bold m-t-10" text="URL :" />
          <TextField row="0" col="1" v-model="form.api" />
        </GridLayout>
        <GridLayout height="40" rows="*" columns="auto,*">
          <Label row="0" col="0" class="font-weight-bold m-t-10" text="Channel :" />
          <TextField row="0" col="1" v-model="form.channel" />
        </GridLayout>
        <GridLayout height="60" rows="auto" columns="*, *">
          <Button class="btn" text="Fermer" @tap="$modal.close" row="0" col="0" />
          <Button class="btn" text="Sauvegarder" @tap="$modal.close(form)" row="0" col="1" />
        </GridLayout>
      </StackLayout>
    </Page>
  </Frame>
</template>

<script>
export default {
  name: 'AddModal',
  computed: {
    categories() {
      return this.$store.state.categories;
    }
  },
  data() {
    return {
      form: {}
    }
  },
  created() {
    console.log('form', global.api);
    this.form = {
      api: global.api,
      channel: global.channel
    };
  },
}
</script>

<style scoped>
  TextField, label {
    font-size: 15;
  }
</style>
