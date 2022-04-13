import { StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { Text, View } from '../components/Themed';
import { Card } from 'react-native-elements';
import React, {useState, useEffect} from 'react';
import UserDetail from '../../types/userDetail.type';
import { TextInput } from 'react-native-paper';
import Dialog from "react-native-dialog";

import { auth } from '../../../firebase'
import { signOut,  
    updateEmail, 
    updateProfile,
    reauthenticateWithCredential,
    EmailAuthProvider,
 } from 'firebase/auth';

const UserProfile = ({navigation}: {navigation: any}) => {
    const [user, setUser] = useState<UserDetail>();
    const [currentPass, setPass] = useState(null);
    const [newName, setName] = useState('');
    const [newEmail, setEmail] = useState('');
    const [dialogVisible, setDialog] = useState(false);

    const emailUpdated = () => {
        const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            currentPass
        )
        setDialog(!dialogVisible)
        reauthenticateWithCredential(auth.currentUser, credential)
        .then(() => {
            updateEmail(auth.currentUser, newEmail)
            alert("Profile updated")
        })
        .catch(error => alert(error.message))
    }

    const pressedLogout = () => {
        signOut(auth)
        .then(navigation.push("Start"))
    }

    const pressedDone = async () => {
        try {
            if (newName && newEmail) {
                await updateProfile(auth.currentUser, {
                    displayName: newName
                })
                setDialog(!dialogVisible)
            }
            else if (newName) {
                await updateProfile(auth.currentUser, {
                    displayName: newName
                })
                alert("Profile updated")
            }
            else if (newEmail) {
                setDialog(!dialogVisible)
            }
        
        } catch (error) {
            alert(error.message)
        }

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
                value={user?.displayName}
                onChangeText={(value) => setName(value)}
            />
            <TextInput
                label='Email'
                model="Flat"
                theme={{ colors: { placeholder: 'grey', background: 'transparent', text: 'black', primary: 'black' }}}
                value={user?.email || ''}
                onChangeText={(value) => setEmail(value)}
            />
             <TextInput
                label='Change password'
                model="Flat"
                theme={{ colors: { placeholder: 'grey', background: 'transparent', text: 'black', primary: 'black' }}}
                value={''}
                placeholder="New password"
                secureTextEntry
                onFocus={(value) => console.log(value)}
            />
            {/* <TouchableOpacity onPress={() => console.log("pressed")}>
                <Text style={styles.change_pass}>Change password</Text>
            </TouchableOpacity> */}
            <View style={{backgroundColor: "transparent", alignItems:'center'}}>
                <TouchableOpacity onPress={pressedDone} style={styles.button}>
                    <Text style={styles.textbutton}>Done</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={pressedLogout} style={styles.logout_button}>
                <Text style={styles.textbutton}>Log out</Text>
                </TouchableOpacity>
            </View>
            <Dialog.Container visible={dialogVisible}>
                <Dialog.Title>Confirm Password</Dialog.Title>
                <Dialog.Description>
                    Please enter your password
                </Dialog.Description>
                <Dialog.Input
                    secureTextEntry
                    onChangeText={(value) => setPass(value)}
                />
                <Dialog.Button label="Submit" onPress={emailUpdated} />
            </Dialog.Container>

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
