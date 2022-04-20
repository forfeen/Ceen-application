import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import User from '../../types/user.type';
import { useForm, Controller } from "react-hook-form";
import React, {useState} from 'react';;
import { auth } from '../../../firebase'
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';

import { Text, View } from './Themed';
import Icon from '@expo/vector-icons/FontAwesome5';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const SignUpScreen = ({ navigation }) => {
    const { control, setValue, handleSubmit, formState: { errors } } = useForm<User>();
    const [hidePass, setHidePass] = useState(true);
    const pressedSignUp = handleSubmit(data => {
        if (data.password !== data.c_password) {
            alert("Password does not match");
        } else {
            createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(async userCredentials => {
                const user = userCredentials.user;
                await updateProfile(auth.currentUser, {
                    displayName: data.name
                })
                sendEmailVerification(user);
                // console.log(user);
                alert("Signed up success\nCheck your email for verification")
                navigation.push("LogIn")
            })
            .catch(error => alert(error.message))
        }
    });
    
    return (
        <View style={{backgroundColor: "white", flex: 1}}>
            <View style={{backgroundColor: "transparent", marginTop:50, alignItems: 'center'}}>
                <Controller
                    control={control}
                    rules={{ maxLength: 100, required: true }}
                    name="name"
                    render={({
                        field: { onChange, onBlur, value, name, ref },
                      }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur} // notify when input is touched
                            onChangeText={onChange}
                            value={value}
                            placeholder="Name"
                            placeholderTextColor="gray" 
                        />
                    )}
                />
                {errors.name && errors.name.type === "required" && <Text style={{color: "red"}}>Name is required</Text>}
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
                {errors.email && errors.email.type === "required" && <Text style={{color: "red"}}>Email is required</Text>}
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
                <Controller
                    control={control}
                    rules={{ maxLength: 100, required: true}}
                    name="c_password"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={{backgroundColor: "transparent"}}>
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry
                                placeholder="Confirm your password"
                                placeholderTextColor="gray" 
                            />
                        </View>
                        
                    )}
                />
                {errors.c_password && errors.c_password.type === "required" && <Text>Confirm password is required</Text>}

                <TouchableOpacity onPress={pressedSignUp} style={styles.button}>
                    <Text style={styles.textbutton}>Sign Up</Text>
                </TouchableOpacity>


            
            </View>
        </View>
    );
}

export default SignUpScreen;

const styles = StyleSheet.create({
    input: {
      height: hp('6%'),
      width: wp('85%'),
      margin: hp('1.8%'),
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#E8E8E8",
      backgroundColor: "#F6F6F6",
      fontSize: 16
    },
    button: {
        height: hp('7.7'),
        width: wp('85%'),
        marginTop: hp('12%'),
        backgroundColor: "#2D9CDB",
        borderRadius: 100,
        justifyContent: "center",
    },
    hide: {
        position: "absolute",
        left: wp('80%'),
        top: hp('4%'),

    },
    textbutton: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: 'bold',
        color: "white",
    }
});
  