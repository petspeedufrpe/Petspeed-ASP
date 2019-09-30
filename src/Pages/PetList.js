import React from 'react'
import { View, 
         Text,
         Image,
         Alert,
         StyleSheet,
         TouchableOpacity,
         } from 'react-native'

import AsyncStorage from '@react-native-community/async-storage';

export default function PetList({navigation}) {
  return (
    <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('AnimalRegister');
          }}>
          <Text style={styles.buttonText}>Cadastrar Pet</Text>
        </TouchableOpacity>
    </View>
    
    
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: '#00b894',
    },
    imageProfie: {
      marginTop: 50,
      height:120,
      width: 120,
    },
    nomePerfil: {
      color: 'white',
      fontSize: 22,
      marginTop: 12,
    },
    icon: {
      marginTop: 12,
    },
  
    button: {
      alignSelf: 'stretch',
      justifyContent: 'center',
      height: 40,
      marginTop: 3,
      marginVertical: 25,
      marginHorizontal: 20,
      borderRadius: 10,
      elevation: 2,
      textShadowColor: '#000',
      backgroundColor: '#009e80',
      shadowOpacity: 0.05,
      shadowRadius: 2,
      shadowOffset: {
        width: 0,
        height: 2,
      },
    },
  
    buttonText: {
      fontSize: 20,
      fontFamily: 'Cochin',
      textAlign: 'center',
      color: '#FAFAF2',
      fontStyle: 'italic',
      alignContent: 'center',
      fontWeight: 'bold',
    },
  
    buttonSair: {
      flex: 1,
      width: 300,
      marginHorizontal: 10,
      alignSelf: 'stretch',
      maxHeight: 50,
      borderRadius: 10,
      backgroundColor: '#009e80',
      marginTop: 130,
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
});