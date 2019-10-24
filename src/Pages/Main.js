import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  View,
  StyleSheet,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker,Callout} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import BottomNavBar from '../components/bottomNavBar';
import api from '../services/api';
import Search from '../components/SearchBar';
import Dialog from 'react-native-dialog';
import reactotron from 'reactotron-react-native';
import MedicMarkerCard from '../components/MedicMarkerCard'
Geocoder.init('AIzaSyAws3DiTDOsKOtriFEzepkD5pBysglvgkA');

export default function Main({navigation}) {
  const user = navigation.state.params;
  const [requestMapCameraChange, SetRequestMapCameraChange] = useState(false);
  const [locationGaranted, setLocationGaranted] = useState(false);
  const [region, setRegion] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [medico, setMedico] = useState(null);
  const [txt, setTxt] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);
  let dataOs = {
    medico:null,
    user:null
  };

  useEffect(() => {
    async function loadMedics() {
      try {
        const rawquery = await api.get('medico/all');
        const medics = rawquery.data;
        for (var i = 0; i < medics.length; i++) {
          const medico = medics[i];
          let marker = {
            latitude: medico.pessoa.endereco.latitude,
            longitude: medico.pessoa.endereco.longitude,
            title: medico.pessoa.nome,
            description: medico.telefone,
            data:medico
          };
          setMarkers(markers => [...markers, marker]);
        }
      } catch (error) {
        console.warn(error.message);
      }
    }

    loadMedics();
  }, []);

  useEffect(() => {
    if (locationGaranted && requestMapCameraChange) {
      Geolocation.getCurrentPosition(
        async ({coords: {latitude, longitude}}) => {
          const response = await Geocoder.from({latitude, longitude});
          const address = response.results[0].formatted_address;
          const location = address.substring(0, address.indexOf(','));
          const {email} = user;

          setRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
          });

          alert(`Bem vindo ${email}!\n\nVocê está em: ${address}`);
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {
          timeout: 2000,
          enableHighAccuracy: true,
          maximumAge: 1000,
        },
      );
    }
    SetRequestMapCameraChange(false);
  }, [locationGaranted, requestMapCameraChange, user]);

  const handleConfirm = (data)=> {
    const user = navigation.state.params
    dataOs.medico = data
      dataOs.user = user
    navigation.navigate('AnimalSelect',dataOs)
  }

  return (
    <>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          region={region}
          onMapReady={async () => {
            await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            setLocationGaranted(true);
            SetRequestMapCameraChange(true);
          }}>
          {markers.map((marker,index) =>  (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
              description={marker.description}
              onPress={() => setDialogVisible(true)}
              > 
              <View>
          <Dialog.Container
            visible={dialogVisible}
            onBackdropPress={() => {
              setDialogVisible(false);
            }}>
            <Dialog.Title>{`Deseja solicitar o atendimento ao médico ${marker.title} ?`}</Dialog.Title>
            <Dialog.Description>
              {`Telefone: ${marker.description}`}
            </Dialog.Description>
            <Dialog.Button
              onPress={() => {
                setDialogVisible(false);
              }}
              label="cancelar"
            />
            <Dialog.Button
              onPress={() => {
                setDialogVisible(false);
                handleConfirm(marker.data);
              }}
              label="agendar"
            />
          </Dialog.Container>
        </View>
          <Callout
            tooltip={true}
            style={styles.container}
            onPress={()=> markerClick()}
          >
                   </Callout>
            </Marker>
          ))}
        </MapView>
        <View>
          <TextInput
            style={{
              backgroundColor: '#ffff',
              marginTop: 18,
              marginHorizontal: 18,
              borderRadius: 8,
              borderWidth: 3,
              borderColor: '#5c5c5c',
              paddingStart: 20,
            }}
            placeholder={'Busque aqui um médico'}
            onChangeText={text => {
              reactotron.log(text);
              async function a() {
                try {
                  const medico = await api.post('medico/findnome', {
                    nome: text,
                  });
                  setMedico(medico.data);
                  setTxt(text);
                  reactotron.log(medico);
                } catch (error) {
                  reactotron.log(error.message);
                }
              }
              if (text === '') {
                setMedico(null);
              } else {
                a();
              }
            }}
          />
          {medico && (
            <View>
              <FlatList
                //ListEmptyComponent={ListEmptyComponent}
                style={styles.list}
                data={medico}
                keyExtractor={data => data.id.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity>
                    <View style={styles.listItem}>
                      <Text style={styles.listItemText}>{`Nome: ${
                        item.pessoa.nome
                      }`}</Text>
                      <Text style={styles.listItemText}>{`CPF: ${
                        item.pessoa.cpf
                      }`}</Text>
                      <Text style={styles.listItemText}>{`CRMV: ${item.crmv}-${
                        item.uf
                      }`}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
          <View />
        </View>
      </View>
      <BottomNavBar navigation={navigation} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  list: {
    marginTop: 7,
    borderRadius: 5,
    borderColor: '#00b894',
    borderWidth: 3,
    marginHorizontal: 20,
    paddingHorizontal: 30,
    backgroundColor: '#a1a1a1',
  },
  listItem: {
    backgroundColor: '#EEE',
    borderRadius: 4,
    marginVertical: 10,
    padding: 30,
    minHeight: 20,
  },
  listItemText: {
    fontSize: 16,
  },
});
