import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function BottomNavBar({navigation}) {
  return (
    <View style={styles.navContainer}>
      <TouchableOpacity style={styles.tabButton}>
        <Text>HOME</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabButton}>
        <Text>PETS</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabButton}>
        <Text>AGEND.</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => {
          navigation.navigate('UserProfile');
        }}>
        <Text>PERFIL</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  navContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#ffff',
    borderTopColor: '#000',
  },
  tabButton: {
    borderColor: '#CCC',
  },
});
