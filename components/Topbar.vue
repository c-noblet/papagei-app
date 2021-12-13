<template>
  <view class="top-bar">
    <status-bar 
      background-color="#e74c3c"
      bar-style="light-content"
    />
    <ActionBar 
      class="action-bar"
      :rightIcons="[
        {
          name: 'plus',
          onPress: toast
        },
        {
          name: 'phone',
          onPress: toast
        },
        {
          name: 'menu',
          onPress: toast
        }
      ]"
    />
  </view>
</template>

<script>
//import Modal from './Modal.vue';
import ActionBar from 'react-native-action-bar';
import { ToastAndroid } from 'react-native';
export default {
  methods: {
    toast: function() {
      ToastAndroid.showWithGravity(
        'Test',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      )
    },
    fetchBotConnection: function() {
    }
  },
  components: {
    ActionBar
  }
}
</script>

<style>
  .top-bar {
    backgroundColor: #e74c3c;
  }

  .action-bar {
    padding: 25;
  }

  .btn {
    width: 25%;
  }
</style>
