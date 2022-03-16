import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import User from '../../types/user.type'
import { useForm, Controller } from "react-hook-form";
import React, {useState} from 'react';

import Colors from '../../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import Icon from '@expo/vector-icons/FontAwesome5';

export default function LoginScreen({ route, navigation }) {
    const { control, setValue, handleSubmit, formState: { errors } } = useForm<User>();
    const [hidePass, setHidePass] = useState(true);
    const pressedLogin = handleSubmit(data => console.log(data));
    
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
                        />
                    )}
                />
                {errors.email && errors.email.type === "required" && <Text>Email is required</Text>}
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
                {errors.password && errors.password.type === "required" && <Text>Password is required</Text>}

                <TouchableOpacity 
                    // onPress={pressedLogin} 
                    onPress={() =>  navigation.navigate('Index')}
                    style={styles.button}>
                    <Text style={styles.textbutton}>Log In</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> console.log("forgot")}>
                    <Text style={styles.forgot}>Forgot your password?</Text>
                </TouchableOpacity>
            
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
      height: 50,
      width: 343,
      margin: 12,
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#E8E8E8",
      backgroundColor: "#F6F6F6",
      fontSize: 16
    },
    button: {
        height: 51,
        width: 343,
        marginTop: 90,
        backgroundColor: "#2D9CDB",
        borderRadius: 100,
        justifyContent: "center",
    },
    hide: {
        position: "absolute",
        left: 320,
        top: 30,
    },

    textbutton: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: 'bold',
        color: "white",
    },
    forgot: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: 'bold',
        color: "#2D9CDB",
        marginTop: 10,
    }
});
  