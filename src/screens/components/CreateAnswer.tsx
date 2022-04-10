import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Alert } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { Text, View } from './Themed';
import vaccineService from '../services/vaccine.service';

const CreateAnswerScreen = ({route, navigation}) => {
    const vaccineId  = route.params.vaccineId;
    const questionId = route.params.questionId;
    const question = route.params.question;
    const [des, onChangeDes] = React.useState('');

    async function createAnswer() {
        const answer = {
            //id: 0, // make it unique
            answer_id: questionId,
            description: des,
            likes: 0,
            dislikes: 0,
            date: 0
        };

        const data = await vaccineService.createAnswer(vaccineId, answer)
            .then(response => {
                Alert.alert(
                    'Success',
                    'The answer was created',
                    [
                        {text: 'OK',
                        onPress: () => navigation.navigate('Question', {vaccineId: vaccineId, questionId: questionId})},
                    ]
                );
                return response.data;
            })
            .catch(e => {
                console.error(e);
            })
            return data;
    }
   
    return (
        <View style={styles.container}>
        <Card containerStyle={styles.card_info}>
            <Text style={styles.question}> {question} </Text>
            <Text style={styles.des_title}> Answer: </Text>       
            <TextInput 
                multiline 
                style={styles.description}  
                onChangeText={onChangeDes}
                maxLength={450}
                value={des} 
                placeholder="Type a answer"
            />
        </Card>
        <Button 
            style={styles.submit} 
            title="Create"
            onPress={() => createAnswer()} />
        </View>
    );
}

export default CreateAnswerScreen;


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
  question: {
    top: 10.73,
    left: 5,
    height: 30.36,
    fontWeight: '300',
    fontSize: 20
  },
  des_title: {
    left: 5,
    marginTop: 20
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
