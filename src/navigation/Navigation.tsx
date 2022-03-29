/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Feather, FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../../types';
import LinkingConfiguration from './LinkingConfiguration';
import CreateReviewScreen from '../screens/components/CreateReview';
import CreateQuestionScreen from '../screens/components/CreateQuestion';
import CreatePostScreen from '../screens/components/CreatePost';


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
    <Stack.Navigator>
      <Stack.Screen 
      name="SignUp" 
      component={SignUpScreen} 
      options ={({ route, navigation }) => ({ 
        headertitle: 'Sign Up',
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
        headerRight: () => (
          <Pressable
            onPress={() => {
              navigation.navigate('Login');
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
        name="Login"
        component={LoginScreen}
        options ={({ route, navigation }) => ({ 
          headertitle: 'Sign Up',
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
                navigation.navigate('SignUp');
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
        name="Index" 
        component={IndexScreen} 
        options={{
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
        }}
         />
      <Stack.Screen name="Details" component={VaccineInfoScreen} />
      <Stack.Screen name="Review" component={CreateReviewScreen} />
      <Stack.Screen name="Post" component={CreatePostScreen} />
      <Stack.Screen name="Question" component={CreateQuestionScreen} />

      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      {/* <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group> */}
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
// const BottomTab = createBottomTabNavigator<RootTabParamList>();

// function BottomTabNavigator() {
//   const colorScheme = useColorScheme();

//   return (
//     <BottomTab.Navigator
//       initialRouteName="TabOne"
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme].tint,
//       }}>
//       <BottomTab.Screen
//         name="TabOne"
//         component={TabOneScreen}
//         options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
//           title: 'Tab One',
//           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
//           headerRight: () => (
//             <Pressable
//               onPress={() => navigation.navigate('Modal')}
//               style={({ pressed }) => ({
//                 opacity: pressed ? 0.5 : 1,
//               })}>
//               <FontAwesome
//                 name="info-circle"
//                 size={25}
//                 color={Colors[colorScheme].text}
//                 style={{ marginRight: 15 }}
//               />
//             </Pressable>
//           ),
//         })}
//       />
//       <BottomTab.Screen
//         name="TabTwo"
//         component={TabTwoScreen}
//         options={{
//           title: 'Tab Two',
//           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
//         }}
//       />
//     </BottomTab.Navigator>
//   );
// }

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
