import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import Search from '../components/SearchBar';
import reactotron from 'reactotron-react-native';
import Dialog from 'react-native-dialog';
import api from '../services/api';

Geocoder.init('AIzaSyAws3DiTDOsKOtriFEzepkD5pBysglvgkA');

export default function Main({navigation}) {
  const user = navigation.state.params;
  const [requestMapCameraChange, SetRequestMapCameraChange] = useState(false);
  const [locationGaranted, setLocationGaranted] = useState(false);
  const [region, setRegion] = useState(null);
  const [marker, setMarker] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [addressState, setAddressState] = useState(null);
  const [addressComplement, setAddressComplement] = useState(null);
  const [registerObject, setRegisterObject] = useState(null);

  async function finalizeRegistation() {
    const latitude = region.latitude;
    const longitude = region.longitude;
    const endereco = {
      endereco: addressState,
      complemento: addressComplement,
      latitude,
      longitude,
    };
    try {
      reactotron.log(registerObject);
      await api.post('/usuario/cadastrarVeterinario', {
        usuario: user,
        endereco,
      });
      navigation.navigate('Login');
    } catch (error) {
      reactotron.log(error.message);
    }
  }

  useEffect(() => {
    if (region != null) {
      setMarker({
        latitude: region.latitude,
        longitude: region.longitude,
      });
    }
  }, [region]);

  function setAdress(location) {
    const lat = location.latitude;
    const lng = location.longitude;
    Geolocation.getCurrentPosition(
      async () => {
        const response = await Geocoder.from({lat, lng});
        const address = response.results[0].formatted_address;
        const location = address.substring(0, address.indexOf(','));

        setAddressState(address);
      },
      error => {
        console.log(error.code, error.message);
      },
      {
        timeout: 500,
        enableHighAccuracy: true,
        maximumAge: 1000,
      },
    );
  }

  async function handleFinalizar(val) {}

  useEffect(() => {
    if (locationGaranted && requestMapCameraChange) {
      reactotron.log('rodou geocode');
      Geolocation.getCurrentPosition(
        async ({coords: {latitude, longitude}}) => {
          const response = await Geocoder.from({latitude, longitude});
          const address = response.results[0].formatted_address;
          const location = address.substring(0, address.indexOf(','));

          setRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0043,
            longitudeDelta: 0.0134,
          });
        },
        error => {
          console.log(error.code, error.message);
        },
        {
          timeout: 500,
          enableHighAccuracy: true,
          maximumAge: 1000,
        },
      );
    }
    SetRequestMapCameraChange(false);
  }, [locationGaranted, requestMapCameraChange]);

  return (
    <>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation={false}
          region={region}
          onMapReady={async () => {
            await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            setLocationGaranted(true);
            SetRequestMapCameraChange(true);
          }}>
          {marker && (
            <Marker
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
            />
          )}
        </MapView>
        <Search setRegion={setRegion} />
        <View>
          <Dialog.Container
            visible={dialogVisible}
            onBackdropPress={() => {
              setDialogVisible(false);
            }}>
            <Dialog.Title>{`Este é o seu local? \n\n ${addressState}`}</Dialog.Title>
            <Dialog.Description>
              você pode adicionar mais informações aqui:
            </Dialog.Description>
            <TextInput
              placeholder={'Ex. apto 108, Boloco A'}
              style={styles.dialogInput}
              onChangeText={text => {
                setAddressComplement(text);
              }}
            />
            <Dialog.Button
              onPress={() => {
                setDialogVisible(false);
              }}
              label="cancelar"
            />
            <Dialog.Button
              onPress={() => {
                setDialogVisible(false);
                finalizeRegistation();
              }}
              label="confirmar"
            />
          </Dialog.Container>
        </View>
      </View>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => {
          setAdress(region);
          setDialogVisible(true);
        }}>
        <Text style={styles.confirmButtonText}>{'Confirmar local'}</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 2,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  confirmButton: {
    height: 50,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: '#00b894',
  },
  confirmButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  markerImage: {
    resizeMode: 'contain',
  },
  dialogInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 50,
    paddingStart: 20,
  },
});
