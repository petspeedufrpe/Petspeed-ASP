import React, {useState, useEffect, useLayoutEffect} from 'react';

import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import api from '../services/api';
import reactotron from 'reactotron-react-native';

export default function PetList({navigation}) {
  let os = {};
  reactotron.log(navigation.state.params)
  const [data,setData]= useState()
  const medico = navigation.state.params.medico
  reactotron.log(navigation.state)
  const user = navigation.state.params.user;
  os.medico = medico;
  os.user = user;
  useLayoutEffect(() => {
    async function loadAnimals() {
      try {
        const {id} = user;
        const response = await api.get(`animal/cliente/${id}`);
        setData(response.data);
      } catch (error) {
        console.warn(error.message);
      }
    }
    loadAnimals();
  }, [user]);
  const ListEmptyComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          alignContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Text style={styles.empty}>
          Você não possui nenhum animal cadastrado.{' '}
        </Text>
      </View>
    );
  };
  return (
    <>
      <View style={{flex: 3}}>
        <FlatList
          //ListEmptyComponent={ListEmptyComponent}
          style={styles.list}
          data={data}
          keyExtractor={data => data.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                os.animal = item;
                navigation.navigate('SinptomsList', os);
              }}>
              <View style={styles.listItem}>
                <Text style={styles.nome}>{`Nome: ${item.nome}`}</Text>
                <Text style={styles.nome}>{`Raça: ${item.raca}`}</Text>
                <Text style={styles.nome}>{`Peso: ${item.peso}kg`}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => {
            navigation.navigate('AnimalRegister', navigation.state.params);
          }}>
          <Icon name={'plus'} size={22} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 30,
    backgroundColor: '#00b894',
  },
  listItem: {
    backgroundColor: '#EEE',
    marginTop: 20,
    padding: 30,
    minHeight: 30,
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
  empty: {
    margin: 20,
    justifyContent: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
  },
});
