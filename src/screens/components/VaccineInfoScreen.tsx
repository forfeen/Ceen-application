import React, { useState, useEffect, useRef } from 'react';
import Swiper from 'react-native-swiper';
import { StyleSheet, TouchableOpacity, 
  FlatList, Linking, Alert, ScrollView, Animated } from 'react-native';
import { AntDesign, FontAwesome} from '@expo/vector-icons'; 
import Svg, { Rect, Circle} from 'react-native-svg';
import ContentLoader from 'react-native-masked-loader';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFont from 'react-native-vector-icons/FontAwesome5';
import { Text, View } from './Themed';
import { Card } from 'react-native-elements';
import Moment from 'moment';

import { auth } from '../../../firebase';
import Vaccine from '../../types/vaccine.type';
import Review from '../../types/reviews.type';
import Question from '../../types/questions.type';
import Post from '../../types/posts.type';
import vaccineService from '../services/vaccine.service';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const VaccineInfoScreen = ({route, navigation}) => {
  const { vaccineId } = route.params;
  const [vaccine, setVaccine] = useState<Vaccine>();
  const [review, setReviews] = useState<Review>();
  const [question, setQuestions] = useState<Question>();
  const [post, setPosts] = useState<Post>();
  const [vaccineLink, setLink] = useState<string>();
  const userMail = auth.currentUser.email;

  const MaskedInfoElement = getMaskedInfoElement();
  const MaskedElement = getMaskedElement();

  const offset = useRef(new Animated.Value(0)).current;

  async function getAllInfos() {
    return await vaccineService.getVaccine(vaccineId)
        .then(response => {
            return response.data;
        })
        .catch(e => {
            console.error(e);
        });
  }

  async function getAllReviews() {
    return await vaccineService.getReview(vaccineId)
        .then(response => {
            return response.data.items;
        })
        .catch(e => {
            console.error(e);
        });
  }

  async function getAllQuestions() {
    return await vaccineService.getQuestion(vaccineId)
        .then(response => {
            return response.data.items;
        })
        .catch(e => {
            console.error(e);
        });
  }

  async function getAllPosts() {
    return await vaccineService.getPost(vaccineId)
        .then(response => {
            return response.data.items;
        })
        .catch(e => {
            console.error(e);
        });
  }

  function putLikeQuestion(putData) {
    return vaccineService.likeQuestion(vaccineId, putData)
        .then(response => {
            navigation.push('Details', {vaccineId: vaccineId})
            return response.data;
        })
        .catch(e => {
            console.error(e);
        });
  }
  
  function putLikeReview(putData) {
    return vaccineService.likeReview(vaccineId, putData)
        .then(response => {
            navigation.push('Details', {vaccineId: vaccineId})
            return response.data;
        })
        .catch(e => {
            console.error(e);
        });
  }

  function putLikePost(putData) {
    return vaccineService.likePost(vaccineId, putData)
        .then(response => {
            navigation.push('Details', {vaccineId: vaccineId})
            return response.data;
        })
        .catch(e => {
            console.error(e);
        });
  }

  function deleteReview(id) {
    Alert.alert(
      'Delete review?',
      'This action cannot be undone. Are you sure you want to delete this review?',
      [   
          {text: 'OK', 
          onPress: () => vaccineService.deleteReviews(vaccineId, id)
              .then(response => {
                  navigation.push('Details', {vaccineId: vaccineId})
                  return response.data;
              })
              .catch(e => {
                  console.error(e);
              })
          },
          {text: 'Cancle', 
          onPress: () => console.log('Cancle')
          }
      ],  { cancelable: false }
    );
  }

  function deleteQuestion(id) {
    Alert.alert(
      'Delete question?',
      'This action cannot be undone. Are you sure you want to delete this question?',
      [   
          {text: 'OK', 
          onPress: () => vaccineService.deleteQuestion(vaccineId, id)
              .then(response => {
                  navigation.push('Details', {vaccineId: vaccineId})
                  return response.data;
              })
              .catch(e => {
                  console.error(e);
              })
          },
          {text: 'Cancle', 
          onPress: () => console.log('Cancle')
          }
      ],  { cancelable: false }
    );
  }

  function deletePost(id) {
    Alert.alert(
      'Delete post?',
      'This action cannot be undone. Are you sure you want to delete this post?',
      [   
          {text: 'OK', 
          onPress: () => vaccineService.deletePost(vaccineId, id)
              .then(response => {
                  navigation.push('Details', {vaccineId: vaccineId})
                  return response.data;
              })
              .catch(e => {
                  console.error(e);
              })
          },
          {text: 'Cancle', 
          onPress: () => console.log('Cancle')
          }
      ],  { cancelable: false }
    );
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

  async function dislikeQuestion(questionData) {
    var likeList = getUserList(questionData['isLike']);

    if (likeList.includes(userMail)) {
      var index = likeList.indexOf(userMail);
      likeList.splice(index, 1)
    }

    var dislikeString = getUserString(likeList);
    const dislikeData = {
      '#': questionData['#'],
      ownerId: questionData.ownerId,
      ownerName: questionData.ownerName,
      description: questionData.description,
      title: questionData.title,
      typePrice:	questionData.typePrice,
      typeLocation: 	questionData.typeLocation,
      typeEffect: questionData.typeLocation,
      likes: questionData.likes - 1,
      date: questionData.date,
      answers: questionData.answers,
      isLike: dislikeString
    };
    await putLikeQuestion(dislikeData);
  }

  async function likeQuestion(questionData) {

    var likeList = getUserList(questionData['isLike']);

    if (!likeList.includes(userMail)) {
      likeList.push(userMail);
    }
    var likeString = getUserString(likeList);

    const likeData = {
       '#': questionData['#'],
       ownerId: questionData.ownerId,
       ownerName: questionData.ownerName,
       description: questionData.description,
       title: questionData.title,
       typePrice:	questionData.typePrice,
       typeLocation: 	questionData.typeLocation,
       typeEffect: questionData.typeLocation,
       likes: questionData.likes + 1,
       date: questionData.date,
       answers: questionData.answers,
       isLike: likeString
    };
    await putLikeQuestion(likeData);
  }

  async function dislikePost(postData) {
    var likeList = getUserList(postData['isLike']);

    if (likeList.includes(userMail)) {
      var index = likeList.indexOf(userMail);
      likeList.splice(index, 1)
    }

    var dislikeString = getUserString(likeList);
    const dislikeData = {
      '#': postData['#'],
      ownerId: postData.ownerId,
      ownerName: postData.ownerName,
      description: postData.description,
      title: postData.title,
      likes: postData.likes - 1,
      date: postData.date,
      isLike: dislikeString,
    };
    await putLikePost(dislikeData);
  }

  async function likePost(postData) {

    var likeList = getUserList(postData['isLike']);

    if (!likeList.includes(userMail)) {
      likeList.push(userMail);
    }
    var likeString = getUserString(likeList);

    const likeData = {
       '#': postData['#'],
       ownerId: postData.ownerId,
       ownerName: postData.ownerName,
       description: postData.description,
       title: postData.title,
       likes: postData.likes + 1,
       date: postData.date,
       isLike: likeString,
    };
    await putLikePost(likeData);
  }

  async function dislikeReview(reviewData) {
    var likeList = getUserList(reviewData['isLike']);

    if (likeList.includes(userMail)) {
      var index = likeList.indexOf(userMail);
      likeList.splice(index, 1)
    }

    var dislikeString = getUserString(likeList);

    const dislikeData = {
      '#': reviewData['#'],
      ownerId: reviewData.ownerId,
      ownerName: reviewData.ownerName,
      description: reviewData.description,
      price: reviewData.price,
      location: reviewData.location,
      effects: reviewData.effects,
      currentDose: reviewData.currentDose,
      firstDose: reviewData.firstDose,
      secondDose: reviewData.secondDose,
      thirdDose: reviewData.thirdDose,
      fourthDose: reviewData.fourthDose,
      isLike: dislikeString,
      likes: reviewData.likes - 1,
      date: reviewData.date
    };
    await putLikeReview(dislikeData);
  }

  async function likeReview(reviewData) {

    var likeList = getUserList(reviewData['isLike']);

    if (!likeList.includes(userMail)) {
      likeList.push(userMail);
    }
    var likeString = getUserString(likeList);

    const likeData = {
       '#': reviewData['#'],
       ownerId: reviewData.ownerId,
       ownerName: reviewData.ownerName,
       description: reviewData.description,
       price: reviewData.price,
       location: reviewData.location,
       effects: reviewData.effects,
       currentDose: reviewData.currentDose,
       firstDose: reviewData.firstDose,
       secondDose: reviewData.secondDose,
       thirdDose: reviewData.thirdDose,
       fourthDose: reviewData.fourthDose,
       isLike: likeString,
       likes: reviewData.likes + 1,
       date: reviewData.date
    };
    await putLikeReview(likeData);
  }
  
  useEffect(() => {
    const fetchInfos = async () => {
      const vaccineData = await getAllInfos();
      setVaccine(vaccineData);
      setLink(vaccineData['link_info']);
    }
    
    const fetchReviews = async () => {
      const reviewData = await getAllReviews();
      setReviews(reviewData.reverse());
    }

    const fetchQuestions = async () => {
      const questionData = await getAllQuestions();
      setQuestions(questionData.reverse());
    }
    
    const fetchPosts = async () => {
      const postData = await getAllPosts();
      setPosts(postData.reverse());
    }
 
   fetchInfos();
   fetchReviews();
   fetchQuestions();
   fetchPosts();
  }, []);

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

  function isOwner(id): boolean {
    return userMail === id;
  }

  function getMaskedInfoElement() {
    return (
      <Svg height="100%" width="100%" fill={'black'}>
        <Rect x="10" y="10" rx="0" ry="0" width="40%" height="8" />
        <Rect x="10" y="30" rx="0" ry="0" width="94%" height="8" />
        <Rect x="10" y="50" rx="0" ry="0" width="94%" height="8" />
        <Rect x="67%" y="70" rx="0" ry="0" width="30%" height="8" />
        <Rect x="10" y="90" rx="0" ry="0" width="94%" height="120" />
      </Svg>
    );
  }

  function getMaskedElement() {
    return (
      <Svg height="100%" width="100%" fill={'black'}>
        <Circle cx="28" cy="28" r="22" />
        <Rect x="70" y="12" rx="0" ry="0" width="75%" height="8" />
        <Rect x="60" y="32" rx="0" ry="0" width="78%" height="8" />
        <Rect x="62%" y="52" rx="0" ry="0" width="35%" height="8" />
      </Svg> 
    );
  }

  if (vaccine === undefined && review === undefined
    && question === undefined && post === undefined) {
    return <View style={styles.masked_container}>
    <Card containerStyle={styles.masked_info}>
      <ContentLoader MaskedElement={MaskedInfoElement} dir={'rtl'} duration={2000} forColor="#93c2db" backColor="#5c96b8"/>
      {/* <ContentLoader MaskedElement={MaskedElement} dir={'rtl'} duration={2000} forColor="#87b9d4" backColor="#529fcc"/> */}
    </Card>
    <View style={{marginVertical: 30, backgroundColor: 'transparent'}}>
      <Card containerStyle={styles.masked_card}>
        <ContentLoader MaskedElement={MaskedElement} dir={'rtl'} duration={2000} forColor="#93c2db" backColor="#5c96b8"/>
      </Card>
      <Card containerStyle={styles.masked_card}>
        <ContentLoader MaskedElement={MaskedElement} dir={'rtl'} duration={2000} forColor="#93c2db" backColor="#5c96b8"/>
      </Card>
      <Card containerStyle={styles.masked_card}>
        <ContentLoader MaskedElement={MaskedElement} dir={'rtl'} duration={2000} forColor="#93c2db" backColor="#5c96b8"/>
      </Card>
      <Card containerStyle={styles.masked_card}>
        <ContentLoader MaskedElement={MaskedElement} dir={'rtl'} duration={2000} forColor="#93c2db" backColor="#5c96b8"/>
      </Card>
    </View>
  </View>
  }
  return (
    <SafeAreaProvider>
       {/* <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingTop: 10,
          alignItems: 'center'
        }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: offset } } }],
          { useNativeDriver: false }
        )}
      > */}
      <View style={styles.container}>
      <Card containerStyle={styles.card_info}>
          <Card containerStyle={styles.title_info}>
                <Text style={styles.info}>Information </Text>
          </Card>
          <Text style={{marginVertical: 10, marginHorizontal: 10, color: "black"}}>
            {vaccine?.long_description || ''} </Text>
            <Text style={styles.more_info}  onPress={ () => {  Linking.openURL(vaccineLink)}}>more infomation...</Text>
          <View style={styles.vac_info}>
            <Text style={styles.info_text}>ชื่อ: {vaccine?.name || ''}</Text>
            <Text style={styles.info_text}>ประเภท: {vaccine?.type || ''}</Text>
            <Text style={styles.info_text}>ผู้ผลิต: {vaccine?.manufacturer || ''}</Text>
            <Text style={styles.info_text}>ประสิทธิภาพ: {vaccine?.performance || ''}%</Text>
            <Text style={styles.info_text}>อาการไม่พึงประสงค์: {vaccine?.effects || ''}</Text>
            <Text style={styles.info_text}>ราคา: {vaccine?.average_per_dose || '0'} บาท</Text>
          </View>
      </Card>
      <Swiper
          style={styles.wrapper}
          paginationStyle={{
            position: 'absolute',
            bottom: '89%',
            left: '70%',
            // height: hp('80%'),
          }}
          // onMomentumScrollEnd={(state) =>
          //   console.log('index:', state.index)
          // }
          dot={
            <View
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: 'white',
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3
              }}
            />
          }
        >
          {/* Review */}
          <View style={{backgroundColor: 'transparent', marginBottom: 100}}>
            <Text style={styles.title_section}>Reviews</Text>
            <View style={{backgroundColor: 'transparent', alignItems: 'center'}}>
            <FlatList 
              data={review}
              renderItem={( {item} ) => {
                  return (
                    <View style={styles.card_section}>
                      <Text style={styles.date}> {Moment.utc(item.date).local().startOf('seconds').fromNow()} </Text>
                      <View style={styles.list}>
                        <View style={styles.circle}>
                          <Text>{item.ownerName.charAt(0)}{item.ownerName.charAt(1)}</Text>
                        </View> 
                        <Text style={{marginStart: 20, marginTop: 5, marginHorizontal: 60, color: "black"}}>
                          {item.description}
                        </Text>
                     </View>
                     <View style={{backgroundColor: 'transparent', flexDirection: 'row', width: 100}}>
                       <Text style={{fontSize: 13, left: 82, top: 10, bottom: 5, width: 250, lineHeight: 24, color: "black"}}>
                         Side effects: {item.effects}
                       </Text>
                      </View>
                      <View style={{backgroundColor: 'transparent'}}>
                        {
                          item.firstDose ?
                          <View style={styles.vaccineDose}>
                            <Text style={{fontSize: 13, lineHeight: 25, color: "black"}}>
                              <IconFont name="syringe" size={10}/> {item.firstDose} (1st)
                            </Text>
                          </View>
                          : false
                        }
                        {
                          item.secondDose ?  
                          <View style={styles.vaccineDose}>
                            <Text style={{fontSize: 13, lineHeight: 25}}>
                              <IconFont name="syringe" size={10}/><IconFont name="syringe" size={10}/> {item.secondDose} (2nd)
                            </Text>
                          </View>
                          : false
                        }
                        {
                          item.thirdDose ?  
                          <View style={styles.vaccineDose}>
                            <Text style={{fontSize: 13, lineHeight: 25}}>
                              <IconFont name="syringe" size={10}/><IconFont name="syringe" size={10}/><IconFont name="syringe" size={10}/> {item.thirdDose} (3rd)
                            </Text>
                          </View>
                          : false
                        }
                        {
                          item.fourthDose ?  
                          <View style={styles.vaccineDose}>
                            <Text style={{fontSize: 13, lineHeight: 25}}>
                              <IconFont name="syringe" size={10}/><IconFont name="syringe" size={10}/><IconFont name="syringe" size={10}/><IconFont name="syringe" size={10}/> {item.fourthDose} (4th)
                            </Text>
                          </View>
                          : false
                        }
                        <Text style={{fontSize: 13, left: 82, top: 10, bottom: 5, width: 250, lineHeight: 24, color: "black"}}>
                         Price: {item.price}
                       </Text>
                       <Text style={{fontSize: 13, left: 82, top: 10, bottom: 5, width: 250, lineHeight: 24, color: "black"}}>
                         Location: {item.location}
                       </Text>
                        
                     </View>
                     {
                            isOwner(item.ownerId) ?
                              <AntDesign
                                name="delete"
                                size={15}
                                color="black"
                                style={{left: 275, top: 30.5}}
                                onPress={()=> deleteReview(item['#'])} />
                            : false
                          }
                      <View style={styles.like}>
                        <Text>
                          {
                              checkLike(item.isLike) ? 
                                <View style={{backgroundColor: 'transparent'}}>
                                  <Text style={{color: "black"}}>
                                    <AntDesign name="like1" size={16} color="green" onPress={ () => {  dislikeReview(item)}} /> {item.likes}
                                  </Text>
                                </View>
                              :
                                <View style={{backgroundColor: 'transparent'}}>
                                  <Text style={{color: "black"}}>
                                    <AntDesign name="like2" size={16} color="green" onPress={ () => {  likeReview(item)}} /> {item.likes}
                                  </Text>
                              </View>
                            }
                        </Text>
                      </View>
                    </View>
                  );
              }}/>
              </View>
          </View>

           {/* Questions */}
          <View style={{backgroundColor: 'transparent'}}>
              <Text style={styles.title_section}>Questions/Answers</Text>
              <View style={{backgroundColor: 'transparent', alignItems: 'center'}}>
              <FlatList 
                data={question}
                renderItem={( {item} ) => {
                    return (
                      <TouchableOpacity
                        onPress={
                          () => {
                            navigation.navigate('Question', {vaccineId: vaccineId, questionId: item['#'], answerNumber: item.answers});
                          }
                      }>
                        <View style={styles.card_section} >
                            <Text style={styles.date}> {Moment.utc(item.date).local().startOf('seconds').fromNow()} </Text>
                            <View style={{backgroundColor: 'white', flexDirection: 'row', top: 14}}>
                              <View style={styles.circle_question}>
                                <Text><Text>{item.ownerName.charAt(0)}{item.ownerName.charAt(1)}</Text></Text>
                              </View>
                          </View>
                            {/* <View style={styles.list}> */}
                              <Text style={{marginStart: 75, marginTop: 2, marginHorizontal: 60, left: 10, lineHeight: 15, fontWeight: '800'}}>
                                {item.title}
                              </Text>
                          {/* </View> */}
                          <View style={styles.list}>
                          {
                                item?.typeLocation ? 
                                  <Card containerStyle={styles.title_type}>
                                    <Text style={styles.info_type}> Location </Text>
                                  </Card> 
                                :
                                  false
                              } 
                              {
                                item?.typePrice ? 
                                  <Card containerStyle={styles.title_type}>
                                    <Text style={styles.info_type}> Price </Text>
                                  </Card> 
                                :
                                  false
                              }
                              {
                                item?.typeEffect? 
                                  <Card containerStyle={styles.title_type}>
                                    <Text style={styles.info_type}> Effects </Text>
                                  </Card> 
                                :
                                  false
                              }
                          </View>
                          {
                            isOwner(item.ownerId) ?
                              <AntDesign
                                name="delete"
                                size={15}
                                color="black"
                                style={{left: 245, top: 30.5}}
                                onPress={()=> deleteQuestion(item['#'])} />
                            : false
                          }
                          <View style={styles.like}>
                            <Text>
                            {
                                checkLike(item.isLike) ? 
                                  <View style={{backgroundColor: 'transparent'}}>
                                    <Text>
                                      <AntDesign name="like1" size={16} color="green" onPress={ () => {  dislikeQuestion(item)}} /> {item.likes} <FontAwesome name="comment-o" size={16} color="black" /> {item.answers}
                                    </Text>
                                  </View>
                                :
                                  <View style={{backgroundColor: 'transparent'}}>
                                    <Text>
                                      <AntDesign name="like2" size={16} color="green" onPress={ () => {  likeQuestion(item)}} /> {item.likes} <FontAwesome name="comment-o" size={16} color="black" /> {item.answers}
                                    </Text>
                                </View>
                              }
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                }}/>
                </View>
            </View>

            {/* Timelines */}
            <View style={{backgroundColor: 'transparent'}}>
              <Text style={styles.title_section}>Timelines</Text>
              <View style={{backgroundColor: 'transparent', alignItems: 'center'}}>
              <FlatList 
                data={post}
                renderItem={( {item} ) => {
                    return (
                       <TouchableOpacity
                        onPress={
                          () => {
                            navigation.navigate('Post', {vaccineId: vaccineId, postId: item['#'], commentNumber: item.comments});
                          }
                        }>


                      <View style={styles.card_section}>
                        <Text style={styles.date}> {Moment.utc(item.date).local().startOf('seconds').fromNow()} </Text>
                        <View style={styles.list}>
                          <View style={styles.circle}>
                            <Text>{item.ownerName.charAt(0)}</Text>
                          </View> 
                          <Text style={{marginStart: 40, marginTop: 5, marginHorizontal: 60}}>
                          {item.description}</Text>
                      </View>
                      {
                        isOwner(item.ownerId) ?
                          <AntDesign
                            name="delete"
                            size={15}
                            color="black"
                            style={{left: 245, top: 30.5}}
                            onPress={()=> deletePost(item['#'])} />
                        : false
                      }
                        <View style={styles.like}>
                          <Text>

                          {
                              checkLike(item.isLike) ? 
                                <View style={{backgroundColor: 'transparent'}}>
                                  <Text style={{color: "black"}}>
                                    <AntDesign name="like1" size={16} color="green" onPress={ () => {  dislikeQuestion(item)}} /> {item.likes} <FontAwesome name="comment-o" size={16} color="black" /> {item.comments}
                                  </Text>
                                </View>
                              :
                                <View style={{backgroundColor: 'transparent'}}>
                                  <Text style={{color: "black"}}>
                                    <AntDesign name="like2" size={16} color="green" onPress={ () => {  likeQuestion(item)}} /> {item.likes} <FontAwesome name="comment-o" size={16} color="black" /> {item.comments}
                                  </Text>
                              </View>

                            }
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
              }}/>
            </View>
          </View>
          
        </Swiper>
       <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="New Review" onPress={() => navigation.push('Create Review', {vaccineId: vaccineId})}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="New Question" onPress={() => navigation.push('Create Question', {vaccineId: vaccineId})}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="New Post" onPress={() => navigation.push('Create Post', {vaccineId: vaccineId})}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
        </View>
    {/* </ScrollView> */}
    </SafeAreaProvider>
  );
}

export default VaccineInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CAEAF2',
  },
  card_info: {
    backgroundColor: 'white',
    // padding: 20,
    marginVertical: 20,
    // borderRadius: 10,
    width: 343,
    // height: 272,
    borderRadius: 20,
    elevation:0,
    borderWidth: 0
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
  date: {
    backgroundColor: 'transparent',
    top: 10,
    left: 245,
    fontWeight: '300',
    fontSize: 11,
    color: "black"
  },
  title_info: {
    backgroundColor: '#E2FFE9',
    width: 129,
    borderRadius: 12,
    elevation:0,
    borderWidth: 0,
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  info: {
    fontSize: 14,
    textAlign: 'center',
    color: '#2E8653'
  },
  more_info: {
    textAlign: 'right',
    fontSize: 11,
    color: "#2D9CDB"
  },
  vac_info: {
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: 'transparent',
    lineHeight: 20
  },
  info_text:{
    fontSize: 14, 
    lineHeight: 28,
    color: "black"
  },
  title_section: {
    fontSize: 22,
    marginHorizontal: 50,
    color: '#112A38',
  },
  wrapper: {
    marginVertical: 20,
  },
  card_section: {
    backgroundColor: 'white',
    marginVertical: 7,
    width: 343,
    // height: 160,
    borderRadius: 20,
    elevation:0,
    borderWidth: 0,
    // marginHorizontal: wp('5%'),
    paddingBottom: 40,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  add_button: {
    backgroundColor: '#2F80ED',
    width: 122,
    height:53,
    borderRadius: 100,
    elevation:0,                                             
    position: 'absolute',
    bottom: 15,   
    alignItems: 'center',                                 
  },
  circle: {
    width: 44,
    height: 44,
    borderRadius: 100,
    backgroundColor: '#2F80ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle_question: {
    width: 44,
    height: 44,
    borderRadius: 100,
    backgroundColor: '#2F80ED',
    alignItems: 'center',
    justifyContent: 'center',
    left: 20,
    top: 5
  },
  vaccineDose: {
    backgroundColor: 'transparent', 
    flexDirection: 'row',
    top: 10,
    left: 80,
    fontWeight: '100',
    flexWrap: 'wrap',
  },
    title_type: {
    backgroundColor: '#E2FFE9',
    width: 75,
    borderRadius: 12,
    borderWidth: 0,
    paddingVertical: 10,
    marginHorizontal: 4,
    marginTop: 9,
    paddingTop: 6,
    height: 26,
    left: 33
  },
  info_type: {
    fontSize: 10,
    textAlign: 'center',
    color: '#2E8653'
  },

//  masked_element
  masked_container: {
    flex: 1,
    backgroundColor: '#CAEAF2',
    alignItems: 'center',
  },
  masked_info: {
    backgroundColor: 'white',
    // padding: 20,
    marginVertical: 20,
    // borderRadius: 10,
    width: 343,
    height: 250,
    borderRadius: 20,
    elevation:0,
    borderWidth: 0
  },
  masked_card: {
    backgroundColor: 'white',
    marginVertical: 15,
    width: 343,
    height: 100,
    borderRadius: 20,
    elevation:0,
    borderWidth: 0
  },
  actionButtonIcon: {
    fontSize: 25,
    height: 30,
    color: 'white',
  },
});
