import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, View, StyleSheet, Text} from 'react-native';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from 'react-native-geolocation-service';

Geocoder.init('AIzaSyAws3DiTDOsKOtriFEzepkD5pBysglvgkA');

export default function Main({navigation}) {
  const [requestMapCameraChange, SetRequestMapCameraChange] = useState(false);
  const [locationGaranted, setLocationGaranted] = useState(false);
  const [region, setRegion] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (locationGaranted && requestMapCameraChange) {
      Geolocation.getCurrentPosition(
        async ({coords: {latitude, longitude}}) => {
          const response = await Geocoder.from({latitude, longitude});
          const address = response.results[0].formatted_address;
          const location = address.substring(0, address.indexOf(','));

          setRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
          });

          alert(`Bem vindo ${'email'}!\n\nVocê está em: ${address}`);
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
  }, [locationGaranted, requestMapCameraChange]);

  useEffect(() => {
    async () => {
      const id = await AsyncStorage.getItem('user_id');
      const token = await AsyncStorage.getItem('user_token');
      console.warn(id);
      setUser({id, token});
      console.warn(user);
    };
  }, []);

  return (
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
        }}
      />
      <View>
        <Text style={{fontSize: 20}}>hello world</Text>
      </View>
    </View>
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
