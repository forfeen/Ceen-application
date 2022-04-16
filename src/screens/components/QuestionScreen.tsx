import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { Card } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons'; 
import { Text, View } from './Themed';
import Moment from 'moment';

import vaccineService from '../services/vaccine.service';
import Question from '../../types/questions.type';
import Answer from '../../types/answer.type';
import { auth } from '../../../firebase';

const QuestionScreen = ({route, navigation}) => {

    const vaccineId  = route.params.vaccineId;
    const questionId = route.params.questionId;
    const userMail = auth.currentUser.email;

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

    function getUserList(user) {
      var userList = [];
      
      if (user) {
        user.split(',').map((mail?) => 
        userList.push(mail)
        )
      }

      return userList;
    }
  
    function getUserString(user) {
      var userString = '';
      user.map((x) => {
        userString += x;
        userString += ',';
      });
      return userString;
    }

    function putLikeAnswer(putData) {
      const data = vaccineService.likeAnswer(vaccineId, putData)
          .then(response => {
              return response.data;
          })
          .catch(e => {
              console.error(e);
          })
          return data;
    }

    async function dislikeAnswer(answer) {
      var likeList = getUserList(answer['isLike']);
    
      if (likeList.includes(userMail)) {
        var index = likeList.indexOf(userMail);
        likeList.splice(index, 1)
      }
    
      var dislikeString = getUserString(likeList);
    
      const dislikeData = {
        '#': answer['#'],
        ownerId: answer.ownerId,
        ownerName: answer.ownerName,
        answer_id: answer.answer_id,
        description: answer.description,
        likes: answer.likes - 1,
        date: answer.date,
        isLike: dislikeString,
      };
      await putLikeAnswer(dislikeData);
    }
    
    async function likeAnswer(answer) {
    
      var likeList = getUserList(answer['isLike']);
      if (!likeList.includes(userMail)) {
        likeList.push(userMail);
      }
      var likeString = getUserString(likeList);      
      const likeData = {
        '#': answer['#'],
        ownerId: answer.ownerId,
        ownerName: answer.ownerName,
        answer_id: answer.answer_id,
        description: answer.description,
        likes: answer.likes + 1,
        date: answer.date,
        isLike: likeString,
      };
      await putLikeAnswer(likeData);
    }

    function checkLike(id): boolean{
      var userLike = false;
      if (id) {
        id.split(',').map((mail) =>
          {
            if (mail === userMail) {
              userLike = !userLike
            }
          })
      }
      return userLike;
    }
    useEffect(() => {
      const fetchQuestion = async () => {
        const question = await getQuestion();
        setQuestion(question);
      }

      const fetchAnswer = async () => {
        const answers = await getAnswer();
        const answerSameId = answers.filter((a) => a.answer_id === questionId);
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
            <View style={{backgroundColor: 'white', flexDirection: 'row'}}>
              {
                  question?.typeEffect ? 
                    <Card containerStyle={styles.title_info}>
                      <Text style={styles.info}> Effects </Text>
                    </Card>
                  : false
              }
              {
                  question?.typeLocation ? 
                    <Card containerStyle={styles.title_info}>
                      <Text style={styles.info}> Location </Text>
                    </Card>
                  : false
              }
              {
                  question?.typePrice ? 
                    <Card containerStyle={styles.title_info}>
                      <Text style={styles.info}> Price </Text>
                    </Card>
                  : false
              }
            </View>
          </Card>
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={styles.title_section}>Answers</Text>
          </View>
          <FlatList 
              data={answer}
              renderItem={( {item} ) => {
                  return (
                    <View style={styles.card_section}>
                      <Text style={styles.date}> {Moment.utc(item.date).local().startOf('seconds').fromNow()} </Text>
                      <View style={styles.list}>
                        <View style={styles.circle}>
                          <Text>{item.ownerName.charAt(0)}</Text>
                        </View> 
                        <Text style={{marginStart: 20, marginTop: 5, marginHorizontal: 60}}>
                        {item.description}</Text>
                    </View>
                      <View style={styles.like}>
                        <Text>
                          {
                                checkLike(item.isLike) ? 
                                  <View style={{backgroundColor: 'transparent'}}>
                                    <Text>
                                      <AntDesign name="like1" size={16} color="green" onPress={ () => {  dislikeAnswer(item)}} /> {item.likes}
                                    </Text>
                                  </View>
                                :
                                  <View style={{backgroundColor: 'transparent'}}>
                                    <Text>
                                      <AntDesign name="like2" size={16} color="green" onPress={ () => {  likeAnswer(item)}} /> {item.likes}
                                    </Text>
                                </View>
                            }                        
                        </Text>
                      </View>
                    </View>
                  );
              }}/>
              <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => navigation.navigate('Create Answer', {vaccineId: vaccineId, question: question})} />
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
  date: {
    backgroundColor: 'transparent',
    top: 10,
    left: 245,
    fontWeight: '300',
    fontSize: 11
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
