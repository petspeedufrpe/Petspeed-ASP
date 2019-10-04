import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function BottomNavBar({navigation}) {
  return (
    <View style={styles.navContainer}>
      <TouchableOpacity style={styles.tabButton}>
        <Icon name="home" size={22}></Icon>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabButton}
      onPress={()=> {
        navigation.navigate('PetList');
      }}>
        <Icon name='paw' size={22}></Icon>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabButton}>
      <Icon name='ambulance' size={22}></Icon>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => {
          navigation.navigate('UserProfile');
        }}>
        <Icon name='user' size={22}></Icon>
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
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#ffff',
    borderTopColor: '#000',
    elevation:8,
    borderTopWidth:0,
  },
  tabButton: {
    borderColor: '#CCC',
  },
});
