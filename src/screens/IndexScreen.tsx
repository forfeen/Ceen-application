import { StyleSheet, FlatList, TouchableOpacity, Animated, ScrollView } from 'react-native';
import Vaccine from '../types/vaccine.type';
import VaccinationCharts from './components/VaccinationsCharts';
import { Text, View } from './components/Themed';
import { Card } from 'react-native-elements';
import React, {useState, useEffect, useRef} from 'react';
import {AxiosResponse} from 'axios';
import vaccineService from './services/vaccine.service';
import { FontAwesome } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const IndexScreen = ({navigation}: {navigation: any}) => {

    const [vaccine, setVaccine] = useState<Vaccine[]>([]);
    const offset = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        vaccineService.getAllVaccine()
          .then((responese: AxiosResponse) => {
            setVaccine(responese.data.items);       
            // console.log(responese)         
        });
    }, []);

    return (
          <SafeAreaProvider>
              <ScrollView
                style={styles.container}
                contentContainerStyle={{
                  paddingTop: 10,
                }}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { y: offset } } }],
                  { useNativeDriver: false }
                )}
              >
                <View style={{ backgroundColor: 'transparent', alignItems: 'center'}}>
                  <VaccinationCharts path="/screens/ModalScreen.tsx" />
                </View>

                <View style={styles.list}>
                  <Text style={styles.title}>Vaccines</Text>
                  <TouchableOpacity onPress={() => navigation.push("Map")} style={styles.map}>
                      <FontAwesome
                        name="map-marker"
                        size={25}
                        color="#b34646"
                        style={{ marginLeft:13, marginTop: 7}}/>
                  </TouchableOpacity>
                </View>

                <FlatList 
                  data={vaccine}
                  keyExtractor={(vaccine) => vaccine.id}
                  renderItem={( {item} ) => {
                      return (
                      <TouchableOpacity 
                          onPress={
                              () => {
                                navigation.push('Details', {vaccineId: item.id});
                              }
                      }>
                        <View style={{alignItems: 'center',  backgroundColor: 'transparent'}}>
                          <Card containerStyle={styles.card_vaccine}>
                            <View style={styles.list}>
                              <Text style={styles.name}>{item.name}</Text>
                              <Text style={styles.review_title}>{item.review} reviews</Text>
                            </View>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={{lineHeight: 30}}>{item.long_description}</Text>
                          </Card>
                        </View>
                      </TouchableOpacity>
                      );
                  }}/>
              </ScrollView>
    
          </SafeAreaProvider>
          );
   };

export default IndexScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#F0F7F9'
  },
  title: {
    fontSize: wp('5.2'),
    fontWeight: '600',
    textAlign: 'left',
    color: '#000',
    margin: 25
  },
  separator: {
    marginVertical: 30,
    height: 6,
    width: '80%',
    top: '10%'
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent'
  },
  card_vaccine: {
    width: 309,
    height: 85,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 20,
    fontSize: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.09,
    shadowRadius: 8,  
    elevation: 3
  },
  name: {
      fontSize: 18,
      letterSpacing: 0.75,
      color: "black"
  },
  review_title: {
    textAlign: 'right',
    fontSize: 12,
    color: "#2F80ED",
    marginTop: 5.5
  },
  map: {
    height: 40,
    width: 40,
    backgroundColor: "#e8e8e8",
    borderRadius: 100,
    marginRight: 15,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 8,  
    elevation: 3
  }
});
