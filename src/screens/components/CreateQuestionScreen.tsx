import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { Card, CheckBox } from 'react-native-elements';
import { Text, View } from './Themed';

import vaccineService from '../services/vaccine.service';
import Question from '../../types/questions.type';
import { auth } from '../../../firebase'

const CreateQuestionScreen = ({route, navigation}) => {
 const { vaccineId } = route.params;
 const [vaccineName, setName] = useState('');
 const [price, setPrice] = useState(false);
 const [location, setLocation] = useState(false);
 const [effect, setEffect] = useState(false);

 const { control, handleSubmit, formState: { errors } } = useForm<Question>();
 const pressedQuestion = handleSubmit( data => createQuestion(data));
 var date = new Date();


 async function createQuestion(questionData) {

  const question = {
     ownerId: auth.currentUser.email,
     ownerName: auth.currentUser.displayName,
     title: questionData.title,
     description: questionData.description,
     typePrice: price,
     typeLocation: location,
     typeEffect: effect,
     likes: 0,
     dislikes: 0,
     date: date
  };

  return await vaccineService.createQuestion(vaccineId, question)
      .then(response => {
          Alert.alert(
            'Success',
            'The question was created',
            [   
                {text: 'OK', 
                onPress: () => navigation.push('Details', {vaccineId: vaccineId})},
            ]
          );
          return response.data;
      })
      .catch(e => {
          console.error(e);
      });
  }

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
      <ScrollView>

        <Card containerStyle={styles.card_info}>
            <Text style={styles.vaccine_name}> {vaccineName} </Text>
            <Text style={styles.title}> Title: </Text> 
            <Controller
              control={control}
              rules={{ maxLength: 70, required: true }}
              name="title"
              render={({
                field: { onChange, onBlur, value },
              }) => (
                <TextInput 
                  style={styles.input}  
                  onBlur={onBlur} // notify when input is touched
                  multiline
                  maxLength={70}
                  onChangeText={onChange} 
                  value={value} 
                  placeholder="Type a title"
              />
            )} 
            />   
            {errors.title && errors.title.type === "required" && <Text style={styles.error_msg}>Title is required</Text>}
          <Text style={styles.des_title}> Type: </Text> 
          <View style={{flexDirection: 'row', backgroundColor: 'white', padding: 0}}>
            <CheckBox
                // center
                containerStyle={{backgroundColor: 'white', width: 90, height: 50 ,top: 10, borderRadius: 20, marginEnd: 0, marginStart: 1}}
                textStyle={{fontWeight: '400', fontSize: 13}}
                title="Price"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={price}
                onPress={() => setPrice(!price)}
              />
              <CheckBox
                // center
                containerStyle={{backgroundColor: 'white', width: 110, top: 10, borderRadius: 20, marginEnd: 0, height: 50, marginStart: 10}}
                textStyle={{fontWeight: '400', fontSize: 13}}
                title="Location"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={location}
                onPress={() => setLocation(!location)}
              />
              <CheckBox
                // center
                containerStyle={{backgroundColor: 'white', width: 100, top: 10, borderRadius: 20,marginEnd: 0, marginStart: 10}}
                textStyle={{fontWeight: '400', fontSize: 13}}
                title="Side Effects"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={effect}
                onPress={() => setEffect(!effect)}
              />
          </View>

            <Text style={styles.des_title}> Description: </Text>       
            <Controller
              control={control}
              rules={{ maxLength: 450, required: true }}
              name="description"
              render={({
                field: { onChange, onBlur, value },
              }) => (
                <TextInput 
                  style={styles.description}  
                  onBlur={onBlur} // notify when input is touched
                  multiline
                  maxLength={450}
                  onChangeText={onChange} 
                  value={value} 
                  placeholder="Type a description"
                />
              )}
              /> 
            {errors.description && errors.description.type === "required" && <Text style={styles.error_msg}>Description is required</Text>}

        </Card>
        <TouchableOpacity onPress={pressedQuestion} style={styles.submit}>
              <Text style={styles.textbutton}>Post</Text>
          </TouchableOpacity>
      </ScrollView>
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
    marginVertical: 20,
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
      lineHeight: 14
  },
  des_title: {
    left: 5,
    marginTop: 20
  },
  input: {
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
    height: 51,
    width: 250,
    marginTop: 60,
    backgroundColor: "#2D9CDB",
    borderRadius: 100,
    justifyContent: "center",
    left: 65
  },
  textbutton: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: 'bold',
    color: "white",
  }, 
  error_msg: {
    color: 'red',
    left: 100,
    fontWeight: '400',
    top: 2
  }
});
