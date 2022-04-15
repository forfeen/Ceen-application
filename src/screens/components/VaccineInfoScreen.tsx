import React, { useState, useEffect } from 'react';
import Swiper from 'react-native-swiper';
import { StyleSheet, TouchableOpacity , FlatList} from 'react-native';
import { AntDesign, FontAwesome} from '@expo/vector-icons'; 
import Svg, { Rect, Circle} from 'react-native-svg';
import ContentLoader from 'react-native-masked-loader';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFont from 'react-native-vector-icons/FontAwesome5';
import { Text, View } from './Themed';
import { Card } from 'react-native-elements';
import { Linking } from 'react-native';
import Moment from 'moment';

import Vaccine from '../../types/vaccine.type';
import Review from '../../types/reviews.type';
import Question from '../../types/questions.type';
import Post from '../../types/posts.type';
import vaccineService from '../services/vaccine.service';

const VaccineInfoScreen = ({route, navigation}) => {
  const { vaccineId } = route.params;
  const [vaccine, setVaccine] = useState<Vaccine>();
  const [review, setReviews] = useState<Review>();
  const [question, setQuestions] = useState<Question>();
  const [post, setPosts] = useState<Post>();
  const [vaccineLink, setLink] = useState<string>();
  const MaskedInfoElement = getMaskedInfoElement();
  const MaskedElement = getMaskedElement();

  async function getAllInfos() {
    const data = await vaccineService.getVaccine(vaccineId)
        .then(response => {
            return response.data;
        })
        .catch(e => {
            console.error(e);
        })
        return data;
  }

  async function getAllReviews() {
    const data = await vaccineService.getReview(vaccineId)
        .then(response => {
            return response.data.items;
        })
        .catch(e => {
            console.error(e);
        })
        return data;
  }

  async function getAllQuestions() {
    const data = await vaccineService.getQuestion(vaccineId)
        .then(response => {
            return response.data.items;
        })
        .catch(e => {
            console.error(e);
        })
        return data;
  }

  async function getAllPosts() {
    const data = await vaccineService.getPost(vaccineId)
        .then(response => {
            return response.data.items;
        })
        .catch(e => {
            console.error(e);
        })
        return data;
  }

  function putLikeQuestion(putData) {
    const data = vaccineService.likeQuestion(vaccineId, putData)
        .then(response => {          
            return response.data;
        })
        .catch(e => {
            console.error(e);
        })
        return data;
  }
  
  function putLikeReview(putData) {
    const data = vaccineService.likeReview(vaccineId, putData)
        .then(response => {
            return response.data;
        })
        .catch(e => {
            console.error(e);
        })
        return data;
  }

  function putLikePost(putData) {
    const data = vaccineService.likePost(vaccineId, putData)
        .then(response => {          
            return response.data;
        })
        .catch(e => {
            console.error(e);
        })
        return data;
  }

  async function dislikeQuestion(question) {
    const dislikeData = {
       '#': question['#'],
       id: question.id,
       description: question.description,
       title: question.title,
       type: question.type,
       likes: question.likes,
       dislikes: question.dislikes + 1,
       date: question.date
    };
    await putLikeQuestion(dislikeData);
  }

  async function likeQuestion(question) {
    const likeData = {
       '#': question['#'],
       id: question.id,
       description: question.description,
       title: question.title,
       type: question.type,
       likes: question.likes + 1,
       dislikes: question.dislikes,
       date: question.date
    };
    await putLikeQuestion(likeData);
  }

  async function dislikePost(post) {
    const dislikeData = {
       '#': post['#'],
       id: post.id,
       description: post.description,
       title: post.title,
       likes: post.likes,
       dislikes: post.dislikes + 1,
       date: post.date
    };
    await putLikePost(dislikeData);
  }

  async function likePost(post) {
    const likeData = {
       '#': post['#'],
       id: post.id,
       description: post.description,
       title: post.title,
       likes: post.likes + 1,
       dislikes: post.dislikes,
       date: post.date
    };
    await putLikePost(likeData);
  }

  async function dislikeReview(review) {
    const dislikeData = {
       '#': review['#'],
       id: review.id,
       description: review.description,
       price: review.price,
       location: review.location,
       effects: review.effects,
       likes: review.likes,
       dislikes: review.dislikes + 1,
       date: review.date
    };
    await putLikeReview(dislikeData);
  }

  async function likeReview(review) {
    const likeData = {
       '#': review['#'],
       id: review.id,
       description: review.description,
       price: review.price,
       location: review.location,
       effects: review.effects,
       likes: review.likes + 1,
       dislikes: review.dislikes,
       date: review.date
    };
    await putLikeReview(likeData);
  }
  
  useEffect(() => {
    const fetchInfos = async () => {
      const vaccine = await getAllInfos();
      setVaccine(vaccine);
      setLink(vaccine.link_info);
    }
    
    const fetchReviews = async () => {
      const reviewData = await getAllReviews();
      setReviews(reviewData);
    }

    const fetchQuestions = async () => {
      const questionData = await getAllQuestions();
      setQuestions(questionData);
    }
    
    const fetchPosts = async () => {
      const postData = await getAllPosts();
      setPosts(postData);
    }
 
   fetchInfos();
   fetchReviews();
   fetchQuestions();
   fetchPosts();
  }, []);

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
    <View style={styles.container}>
      {/* <ScrollView> */}
      <Card containerStyle={styles.card_info}>
          <Card containerStyle={styles.title_info}>
                <Text style={styles.info}>Information </Text>
          </Card>
          <Text style={{marginVertical: 10, marginHorizontal: 10}}>
            {vaccine?.long_description || ''} </Text>
            <Text style={styles.more_info}  onPress={ () => {  Linking.openURL(vaccineLink)}}>more infomation...</Text>
          <View style={styles.vac_info}>
            <Text style={styles.info_text}>Name: {vaccine?.name || ''}</Text>
            <Text style={styles.info_text}>Type: {vaccine?.type || ''}</Text>
            <Text style={styles.info_text}>Developer: {vaccine?.manufacturer || ''}</Text>
            <Text style={styles.info_text}>Performance: {vaccine?.performance || ''}%</Text>
            <Text style={styles.info_text}>Side effects: {vaccine?.effects || ''}</Text>
            <Text style={styles.info_text}>Average price per dose: {vaccine?.average_per_dose || '0'} Baht.</Text>
          </View>
      </Card>
      <Swiper
          style={styles.wrapper}
          paginationStyle={{
            position: 'absolute',
            bottom: 420,
            left: 240,
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
          <View style={{backgroundColor: 'transparent', marginBottom: 100}}>
            <Text style={styles.title_section}>Reviews</Text>
            <FlatList 
              data={review}
              renderItem={( {item} ) => {
                  return (
                    <View style={styles.card_section}>
                      <Text style={styles.date}> {Moment.utc(item.date).local().startOf('seconds').fromNow()} </Text>
                      <View style={styles.list}>
                        <View style={styles.circle}>
                          <Text>{item.ownerName.charAt(0)}</Text>
                        </View> 
                        <Text style={{marginStart: 20, marginTop: 5, marginHorizontal: 60}}>
                          {item.description}
                        </Text>
                     </View>
                     <View style={{backgroundColor: 'transparent', flexDirection: 'row', width: 100}}>
                       <Text style={{fontSize: 13, left: 82, top: 10, bottom: 5, width: 250, lineHeight: 24, }}>
                         Side effects: {item.effects}
                       </Text>
                      </View>
                      <View style={{backgroundColor: 'transparent'}}>
                        {
                          item.firstDose ?
                          <View style={styles.vaccineDose}>
                            <Text style={{fontSize: 13, lineHeight: 25}}>
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
                     </View>
                      <View style={styles.like}>
                        <Text>
                          <AntDesign name="like2" size={16} color="green"  onPress={ () => {  likeReview(item)}} /> {item.likes}   <AntDesign name="dislike2" size={16} color="red" onPress={ () => {  dislikeReview(item)}} /> {item.dislikes}
                        </Text>
                      </View>
                    </View>
                  );
              }}/>
          </View>

          <View style={{backgroundColor: 'transparent', marginBottom: 100}}>
            <Text style={styles.title_section}>Questions/Answers</Text>
            <FlatList 
              data={question}
              renderItem={( {item} ) => {
                  return (
                    <TouchableOpacity
                      onPress={
                        () => {
                          navigation.navigate('Question', {vaccineId: vaccineId, questionId: item['#']});
                        }
                    }>
                      <View style={styles.card_section} >
                          <Text style={styles.date}> {Moment.utc(item.date).local().startOf('seconds').fromNow()} </Text>
                          <View style={{backgroundColor: 'white', flexDirection: 'row', top: 14}}>
                            <View style={styles.circle_question}>
                              <Text>{item.ownerName.charAt(0)}</Text>
                            </View>
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
                          {/* <View style={styles.list}> */}
                            <Text style={{marginStart: 75, marginTop: 15, marginHorizontal: 60, left: 10, lineHeight: 25}}>
                              {item.description}
                            </Text>
                        {/* </View> */}

                        <View style={styles.like}>
                          <Text>
                            <AntDesign name="like2" size={16} color="green" onPress={ () => {  likeQuestion(item)}} /> {item.likes}   <AntDesign name="dislike2" size={16} color="red" onPress={ () => {  dislikeQuestion(item)}} /> {item.dislikes}  <FontAwesome name="comment-o" size={16} color="black" /> 
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
              }}/>
          </View>
          
          <View style={{backgroundColor: 'transparent', marginBottom: 100}}>
            <Text style={styles.title_section}>Timelines</Text>
            <FlatList 
              data={post}
              renderItem={( {item} ) => {
                  return (
                    <View style={styles.card_section}>
                      <Text style={styles.date}> {Moment.utc(item.date).local().startOf('seconds').fromNow()} </Text>
                      <View style={styles.list}>
                        <View style={styles.circle}>
                          <Text>{item.ownerName.charAt(0)}</Text>
                        </View> 
                        <Text style={{marginStart: 40, marginTop: 5, marginHorizontal: 60}}>
                        {item.description}</Text>
                    </View>
                      <View style={styles.like}>
                        <Text>
                          <AntDesign name="like2" size={16} color="green" onPress={ () => {  likePost(item)}} /> {item.likes}   <AntDesign name="dislike2" size={16} color="red" onPress={ () => {  dislikePost(item)}} /> {item.dislikes}
                        </Text>
                      </View>
                    </View>
                  );
              }}/>
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
  );
}

export default VaccineInfoScreen;

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
    fontSize: 11
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
    lineHeight: 40
  },
  info_text:{
    fontSize: 14, 
    lineHeight: 28
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
    marginHorizontal: 25,
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
