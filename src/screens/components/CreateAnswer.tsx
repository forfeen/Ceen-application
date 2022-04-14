import React, {} from 'react';
import { StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { useForm, Controller } from "react-hook-form";
import { Text, View } from './Themed';

import vaccineService from '../services/vaccine.service';
import { auth } from '../../../firebase';

const CreateAnswerScreen = ({route, navigation}) => {
    const vaccineId  = route.params.vaccineId;
    const question = route.params.question;
    
    const { control, handleSubmit, formState: { errors } } = useForm<Post>();
    const pressedPost = handleSubmit( data => createAnswer(data));
    var date = new Date();

    async function createAnswer(answerData) {
        const answer = {
            ownerId: auth.currentUser.email,
            ownerName: auth.currentUser.displayName,
            answer_id: question['#'],
            description: answerData.description,
            likes: 0,
            dislikes: 0,
            date: date
        };

        const data = await vaccineService.createAnswer(vaccineId, answer)
            .then(response => {
                Alert.alert(
                    'Success',
                    'The answer was created',
                    [
                        {text: 'OK',
                        onPress: () => navigation.navigate('Question', {vaccineId: vaccineId})},
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
            <Text style={styles.title}>{question?.title || ''}  </Text>
                <Text style={styles.description}>{question?.description || ' '} </Text>
                {
                    question?.type ? 
                    <View style={{backgroundColor: 'white', flexDirection: 'row'}}> 
                    {
                        question.type.split(',').map((type?) => 
                        <Card containerStyle={styles.title_info}>
                            <Text style={styles.info}> {type} </Text>
                        </Card>
                        )
                    }
                    </View>
                    :
                    <Text></Text>
                }    
        </Card>
        <View style={{backgroundColor: 'transparent'}}>
            <Text style={styles.title_section}>Answers</Text>
        </View>
        <Card containerStyle={styles.card_info}>
            <Controller
              control={control}
              rules={{ maxLength: 450, required: true }}
              name="description"
              render={({
                field: { onChange, onBlur, value, ref  },
              }) => (
                <TextInput 
                  style={styles.description_input}  
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
        <TouchableOpacity onPress={pressedPost} style={styles.submit}>
          <Text style={styles.textbutton}>Post</Text>
        </TouchableOpacity>
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
    width: 300,
    left: 5,
    marginTop: 20,
    lineHeight: 24,
    fontSize: 16
  },
  description_input: {
    height: 250,
    width: 300,
    margin: 4,
    borderWidth: 1,
    padding: 15,
    // top: 10,
    borderRadius: 20,
    lineHeight: 18
  },
  submit: {
    height: 51,
    width: 250,
    marginTop: 90,
    backgroundColor: "#2D9CDB",
    borderRadius: 100,
    justifyContent: "center",
  },
  title: {
    top: 10.73,
    left: 5,
    fontWeight: '500',
    fontSize: 22,
    flexDirection: 'row',
  },
  title_info: {
    backgroundColor: '#E2FFE9',
    width: 100,
    borderRadius: 12,
    elevation:0,
    borderWidth: 0,
    paddingVertical: 6,
    marginVertical: 24,
    marginHorizontal: 3,
  },
  info: {
    fontSize: 13,
    textAlign: 'center',
    color: '#2E8653'
  },
  title_section: {
    fontSize: 22,
    // marginHorizontal: 50,
    color: '#112A38',
    marginTop: 25,
    marginRight: 250
    // left: 2
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
    fontWeight: '400'
  }
});
