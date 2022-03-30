import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import User from '../../types/user.type'
import { useForm, Controller } from "react-hook-form";
import React, {useState, useEffect} from 'react';
import MapView, { Marker, Callout, Circle, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from "react-native-geolocation-service";
import * as Location from 'expo-location';

import vaccineService from '../services/vaccine.service';
import Hospital from '../../types/hospital.type';

import Colors from '../../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import Icon from '@expo/vector-icons/FontAwesome5';

const MapScreen = ({route, navigation}) => {
  const { vaccineId } = route.params;
  // const [hospital, setHospital] = useState<Hospital>();
  const [hospital, setHospital] = useState([
      {name: 'โรงพยาบาลเปาโล เกษตร', latitude: 13.83555212, longitude: 100.5742404},
      {name: 'โรงพยาบาลวิภาวดี', latitude: 13.84633763, longitude: 100.5621239}
    ]
  );
  const [location, setLocation] = useState({
    latitude:0,
    longitude:0,
    latitudeDelta:0,
    longitudeDelta:0
  });
  const markers =  useState([]);

  const locationPermission = async () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status == 'granted') {
        let location = await Location.getCurrentPositionAsync({});
        let latitude = location.coords.latitude
        let longitude = location.coords.longitude
        let latitudeDelta = 0.0922
        let longitudeDelta =  0.0421
        setLocation({latitude, longitude, latitudeDelta, longitudeDelta});
      }
    }
  };

  async function getAllHospital() {
    const data = await vaccineService.getHospital(vaccineId)
        .then(response => {
            return response.data.items;
        })
        .catch(e => {
            console.error(e);
        })
        return data;
  }

  useEffect(() => {
    const fetchHos = async () => {
      const hospital = await getAllHospital();
      setHospital(hospital);
    }

    locationPermission();
    // fetchHos();
  }, []);

  // console.log(location.latitude);
  console.log(hospital)



  return (
  <View style={styles.container}>
      <MapView 
        style={styles.map} 
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: location.latitudeDelta,
          longitudeDelta: location.longitudeDelta
      }}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      >

      {
        hospital.map((marker, index) => (
          <Marker
            key={marker.name}
            ref={ref => markers[index] = ref}
            // onPress={() => onMarkerPressed(marker, index)}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
          >
            <Callout>
              <Text>{marker.name}</Text>
            </Callout>

          </Marker>
        ))
      }
      </MapView>

        
      
  </View>
  );
}

export default MapScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});


