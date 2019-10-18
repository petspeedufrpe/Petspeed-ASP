import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';

Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure({host: '10.246.251.200'}) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect();; // let's connect!

