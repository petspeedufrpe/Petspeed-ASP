/* eslint-disable quotes */
import React, {useState} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import reactotron from 'reactotron-react-native';

export default function Search(params) {
  const [searchFocused, setSearchFocused] = useState(false);
  return (
    <GooglePlacesAutocomplete
      placeholder="Diga-nos o seu endereço"
      placeholderTextColor="#333"
      onPress={(data, details = null) => {
        setSearchFocused(false);
        const latitude = details.geometry.location.lat;
        const longitude = details.geometry.location.lng;
        params.setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0143,
          longitudeDelta: 0.0134,
        });
      }}
      query={{
        key: 'AIzaSyAws3DiTDOsKOtriFEzepkD5pBysglvgkA',
        language: 'pt',
      }}
      textInputProps={{
        onFocus: () => {
          setSearchFocused(true);
        },
        autoCapitalize: 'none',
        autoCorrect: false,
      }}
      listViewDisplayed={searchFocused}
      fetchDetails
      enablePoweredByContainer={false}
      styles={styles}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    height: 54,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  textInput: {
    height: 54,
    margin: 0,
    borderRadius: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {x: 0, y: 0},
    shadowRadius: 15,
    borderColor: '#DDD',
    fontSize: 18,
  },
  listView: {
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {x: 0, y: 0},
    shadowRadius: 15,
    marginTop: 10,
  },
  description: {
    fontSize: 16,
  },
  row: {
    padding: 20,
    height: 58,
  },
});
