import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  PermissionsAndroid,
  ToastAndroid,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import MapView from 'react-native-maps';

export default function Main() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [contador, setContador] = useState(0);
  const [region, setRegion] = useState({
    region: null,
  });

  useEffect(() => {
    if (isLoaded === true) {
      alert('mapa carregado');
      teste();
    }
  }, [isLoaded]);

  function teste() {
    console.log('rodou');
    navigator.geolocation
      .getCurrentPosition(
        ({coords: {latitude, longitude}}) => {
          setRegion({
            region: {
              latitude,
              longitude,
              latitudeDelta: 0.0143,
              longitudeDelta: 0.0134,
            },
          });
        },
        error => {
          console.log(error);
        },
        {
          timeout: 2000,
          enableHighAccuracy: true,
          maximumAge: 1000,
        },
      )
      .then(console.log(region, 'primeiro use effect'));
  }

  useEffect(() => {
    console.log(region, 'segundo use effect');
  }, [region]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        onMapReady={async () => {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          setIsLoaded(true);
        }}
      />
      <TouchableOpacity
        style={{alignSelf: 'center', marginTop: 30, elevation: 2}}
        onPress={() => {
          setContador(contador + 1);
        }}>
        <Text
          style={{
            fontSize: 26,
            fontWeight: 'bold',
            color: '#ccc',
          }}>
          {contador}
        </Text>
      </TouchableOpacity>
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
