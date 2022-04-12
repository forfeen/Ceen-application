import { StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import { Text, View } from '../components/Themed';
import { Card } from 'react-native-elements';
import React, {useState, useEffect} from 'react';
import UserDetail from '../../types/userDetail.type';
import { TextInput } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';

import { auth } from '../../../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth';

const UserProfile = ({navigation}: {navigation: any}) => {
    const [user, setUser] = useState<UserDetail>();
    const a = auth.currentUser;
    const pressedLogout = () => {
        signOut;
        console.log("signed out");
        navigation.push("LogIn")
    }

    function handleChange() {

    }



    useEffect(() => {
        auth.currentUser.providerData.forEach((UserInfo) => {
            const user = UserInfo;
            setUser(user);
        });
    }, []);
    
return (
    <View style={{backgroundColor: "#F0F7F9", flex: 1}}>
        <Card containerStyle={styles.profile}>
            <View style={{backgroundColor: "transparent", alignItems:'center'}}>
                <Image source={{uri:"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}} style={styles.pic_circle}></Image>
                <TouchableOpacity onPress={() => console.log("pressed")}>
                    <Text style={styles.change_photo}>Change profile photo</Text>
                </TouchableOpacity>
                </View>
            <TextInput
                label='Name'
                model="Flat"
                theme={{ colors: { placeholder: 'grey', background: 'transparent', text: 'black', primary: 'black' }}}
                value={user?.displayName || ''}
                onChangeText={() => console.log("change name", user.displayName)}
            />
            <TextInput
                label='Email'
                model="Flat"
                theme={{ colors: { placeholder: 'grey', background: 'transparent', text: 'black', primary: 'black' }}}
                value={user?.email || ''}
                onChangeText={() => console.log("change email", user.email)}
            />
             <TextInput
                label='Change password'
                model="Flat"
                theme={{ colors: { placeholder: 'grey', background: 'transparent', text: 'black', primary: 'black' }}}
                value={'********'}
                onFocus={() => console.log("pressed")}
            />
            {/* <TouchableOpacity onPress={() => console.log("pressed")}>
                <Text style={styles.change_pass}>Change password</Text>
            </TouchableOpacity> */}
            <View style={{backgroundColor: "transparent", alignItems:'center'}}>
                <TouchableOpacity onPress={() => console.log("log out")} style={styles.button}>
                    <Text style={styles.textbutton}>Done</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={pressedLogout} style={styles.logout_button}>
                <Text style={styles.textbutton}>Log out</Text>
                </TouchableOpacity>
            </View>
        </Card>
    </View>
    );
};

export default UserProfile;

const styles = StyleSheet.create({
    profile: {
        width: 360,
        height: 500,
        paddingVertical: 25,
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 20,
        fontSize: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.09,
        shadowRadius: 8,  
        elevation: 3
    },
    button: {
        height: 51,
        width: 200,
        marginTop: 60,
        backgroundColor: "#2D9CDB",
        borderRadius: 100,
        justifyContent: "center",
    },
    logout_button: {
        height: 51,
        width: 300,
        marginTop: 120,
        backgroundColor: "gray",
        borderRadius: 100,
        justifyContent: "center",
    },
    textbutton: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: 'bold',
        color: "white",
    },
    pic_circle: {
        width: 90,
        height: 90,
        borderRadius: 100,
        backgroundColor: '#2F80ED',
        alignItems: 'center',
    },
    change_photo: {
        textAlign: "center",
        fontSize: 14,
        fontWeight: 'bold',
        color: "#2D9CDB",
        padding: 10
    },
    change_pass: {
        textAlign: "left",
        fontSize: 12,
        color: "grey",
        paddingTop: 11,
        paddingLeft: 11
    },
});
