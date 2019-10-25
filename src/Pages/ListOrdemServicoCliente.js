import React, {useState, useEffect, useLayoutEffect} from 'react';

import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import api from '../services/api';
import reactotron from 'reactotron-react-native';

export default function PetList({navigation}) {
  const [data, setData] = useState([]);
  const user = navigation.state.params;

  useLayoutEffect(() => {
    async function loadOS() {
      try {
        const {id} = user;
        const response = await api.get(`ordemServico/getOsByCliente/${13}`);
        setData(response.data);
      } catch (error) {
        console.warn(error.message);
      }
    }
    loadOS();
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
          Você não possui nenhuma ordem de servico cadastrada.{' '}
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
                //navigation.navigate('AnimalDetails', item);
              }}>
              <View style={styles.listItem}>
                <Text style={styles.nome}>{`Descrição: ${item.descricao}`}</Text>
                <Text style={styles.nome}>{`Animal: ${item.animal.nome}`}</Text>
                <Text style={styles.nome}>{`Medico: ${item.medico.nome}`}</Text>
                <Text style={styles.nome}>{`Status: ${item.status}`}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
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
