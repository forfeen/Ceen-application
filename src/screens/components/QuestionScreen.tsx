import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { Card } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons'; 
import { Text, View } from './Themed';
import vaccineService from '../services/vaccine.service';
import Question from '../../types/questions.type';
import Answer from '../../types/answer.type';

const QuestionScreen = ({route, navigation}) => {

    const vaccineId  = route.params.vaccineId;
    const questionId = route.params.questionId;

    console.log(vaccineId);
    console.log(questionId);

    
    const [ question, setQuestion ] = useState<Question>();
    const [ answer, setAnswer] = useState<Answer>();

    async function getQuestion() {
        const data = await vaccineService.getEachQuestion(vaccineId, questionId)
            .then(response => {
                return response.data;
            })
            .catch(e => {
                console.error(e);
            })
            return data;
    }

    async function getAnswer() {
      const data = await vaccineService.getAnswer(vaccineId)
          .then(response => {
              return response.data.items;
          })
          .catch(e => {
              console.error(e);
          })
          return data;
  }

    useEffect(() => {
        const fetchQuestion = async () => {
          const question = await getQuestion();
          setQuestion(question);
        }

        const fetchAnswer = async () => {
          const answers = await getAnswer();
          const answerSameId = answers.filter((a) => a.answer_id === questionId);
          console.log(answerSameId);
          setAnswer(answerSameId);
        }

        fetchQuestion();
        fetchAnswer();
      }, []);

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
          <FlatList 
              data={answer}
              renderItem={( {item} ) => {
                  return (
                    <View style={styles.card_section}>
                      <View style={styles.list}>
                        <View style={styles.circle}>
                        <Text>{item.id}</Text>
                        </View> 
                        <Text style={{marginStart: 20, marginTop: 5, marginHorizontal: 60}}>
                        {item.description}</Text>
                    </View>
                      <View style={styles.like}>
                        <Text>
                        <AntDesign name="like2" size={16} color="green" onPress={ () => {  }} /> {item.likes}   <AntDesign name="dislike2" size={16} color="red" onPress={ () => {  }} /> {item.dislikes}
                        </Text>
                      </View>
                    </View>
                  );
              }}/>
              <ActionButton buttonColor="rgba(231,76,60,1)">
                <ActionButton.Item buttonColor='#1abc9c' title="Create Answer" onPress={() => navigation.navigate('Create Answer', {vaccineId: vaccineId, questionId: question['#'], question: question.title})}>
                < Icon name="md-create" style={styles.actionButtonIcon} />
                </ActionButton.Item>
              </ActionButton>
        </View>
        
  );
}

export default QuestionScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CAEAF2',
    alignItems: 'center',
  },
  card_info: {
    backgroundColor: 'white',
    marginVertical: 20,
    // height: 250,
    // width: 343,
    borderRadius: 20,
    elevation:0,
    borderWidth: 0,
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
  title: {
    top: 10.73,
    left: 5,
    fontWeight: '500',
    fontSize: 22,
    flexDirection: 'row',
  },
  des_title: {
    left: 5,
    marginTop: 20
  },
  title_section: {
    fontSize: 22,
    // marginHorizontal: 50,
    color: '#112A38',
    marginTop: 25,
    marginRight: 250
    // left: 2
  },
  description: {
    // height: 240,
    width: 300,
    left: 5,
    marginTop: 20,
    lineHeight: 24,
    fontSize: 16
  },
  card_section: {
    backgroundColor: 'white',
    marginVertical: 7,
    width: 343,
    height: 160,
    borderRadius: 20,
    elevation:0,
    borderWidth: 0,
    marginHorizontal: 25,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    marginTop: 20,
    marginLeft: 20,
  },
  like:{
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 5,
    right: 15,
  },
  circle: {
    width: 44,
    height: 44,
    borderRadius: 100,
    backgroundColor: '#2F80ED',
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionButtonIcon: {
    fontSize: 25,
    height: 30,
    color: 'white',
  },
});
