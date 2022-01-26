import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Vaccine from '../types/vaccine.type';
import VaccinationCharts from './components/VaccinationsCharts';
import EditScreenInfo from './components/EditScreenInfo';
import { Text, View } from './components/Themed';
import React, {useState, useEffect} from 'react';
import {AxiosResponse} from 'axios';
import vaccineService from './services/vaccine.service';

    const IndexScreen = ({navigation}: {navigation: any}) => {

        const [vaccine, setVaccine] = useState<Vaccine[]>([]);

        useEffect(() => {
            vaccineService
             .getAllVaccine()
             .then((responese: AxiosResponse) => {
                setVaccine(responese.data.items);                
            });
        }, []);

        return (
            <View style={styles.container}>
              <Text style={styles.title}>Vaccinations Overview</Text>
              <VaccinationCharts path="/screens/ModalScreen.tsx" />
        
              {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
        
              <Text style={styles.title}>Vaccines</Text>
                <FlatList 
                      data={vaccine}
                      keyExtractor={(vaccine) => vaccine.id}
                      renderItem={( {item} ) => {
                          return (
                          <TouchableOpacity 
                              onPress={
                                  () => navigation.navigate('Details', {vaccine: item.id})}
                                  >
                              <View style={{alignItems: 'center'}}>
                                  <View style={styles.row}>
                                      <Text style={styles.name}>{item.name}</Text>
                                      <Text>{item.short_description}</Text>
                                  </View>
                              </View>
                          </TouchableOpacity>
                          );
                      }}/>
    
              {/* Use a light status bar on iOS to account for the black space above the modal */}
              {/* <StatusBar style={Platform.OS === 'ios' ? 'black' : 'auto'} /> */}
            </View>
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
    fontSize: 20,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 309,
    height: 85,
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginTop: 24,
    marginBottom: 20,
    // backgroundColor: 'white',
    borderRadius: 20,
    fontSize: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.14,
    shadowRadius: 15,  
    elevation: 3
},
name: {
    fontSize: 18,
    letterSpacing: 0.75
},
});
