<template>
  <Frame id="add-modal">
    <Page height="400">
      <ActionBar title="Ajouter une vidéo" />
      <StackLayout class="p-10">
        <GridLayout height="40" rows="*" columns="auto,*">
          <Label row="0" col="0" class="font-weight-bold m-t-10" text="Titre :" />
          <TextField row="0" col="1" v-model="form.title" />
        </GridLayout>
        <GridLayout height="180" rows="*,*,*" columns="auto,*">
          <Label row="1" col="0" height="60" class="m-r-15 p-y-20 font-weight-bold" text="Catégorie :" />
          <ListPicker row="0" col="1" rowSpan="3" :items="categories" v-model="form.category" />
        </GridLayout>
        <GridLayout height="60" rows="auto" columns="*, *">
          <Button class="btn" text="Fermer" @tap="$modal.close" row="0" col="0" />
          <Button class="btn" text="Ajouter" @tap="$modal.close(form)" row="0" col="1" />
        </GridLayout>
      </StackLayout>
    </Page>
  </Frame>
</template>

<script>
export default {
  name: 'AddModal',
  computed: {
    formState() {
      return this.$store.state.form;
    },
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
    this.form = this.formState;
  },
}
</script>

<style scoped>
  TextField, label {
    font-size: 15;
  }
</style>
