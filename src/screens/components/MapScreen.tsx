import { StyleSheet, Dimensions, Platform , Alert} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import MapView, { Marker, Callout, PROVIDER_GOOGLE, AnimatedRegion} from 'react-native-maps';
import Geohash from 'latlon-geohash';
import * as Location from 'expo-location';

import vaccineService from '../services/vaccine.service';
import Locations from '../../types/locations.type';
import userLocation from '../../types/userLocation.type'

import Carousel from 'react-native-snap-carousel';
import { Text, View } from './Themed';

const MapScreen = ({navigation}: {navigation: any}) => {
  const [vacLocation, setLocationData] = useState<Locations>();
  const [userLocation, setuserLocation] = useState<userLocation>();
  const [getCoor] =  useState([]);
  const [coor] =  useState([]);

  const markers =  useState([]);
  const mapRef = useRef<MapView >(null);
  const carouselRef = useRef(null);

  const locationPermission = async () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status == 'denied') {
        Alert.alert(
          'Please allow location access in ' + Platform.OS +' setting'),
          [   
              {text: 'OK', 
              onPress: () => navigation.push("Index")
              }
          ]
      } else if (status == 'granted') {
        let currentL = await Location.getCurrentPositionAsync({});
        let latitude = currentL.coords.latitude
        let longitude = currentL.coords.longitude
        let latitudeDelta = 0.0922
        let longitudeDelta =  0.0421
        setuserLocation({latitude, longitude, latitudeDelta, longitudeDelta});
      } 
    }
  };

  async function getAllLocation() {
    const data = await vaccineService.getLocations()
        .then(response => {
          return response.data.data;
        })
        .catch(e => {
            console.error(e);
        })
        return data;
  }

  const onCarouselItemChange = () => {
    mapRef.current?.animateToRegion({
      latitude: coor.lat || 0,
      longitude: coor.lon || 0,
      longitudeDelta: 0.004,
      latitudeDelta: 0,
    })
  }


    // const _map.animateToRegion({
    //   latitude: coor.lat,
    //   longitude: location.longitude,
    //   latitudeDelta: 0.09,
    //   longitudeDelta: 0.035
    // })

    // this.state.markers[index].showCallout()
  // }

  const renderCarouselItem = ({ item }) => {
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{item.name}</Text>
    </View>
  }

  useEffect(() => {
    const fetchLo = async () => {
      const locationData = await getAllLocation();
      for(let i=0; i<locationData.length; i++){
        if(locationData[i].location.properties.name !== "undefined" &&
        locationData[i].location.properties.name !== "หมุดซ้ำ" &&
        locationData[i].location.geometry){
          getCoor.push({name: locationData[i].location.properties.name, 
            lat: Geohash.decode(locationData[i].location.geometry).lat,
            lon: Geohash.decode(locationData[i].location.geometry).lon
          })
        }
      }
      const names = getCoor.map(element => element.name)
      const filtered = getCoor.filter(({name}, index) => !names.includes(name, index + 1))
      for (let elements of filtered.values()) {
        coor.push(elements)
      }
      
      setLocationData(locationData)
    }
    locationPermission();
    fetchLo();
  }, []);

  return (
  <View style={styles.container}>
      <MapView 
        style={styles.map}
        ref={mapRef} 
        region={{
          latitude: userLocation?.latitude || 0 ,
          longitude: userLocation?.longitude || 0,
          latitudeDelta: userLocation?.latitudeDelta || 0.09,
          longitudeDelta: userLocation?.longitudeDelta || 0.05
      }}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      >

      { coor.map((marker, index) => (
          <Marker
            key={marker.name}
            ref={ref => markers[index] = ref}
            // onPress={() => onMarkerPressed(marker, index)}
            coordinate={{ latitude: marker.lat, longitude: marker.lon }}
          >
            <Callout>
              <Text>{marker.name}</Text>
            </Callout>

          </Marker>
        ))
      }
      </MapView>
      <Carousel
        ref={carouselRef}
        data={coor}
        containerCustomStyle={styles.carousel}
        renderItem={renderCarouselItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={300}
        removeClippedSubviews={false}
        onSnapToItem={(index) => onCarouselItemChange(index)}
      />
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
  carousel: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 48
  },
  cardContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    height: 200,
    width: 300,
    padding: 24,
    borderRadius: 24
  },
  cardImage: {
    height: 120,
    width: 300,
    bottom: 0,
    position: 'absolute',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24
  },
  cardTitle: {
    color: 'white',
    fontSize: 22,
    alignSelf: 'center'
  }
});


