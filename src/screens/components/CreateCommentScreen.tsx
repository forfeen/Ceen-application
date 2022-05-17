import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { useForm, Controller } from "react-hook-form";
import { Text, View } from './Themed';

import vaccineService from '../services/vaccine.service';
import { auth } from '../../../firebase';
import Comment from '../../types/comment.type';

const CreateCommentScreen = ({route, navigation}) => {
    const vaccineId  = route.params.vaccineId;
    const post = route.params.post;
    
    const { control, handleSubmit, formState: { errors } } = useForm<Comment>();
    const pressedPost = handleSubmit( data => createComment(data));
    const [ comment, setComment] = useState<Comment[]>();

    var date = new Date();

    async function createComment(commentData) {
        const comment = {
            ownerId: auth.currentUser.email,
            ownerName: auth.currentUser.displayName,
            post_id: post['#'],
            description: commentData.description,
            likes: 0,
            dislikes: 0,
            date: date
        };

        return await vaccineService.createComment(vaccineId, comment)
            .then(response => {
                Alert.alert(
                    'Success',
                    'The comment was created.',
                    [
                        {text: 'OK',
                        onPress: () => navigation.push('Post', {vaccineId: vaccineId, postId: post['#'], commentNumber: post.comments})},
                    ]
                );
                return response.data;
            })
            .catch(e => {
                console.error(e);
            });
    }

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

    function deleteAnswer(id) {
      Alert.alert(
        'Delete comment?',
        'This action cannot be undone. Are you sure you want to delete this comment?',
        [   
            {text: 'OK', 
            onPress: () => vaccineService.deleteAnswer(vaccineId, id)
                .then(response => {
                    navigation.push('Question', {vaccineId: vaccineId, questionId: questionId, answerNumber: answerNumber})
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
    //   const fetchQuestion = async () => {
    //     const question = await getQuestion();
    //     setQuestion(question);
    //   }

      const fetchComment = async () => {
        const answers = await getComment();
        const answerSameId = answers.filter((a) => a.post_id === post['#']);
        setComment(answerSameId.reverse());
      }

    //   fetchQuestion();
        fetchComment();
    }, []);
   
    return (
        <View style={styles.container}>
        <ScrollView>
          <Card containerStyle={styles.card_info}>
            <Text style={styles.title}>{post?.title || ''}  </Text>
            <Text style={styles.description}>{post?.description || ' '} </Text>
          </Card>
          <View style={{backgroundColor: 'transparent'}}>
              <Text style={styles.title_section}>Comments</Text>
          </View>
          <Card containerStyle={styles.card_info}>
              <Controller
                control={control}
                rules={{ maxLength: 450, required: true }}
                name="description"
                render={({
                  field: { onChange, onBlur, value},
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
        </ScrollView>
        </View>
    );
}

export default CreateCommentScreen;


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
    left: 60
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
    color: '#112A38',
    marginTop: 25,
    marginRight: 250,
    left: 5
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
