import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity, ScrollView , FlatList} from 'react-native';
import Vaccine from '../../types/vaccine.type';
import Review from '../../types/reviews.type';
import Question from '../../types/questions.type';
import Post from '../../types/posts.type';
import Colors from '../../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import { Card } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import Swiper from 'react-native-swiper';
import vaccineService from '../services/vaccine.service';
import { AntDesign, FontAwesome} from '@expo/vector-icons'; 
import { ListItem } from 'react-native-elements/dist/list/ListItem';
import Svg, { Rect, Circle} from 'react-native-svg';
import ContentLoader from 'react-native-masked-loader';

const  VaccineInfoScreen = ({route, navigation}) => {
  const { vaccineId } = route.params;
  const [vaccine, setVaccine] = useState<Vaccine>();
  const [review, setReviews] = useState<Review>();
  const [question, setQuestions] = useState<Question>();
  const [post, setPosts] = useState<Post>();
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
  
  useEffect(() => {
    const fetchInfos = async () => {
      const vaccine = await getAllInfos();
      setVaccine(vaccine);
    }
    
    const fetchReviews = async () => {
      const review = await getAllReviews();
      setReviews(review);
    }

    const fetchQuestions = async () => {
      const question = await getAllQuestions();
      setQuestions(question);
    }
    
    const fetchPosts = async () => {
      const post = await getAllPosts();
      setPosts(post);
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
            <Text style={styles.more_info}>more infomation...</Text>
          <View style={styles.vac_info}>
            <Text style={styles.info_text}>Name: {vaccine?.name || ''}</Text>
            <Text style={styles.info_text}>Type: {vaccine?.type || ''}</Text>
            <Text style={styles.info_text}>Developer: {vaccine?.manufacturer || ''}</Text>
            <Text style={styles.info_text}>Performance: {vaccine?.performance || ''}%</Text>
            <Text style={styles.info_text}>Average price per dose: {vaccine?.average_per_dose || '0'} Baht</Text>
          </View>
      </Card>


        <Swiper
          style={styles.wrapper}
          paginationStyle={{
            position: 'absolute',
            bottom: 420,
            left: 240,
          }}
          onMomentumScrollEnd={(e, state, context) =>
            console.log('index:', state.index)
          }
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
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={styles.title_section}>Review</Text>
            <FlatList 
              data={review}
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
                        <AntDesign name="like2" size={16} color="black" /> {item.likes}   <AntDesign name="dislike2" size={16} color="black" /> {item.dislikes}
                        </Text>
                      </View>
                    </View>
                  );
              }}/>
          </View>

          <View style={{backgroundColor: 'transparent'}}>
            <Text style={styles.title_section}>Questions/Answer</Text>
            <FlatList 
              data={question}
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
                        <AntDesign name="like2" size={16} color="black" /> {item.likes}   <AntDesign name="dislike2" size={16} color="black" /> {item.dislikes}  <FontAwesome name="comment-o" size={16} color="black" /> 
                        </Text>
                      </View>
                    </View>
                  );
              }}/>
          </View>
          
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={styles.title_section}>Timeline</Text>
            <FlatList 
              data={post}
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
                        <AntDesign name="like2" size={16} color="black" /> {item.likes}   <AntDesign name="dislike2" size={16} color="black" /> {item.dislikes}
                        </Text>
                      </View>
                    </View>
                  );
              }}/>
          </View>
        </Swiper>
        <Card containerStyle={styles.add_button}>
                <Text style={{color: 'white', fontSize: 20}}>+</Text>
        </Card>
    {/* </ScrollView> */}
    </View>
  );
}

export default VaccineInfoScreen;

// function handleHelpPress() {
//   WebBrowser.openBrowserAsync(
//     'https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet'
//   );
// }

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
    height: 272,
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
  },
  info_text:{
    fontSize: 14, 
    lineHeight: 22
  },
  title_section: {
    fontSize: 22,
    marginHorizontal: 50,
    color: '#112A38'
  },
  wrapper: {
    marginVertical: 20,
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
    justifyContent: 'center'
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
});
