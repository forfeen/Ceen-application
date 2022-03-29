import { StyleSheet, TextInput, Alert, ActivityIndicator } from 'react-native';
import { Text, View } from './Themed';
import { Button, Card } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import vaccineService from '../services/vaccine.service';


const CreateQuestionScreen = ({route, navigation}) => {
 const { vaccineId } = route.params;
 const [vaccineName, setName] = useState('');
 const [title, onChangeText] = React.useState('');
 const [description, onChangeDes] = React.useState('');

 async function createQuestion() {
  const question = {
     //id: 0, // make it unique
     title: title,
     description: description,
     type: '',
     likes: 0,
     dislikes: 0,
     date: 0
  };
  const data = await vaccineService.createQuestion(vaccineId, question)
      .then(response => {
          onChangeText('');
          onChangeDes('');
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
                return setName('Sinovac');
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

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card_info}>
          <Text style={styles.vaccine_name}> {vaccineName} </Text>
          <Text style={styles.title}> Title: </Text>       
          <TextInput 
            style={styles.input}
            multiline
            maxLength={70} 
            onChangeText={onChangeText} 
            value={title} 
            placeholder="Type a title" />
          <Text style={styles.des_title}> Description: </Text>       
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
        onPress={() => createQuestion()} />
    </View>
  );
}

export default CreateQuestionScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CAEAF2',
    alignItems: 'center',
  },
  card_info: {
    backgroundColor: 'white',
    // padding: 20,
    marginVertical: 20,
    // borderRadius: 10,
    width: 343,
    // height: 300,
    borderRadius: 20,
    elevation:0,
    borderWidth: 0
  },
  vaccine_name: {
    top: 10.73,
    left: 5,
    // width: 105,
    height: 30.36,
    fontWeight: '500',
    fontSize: 24
  },
  title: {
      top: 37,
      left: 5,
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 14
  },
  des_title: {
    left: 5
  },
  input: {
    // height: 34,
    width: 230,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    left: 65,
    top: 0,
    borderRadius: 20,
    lineHeight: 24
  },
  description: {
    height: 240,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 15,
    top: 2,
    borderRadius: 20,
    lineHeight: 24
  },
  submit: {
    width: 250,
    borderRadius: 100,
    margin: 25,
  }
});