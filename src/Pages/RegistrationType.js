import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

export default function RegistrationType({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/petspeed-logo-text.png')}
          resizeMode="center"
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Text style={styles.accountTypeText}>Que tipo de usuário é você?</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('UserRegister');
          }}>
          <Text style={styles.clientButton}>Quero ser cliente</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('VetRegister');
          }}>
          <Text style={styles.vetButton}>Sou médico</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00b894',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    width: 400,
    marginHorizontal: 10,
    alignSelf: 'stretch',
    maxHeight: 50,
    borderRadius: 10,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    elevation: 2,
    textShadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  accountTypeText: {
    marginVertical: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
    textShadowColor: '#000',
  },
  clientButton: {
    fontWeight: 'bold',
    color: '#009e80',
    fontSize: 25,
  },
  vetButton: {
    fontWeight: 'normal',
    color: '#000',
    fontSize: 15,
  },
});
