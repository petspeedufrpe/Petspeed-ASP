import React, {useState, useEffect} from 'react';

import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import api from '../services/api';
import getRealm from '../services/realmConnection';
import AnimalRegister from './AnimalRegister';

export default function PetList({navigation}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadAnimals() {
      const realm = await getRealm();
      const {id: idcliente} = realm.objects('User')[0];
      const response = await api.get(
        `/cliente/encontrarAnimalPorCliente/${idcliente}`,
      );
      setData(response.data);
    }
    loadAnimals();
  }, []);
  return (
    <>
      <View style={{flex: 3}}>
        <FlatList
          style={styles.list}
          data={data}
          keyExtractor={data => data.id.toString()}
          renderItem={({item}) => (
            <View style={styles.listItem}>
              <Text style={styles.nome}>{item.nome}</Text>
            </View>
          )}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.fab}>
          <Icon name={'plus'} size={22} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
    backgroundColor: '#00b894',
  },
  listItem: {
    backgroundColor: '#EEE',
    marginTop: 20,
    padding: 30,
    height: 15,
  },
  container: {
    marginTop: 30,
  },
  fab: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
});
