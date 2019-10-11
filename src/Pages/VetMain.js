import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import api from '../services/api.js';

export default function Login({navigation}) {
  const medico = navigation.state.params;
  const {email} = medico;
  return (
    <View style={styles.container}>
      <Text>{`Olá ${email}, bem vindo ao PetSpeed!`}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#FFFF',
  },
});
