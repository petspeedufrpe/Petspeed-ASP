import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, View, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import BottomNavBar from '../components/bottomNavBar';
import api from '../services/api';
import Search from '../components/SearchBar';

Geocoder.init('AIzaSyAws3DiTDOsKOtriFEzepkD5pBysglvgkA');

export default function Main({navigation}) {
  const user = navigation.state.params;
  const [requestMapCameraChange, SetRequestMapCameraChange] = useState(false);
  const [locationGaranted, setLocationGaranted] = useState(false);
  const [region, setRegion] = useState(null);
  const [markers, setMarkers] = useState([]);

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
          {markers.map(marker => (
            <Marker
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
        <Search />
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
});
