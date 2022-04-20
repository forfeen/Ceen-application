import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import User from '../../types/user.type'
import { useForm, Controller } from "react-hook-form";
import React, {useEffect, useState} from 'react';
import { auth } from '../../../firebase'
import { signInWithEmailAndPassword, 
    sendEmailVerification, 
    sendPasswordResetEmail
} from 'firebase/auth';

import { Text, View } from './Themed';
import Icon from '@expo/vector-icons/FontAwesome5';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function LoginScreen({ route, navigation }) {
    const { control, setValue, handleSubmit, formState: { errors } } = useForm<User>();
    const [hidePass, setHidePass] = useState(true);

    const pressedLogin = handleSubmit(data => {
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then(userCredentials => {
            const user = userCredentials.user;
            if (user && user.emailVerified) {
                navigation.push("Index");
            } else {
                sendEmailVerification(user);
                alert("Check your email for verification mail before logging in")
            }
        })
        .catch(error => alert(error.message));
    });

    const pressedLoginGoogle = () => {

    };

    const forgetPasswordHandler = handleSubmit(data => {
        sendPasswordResetEmail(auth, data.email)
        .then(() => alert("Check your email for reset password"))
        .then(auth.signOut)
    });
    
    return (
        <View style={{backgroundColor: "white", flex: 1}}>
            <View style={{backgroundColor: "transparent", marginTop:50, alignItems: 'center'}}>
                <Controller
                    control={control}
                    rules={{ maxLength: 100, required: true}}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Email"
                            placeholderTextColor="gray" 
                        />
                    )}
                />
                {errors.email && errors.email.type === "required" && <Text style={{color: "red"}} >Email is required</Text>}
                <Controller
                    control={control}
                    rules={{ maxLength: 100, required: true}}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={{backgroundColor: "transparent"}}>
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry={hidePass ? true : false}
                                placeholder="Password"
                                placeholderTextColor="gray" 
                            />
                            <Icon
                                style={styles.hide}
                                name={hidePass ? 'eye-slash' : 'eye'}
                                size={16}
                                color="#2D9CDB"
                                onPress={() => setHidePass(!hidePass)}
                            />
                        </View>
                        
                    )}
                />
    
                {errors.password && errors.password.type === "required" && <Text style={{color: "red"}}>Password is required</Text>}

                <TouchableOpacity 
                    onPress={pressedLogin} 
                    style={styles.button}>
                    <Text style={styles.textLogin}>Log In</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={forgetPasswordHandler}>
                    <Text style={styles.forgot}>Forgot your password?</Text>
                </TouchableOpacity>
                {/* <View style={{
                    backgroundColor: "transparent", 
                    flexDirection: 'row', 
                    alignItems: 'center',
                    marginTop: 50}}>
                    <View style={{flex: 1, height: 1, backgroundColor: '#808080'}} />
                        <Text style={{width: 50, textAlign: 'center', color: "#808080"}}>or</Text>
                    <View style={{flex: 1, height: 1, backgroundColor: '#808080'}} />
                </View> */}
                {/* <TouchableOpacity onPress={pressedLoginGoogle} style={styles.withButton}>
                <View style={{
                    backgroundColor: "transparent", 
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent:'center'}}>
                    <Image source={require('../../assets/images/icon-google.png')} style={styles.icon}/>
                    <Text style={styles.textWithGoogle}>Log In with Google</Text>
                </View>
                </TouchableOpacity> */}
            
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
      height: hp('6%'),
      width: wp('85%'),
      margin: hp('1.8%'),
      paddingLeft: '4%',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#E8E8E8",
      backgroundColor: "#F6F6F6",
      fontSize: wp('4.2%')
    },
    button: {
        height: hp('7.7'),
        width: wp('85%'),
        marginTop: hp('8%'),
        backgroundColor: "#2D9CDB",
        borderRadius: 100,
        justifyContent: "center",
    },
    withButton: {
        height: hp('7.7'),
        width: wp('85%'),
        marginTop: hp('7.5%'),
        backgroundColor: "#e8e8e8",
        borderRadius: 100,
        justifyContent: "center",
    },
    hide: {
        position: "absolute",
        left: wp('80%'),
        top: hp('4%'),
    },

    textLogin: {
        textAlign: "center",
        fontSize: wp('4.2%'),
        fontWeight: 'bold',
        color: "white",
    },
    textWithGoogle:{
        textAlign: "center",
        fontSize: wp('4.2%'),
        fontWeight: 'bold',
        color: "black",
        paddingLeft: wp('2%')
    },
    forgot: {
        textAlign: "center",
        fontSize: wp('4.2%'),
        fontWeight: 'bold',
        color: "#2D9CDB",
        marginTop: hp('1.5%'),
    },
    icon: {
        width: 35,
        height: 35,
        borderRadius: 100,
        backgroundColor: 'transparent',
        alignItems: 'center',
    }
});
