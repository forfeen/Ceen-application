import { StyleSheet, TextInput, ScrollView, Alert } from 'react-native';
import { Text, View } from './Themed';
import { Button, Card } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';

import DOSE_OPTIONS from '../../types/numberDose';
import EFFECTS_OPTIONS from '../../types/effects';
import VACCINE_OPTIONS from '../../types/vaccineOptions';
import vaccineService from '../services/vaccine.service';

const CreateReviewScreen = ({route, navigation}) => {
 const { vaccineId } = route.params;
 const [vaccineName, setName] = useState('');
 const [location, setLocation] = useState('');
 const [price, setPrice] = useState(null);
 const [description, onChangeDes] = React.useState('');
 const [numDose, setNumDose] = useState({});
 const [effectItems, setEffects] = useState([]);
 const [firstDose, setFirstDose] = useState({});
 const [secondDose, setSecondDose] = useState({});
 const [thirdDose, setThirdDose] = useState({});


 async function createReview() {
   
  let numberDose = numDose.id;
  let stDose = '';
  let ndDose = '';
  let rdDose = '';
  let thDose = '';
  
   // return effect into string type
   var effects = '';
   effectItems.map((x) => {
    effects += x.id;
    effects += ', ';
   });

   if (numberDose === '1') {
      stDose = vaccineName;
   }

   if (numberDose === '2') {
     stDose = firstDose.id;
     ndDose = vaccineName;
   }

   if (numberDose === '3') {
    stDose = firstDose.id;
    ndDose = secondDose.id;
    rdDose = vaccineName;
  }

  if (numberDose === '4') {
    stDose = firstDose.id;
    ndDose = secondDose.id;
    rdDose = thirdDose.id;
    thDose = vaccineName;
  }
   
  const question = {
     location: location,
     price: price,
     description: description,
     currentDose: numberDose,
     firstDose: stDose,
     secondDose: ndDose,
     thirdDose: rdDose,
     fourthDose: thDose,
     effects: effects,
     likes: 0,
     dislikes: 0,
     date: 0
  };
  
  const data = await vaccineService.createReview(vaccineId, question)
      .then(response => {
          // onChangeText('');
          // onChangeDes('');
          Alert.alert(
            'Success',
            'The question was created',
            [   
                {text: 'OK', 
                onPress: () => navigation.navigate('Details', {vaccineId: vaccineId})},
            ]
          );
          return response.data;
      })
      .catch(e => {
          console.error(e);
      })
      return data;
  };

 useEffect(() => {
    const getNameVaccine = () => {
        switch(vaccineId) {
            case '1':
                return setName('Sinovac: CoronaVac');
            case '2':
                return setName('AstraZeneca');
            case '3':
                return setName('Johnson & Johnson');
            case '4':
                return setName('Pfizer/BioTech');
            case '5':
                return setName('Moderna');
            case '6':
                return setName('Sinopharm');
         }
    }
    getNameVaccine();
  }, []);

  function onMultiChange() {
    return (item) => setEffects(xorBy(effectItems, [item], 'id'));
  }

  function onChange() {
    return (val) => setNumDose(val)
  }

  function selectFirstDose() {
    return (val) => setFirstDose(val)
  }

  function selectSecondtDose() {
    return (val) => setSecondDose(val)
  }

  function selectThirdDose() {
    return (val) => setThirdDose(val)
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card containerStyle={styles.card_info}>
            <Text style={styles.vaccine_name}> {vaccineName} </Text>
            <Text style={styles.title}> Location: </Text>
            <TextInput
              multiline
              maxLength={70} 
              style={styles.input}
              onChangeText={setLocation}
              value={location}
              placeholder="Type a location"
              />
            <Text style={styles.title}> Price: </Text>       
            <TextInput
              multiline
              style={styles.input}
              onChangeText={setPrice}
              keyboardType="numeric"
              value={price}
              maxLength={5}
              placeholder="Type a number"
            />
            <Text style={styles.currect_title}> Current Dose: </Text>       
            <View style={{backgroundColor: '#white', paddingTop: 20, paddingLeft: 5}}>
              <SelectBox
                  label
                  options={DOSE_OPTIONS}
                  value={numDose}
                  onChange={onChange()}
                  hideInputFilter
                />
                <View style={styles.selectBox}>
                  {numDose.id == 2 ?  
                    <SelectBox
                      label = "Please select first dose"
                      options={VACCINE_OPTIONS}
                      value={firstDose}
                      onChange={selectFirstDose()}
                      hideInputFilter
                    /> : false
                  }
              </View>
              <View style={{ backgroundColor: '#fff'}}>
                  {numDose.id == 3 ?  
                    <View style={styles.selectBox}>
                      <SelectBox
                      label = "Please select first dose"
                      options={VACCINE_OPTIONS}
                      value={firstDose}
                      onChange={selectFirstDose()}
                      hideInputFilter
                      />
                      <SelectBox
                        label = "Please select second dose"
                        options={VACCINE_OPTIONS}
                        value={secondDose}
                        onChange={selectSecondtDose()}
                        hideInputFilter
                      />
                    </View>  
                    : false
                  }
                  {numDose.id == 4 ?  
                    <View style={styles.selectBox}>
                      <SelectBox
                      style={{margin: 2}}
                      label = "Please select first dose"
                      options={VACCINE_OPTIONS}
                      value={firstDose}
                      onChange={selectFirstDose()}
                      hideInputFilter
                      />
                      <SelectBox
                        label = "Please select second dose"
                        options={VACCINE_OPTIONS}
                        value={secondDose}
                        onChange={selectSecondtDose()}
                        hideInputFilter
                      />
                      <SelectBox
                        label = "Please select thrid dose"
                        options={VACCINE_OPTIONS}
                        value={thirdDose}
                        onChange={selectThirdDose()}
                        hideInputFilter
                      />
                    </View>  
                    : false
                  }
              </View>
            </View>
          <Text style={styles.currect_title}> Side effects: </Text> 
          <View style={{backgroundColor: '#white', paddingTop: 25, paddingLeft: 5}}>
              <SelectBox
                  label
                  options={EFFECTS_OPTIONS}
                  selectedValues={effectItems}
                  onMultiSelect={onMultiChange()}
                  onTapClose={onMultiChange()}
                  isMulti
                  hideInputFilter
                />
            </View>
          <Text style={styles.currect_title}> Description: </Text> 
          <TextInput 
            multiline 
            style={styles.description}  
            onChangeText={onChangeDes} 
            value={description}
            maxLength={450}
            placeholder="Type a description"
          />
        </Card>
        <Button 
          style={styles.submit} 
          title="Post"
          onPress={() => createReview()
          }
        />
      </ScrollView>
    </View>
  );
}

export default CreateReviewScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CAEAF2',
    alignItems: 'center',
  },
  card_info: {
    backgroundColor: 'white',
    marginVertical: 18,
    width: 343,
    borderRadius: 20,
    elevation:0,
    borderWidth: 0
  },
  vaccine_name: {
    top: 10.73,
    left: 5,
    height: 30.36,
    fontWeight: '500',
    fontSize: 24
  },
  title: {
      top: 37,
      left: 5,
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 14,
  },
  currect_title: {
      top: 15,
      left: 5,
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 14,
  },
  input: {
    // height: 34,
    width: 230,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    left: 65,
    borderRadius: 20,
  },
  picker: {
      left: 110,
      width: 60,
  },
  side: {
      left: 110,
      width: 200
  },
  description: {
    height: 250,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 15,
    top: 18,
    borderRadius: 20,
    lineHeight: 18
  },
  submit: {
    width: 250,
    borderRadius: 100,
    margin: 25,
    left: 30
  },
  selectBox: {
    marginTop: 10, 
    backgroundColor: '#fff'
  }
});

