<template>
  <View>
    <Modal 
      animationType="slide"
      :transparent="true"
      :visible=modalVisible
      :onRequestClose=closeModal
    />
  </View>
</template>

<script>
import { Modal } from 'react-native';
export default {
  props: [modalVisible],
  methods: {
    closeModal() {
      this.modalVisible = false;
    }
  },
  components: {
    Modal
  }
}
</script>
