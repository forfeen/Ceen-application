/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, Text } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import IndexScreen from '../screens/IndexScreen';
import VaccineInfoScreen from '../screens/components/VaccineInfoScreen';
import SignUpScreen from '../screens/components/SignUpScreen';
import LoginScreen from '../screens/components/LoginScreen';
import MapScreen from '../screens/components/MapScreen';
import UserProfile from '../screens/components/UserProfile';
import StartScreen from '../screens/components/StartScreen';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../../types';
import LinkingConfiguration from './LinkingConfiguration';
import CreateReviewScreen from '../screens/components/CreateReview';
import CreateQuestionScreen from '../screens/components/CreateQuestionScreen';
import CreatePostScreen from '../screens/components/CreatePostScreen';
import QuestionScreen from '../screens/components/QuestionScreen';
import CreateAnswerScreen from '../screens/components/CreateAnswerScreen';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName='Start' ///the name of the initial screen
      >
      <Stack.Screen 
      name="Start" 
      component={StartScreen} 
      options={{
        headerShadowVisible: false,
        headerShown: false,
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 23,
        },
      }}
      />
      <Stack.Screen 
        name="LogIn"
        component={LoginScreen}
        options ={({ route, navigation }) => ({ 
          title: 'Log In',
          headerShadowVisible: false,
          headerBackVisible: false,
          headerStatusBarHeight: 50,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
          headerRight: () => (
            <Pressable
              onPress={() => {
                navigation.push('SignUp');
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
                {({ pressed }) => (
              <Text style={{color: "#2D9CDB", fontSize: 16}}>
                {pressed ? 'Sign Up' : 'Sign Up'}
              </Text>
          )}
            </Pressable>
          ),
        })}
      />
      <Stack.Screen 
      name="SignUp" 
      component={SignUpScreen} 
      options ={({ route, navigation }) => ({ 
        title: 'Sign Up',
        headerShadowVisible: false,
        headerStatusBarHeight: 50,
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
        },
        headerLeft: () => (
          <Pressable
            onPress={() => {
              navigation.push('LogIn');
            }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
            })}>
              {({ pressed }) => (
            <Text style={{color: "#2D9CDB", fontSize: 16}}>
              {pressed ? 'Log in' : 'Log in'}
            </Text>
        )}
          </Pressable>
        ),
      })}
      />
      <Stack.Screen 
        name="Index" 
        component={IndexScreen} 
        options ={({ route, navigation }) => ({ 
          title: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#E4F3F6',
            
          },
          // headerTintColor: '#000',
          // headerTitleStyle: {
          //   fontWeight: 'bold',
          //   fontSize: 20,
          // },
          headerLeft: () => (
            <Text style={{fontWeight: 'bold', fontSize: 25}}>Ceen</Text>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => {
                navigation.push('Profile');
              
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <Feather
                name="user"
                size={22}
                color="#B1B1B3"
                style={{ marginRight: 5 }}
              />
            </Pressable>
          ),
        })}
         />
      <Stack.Screen name="Map" 
        component={MapScreen}
        options={{
          title: 'Location',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 23,
          },
        }}
      />
      <Stack.Screen name="Details"
        component={VaccineInfoScreen}
        options ={({ route, navigation }) => ({ 
          title: 'Details',
          headerTintColor: '#000',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 23,
          },
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.push('Index');
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
                {({ pressed }) => (
              <Ionicons name="chevron-back-outline" size={24} color="black" />
          )}
            </Pressable>
          ),
          
        })}
      />
      <Stack.Screen name="Profile" component={UserProfile} />
      <Stack.Screen name="Question" 
        component={QuestionScreen}
        options ={({ navigation }) => ({ 
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
                {({}) => (
              <Ionicons name="chevron-back-outline" size={24} color="black" />
          )}
            </Pressable>
          ), 
        })}
      />
      <Stack.Screen 
        name="Create Review" 
        component={CreateReviewScreen}
        options ={({ navigation }) => ({ 
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
                {({ }) => (
              <Ionicons name="chevron-back-outline" size={24} color="black" />
          )}
            </Pressable>
          ), 
        })}  
      />
      <Stack.Screen 
        name="Create Post" 
        component={CreatePostScreen}
        options ={({ navigation }) => ({ 
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
                {({ }) => (
              <Ionicons name="chevron-back-outline" size={24} color="black" />
          )}
            </Pressable>
          ), 
        })}   
      />
      <Stack.Screen 
        name="Create Question" 
        component={CreateQuestionScreen}
        options ={({ navigation }) => ({ 
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
                {({ }) => (
              <Ionicons name="chevron-back-outline" size={24} color="black" />
          )}
            </Pressable>
          ), 
        })}  
        />
      <Stack.Screen 
        name="Create Answer" 
        component={CreateAnswerScreen}
        options ={({ navigation }) => ({ 
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
                {({ }) => (
              <Ionicons name="chevron-back-outline" size={24} color="black" />
          )}
            </Pressable>
          ), 
        })}
      />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
