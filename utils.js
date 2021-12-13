import {
  ToastAndroid
} from 'react-native';

export const toast = (str) => {
  ToastAndroid.showWithGravity(
    str,
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM
  )
}
