import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Alert } from 'react-native';
import ActionButton from 'react-native-action-button';
import Svg, { Circle, Rect } from 'react-native-svg';
import ContentLoader from 'react-native-masked-loader';
import Icon from 'react-native-vector-icons/Ionicons';
import { Card } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons'; 
import { Text, View } from './Themed';
import Moment from 'moment';

import vaccineService from '../services/vaccine.service';
import { auth } from '../../../firebase';
import Post from '../../types/posts.type';
import Comment from '../../types/comment.type';

const PostScreen = ({route, navigation}) => {

    const vaccineId  = route.params.vaccineId;
    const postId = route.params.postId;
    const commentNumber = route.params.commentNumber;
    
    const userMail = auth.currentUser.email;

    const [ post, setPost ] = useState<Post>();
    const [ comment, setComment] = useState<Comment[]>();

    const MaskedInfoElement = getMaskedInfoElement();
    const MaskedElement = getMaskedElement();

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

    async function getPost() {
        const data = await vaccineService.getEachPost(vaccineId, postId)
            .then(response => {
                return response.data;
            })
            .catch(e => {
                console.error(e);
            })
            return data;
    }

    async function getComment() {
      const data = await vaccineService.getComment(vaccineId)
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

    function putLikeComment(putData) {        
      const data = vaccineService.likeComment(vaccineId, putData)
          .then(response => {
              navigation.push('Post', {vaccineId: vaccineId, postId: postId, commentNumber: commentNumber});
              return response.data;
          })
          .catch(e => {
              console.error(e);
          })
          return data;
    }

    function deleteComment(id) {
      Alert.alert(
        'Delete comment?',
        'This action cannot be undone. Are you sure you want to delete this comment?',
        [   
            {text: 'OK', 
            onPress: () => vaccineService.deleteComment(vaccineId, id)
                .then(response => {
                    navigation.push('Post', {vaccineId: vaccineId, postId: postId, commentNumber: commentNumber})
                    return response.data;
                })
                .catch(e => {
                    console.error(e);
                })
            }
        ]
      );
    }

    function isOwner(id): boolean {
      return userMail === id;
    }

    async function dislikeComment(commentData) {
      var likeList = getUserList(commentData['isLike']);
    
      if (likeList.includes(userMail)) {
        var index = likeList.indexOf(userMail);
        likeList.splice(index, 1)
      }
    
      var dislikeString = getUserString(likeList);
    
      const dislikeData = {
        '#': commentData['#'],
        ownerId: commentData.ownerId,
        ownerName: commentData.ownerName,
        post_id: commentData.post_id,
        description: commentData.description,
        likes: commentData.likes - 1,
        date: commentData.date,
        isLike: dislikeString,
      };
      await putLikeComment(dislikeData);
    }
    
    async function likeComment(commentData) {
    
      var likeList = getUserList(commentData['isLike']);
      if (!likeList.includes(userMail)) {
        likeList.push(userMail);
      }
      var likeString = getUserString(likeList);      
      const likeData = {
        '#': commentData['#'],
        ownerId: commentData.ownerId,
        ownerName: commentData.ownerName,
        post_id: commentData.post_id,
        description: commentData.description,
        likes: commentData.likes + 1,
        date: commentData.date,
        isLike: likeString,
      };
      await putLikeComment(likeData);
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
      const fetchPost = async () => {
        const post = await getPost();
        setPost(post);
      }

      const fetchCommet = async () => {
        const comments = await getComment();
        const commentSameId = comments.filter((a) => a.post_id === postId);
        setComment(commentSameId.reverse());
        console.log(comment);
      }

      fetchPost();
      fetchCommet();
    }, []);

    if (post === undefined && comment === undefined) {
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
          <Card containerStyle={styles.card_info}>
            <Text style={styles.description}>{post?.description || ' '} </Text>
          </Card>
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={styles.title_section}>Comments</Text>
          </View>
          {
            commentNumber > 0 ?
            <FlatList 
              data={comment}
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
                    {
                            isOwner(item.ownerId) ? 
                              <AntDesign 
                                name="delete" 
                                size={15} 
                                color="black" 
                                style={{left: 275, top: 57}}
                                onPress={()=> deleteComment(item['#'])} />
                            : false
                          }
                      <View style={styles.like}>
                        <Text>
                          {
                                checkLike(item.isLike) ? 
                                  <View style={{backgroundColor: 'transparent'}}>
                                    <Text>
                                      <AntDesign name="like1" size={16} color="green" onPress={ () => {  dislikeComment(item)}} /> {item.likes}
                                    </Text>
                                  </View>
                                :
                                  <View style={{backgroundColor: 'transparent'}}>
                                    <Text>
                                      <AntDesign name="like2" size={16} color="green" onPress={ () => {  likeComment(item)}} /> {item.likes}
                                    </Text>
                                </View>
                            }                        
                        </Text>
                      </View>
                    </View>
                  );
              }}/>
              :               
               <Text style={{top: 100, fontSize: 20}}> No Comment </Text>
            } 
              <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => navigation.navigate('Create Comment', {vaccineId: vaccineId, post: post})} />
        </View>
        
  );
}

export default PostScreen;


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
