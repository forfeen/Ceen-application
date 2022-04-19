import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, View } from '../components/Themed';
import { Card } from 'react-native-elements';
import React, {useState, useEffect} from 'react';
import UserDetail from '../../types/userDetail.type';
import { TextInput } from 'react-native-paper';
import Dialog from "react-native-dialog";
import * as ImagePicker from 'expo-image-picker';

import { auth } from '../../../firebase'
import { signOut,  
    updateEmail, 
    updateProfile,
    reauthenticateWithCredential,
    EmailAuthProvider,
    sendEmailVerification,
    updatePassword,
    sendPasswordResetEmail
 } from 'firebase/auth';

const UserProfile = ({navigation}: {navigation: any}) => {
    const [user, setUser] = useState<UserDetail>();
    const [currentPass, setPass] = useState(null);
    const [newName, setName] = useState('');
    const [newEmail, setEmail] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setCFPass] = useState('');
    const [dialogEMVisible, setDialogEM] = useState(false);
    const [dialogPWVisible, setDialogPW] = useState(false);

    const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        currentPass
    )

    const forgetPasswordHandler = () => {
        sendPasswordResetEmail(auth, auth.currentUser.email)
        .then(() => alert("Check your email for reset password"))
        setDialogPW(!dialogPWVisible)
    }

    const emailUpdated = () => {
        setDialogEM(!dialogEMVisible)
        reauthenticateWithCredential(auth.currentUser, credential)
        .then(() => {
            updateEmail(auth.currentUser, newEmail)
            .catch(error => alert(error.message))

            setDialogEM(!dialogEMVisible)
            sendEmailVerification(auth.currentUser)
            alert("Check your email for verification")
        })
        .catch(error => alert(error.message))
    }

    const passUpdated = () => {
        if (newPass !== confirmPass) {
            alert("Password does not match");
        }else {
            reauthenticateWithCredential(auth.currentUser, credential)
            .then(() => {
                updatePassword(auth.currentUser, newPass)
                .catch(error => alert(error.message))

                setDialogPW(!dialogPWVisible)

            })
            .catch(error => alert(error.message))
        }
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
                setDialogEM(!dialogEMVisible)
            }else if (newName) {
                await updateProfile(auth.currentUser, {
                    displayName: newName
                })
                alert("Profile updated")
            }else if (newEmail) {
                setDialogEM(!dialogEMVisible)
            }else if (passUpdated) {
                alert("Profile updated")
            }
        } catch (error) {
            alert(error.message)
        }

    }

    const openImagePickerAsync = async () => {
        const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert('Permission to access camera roll is required!');
          return;
        }
    
        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);
    };

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
                {/* <Image source={{uri:"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}} style={styles.pic_circle}></Image>
                <TouchableOpacity onPress={openImagePickerAsync}>
                    <Text style={styles.change_photo}>Change profile photo</Text>
                </TouchableOpacity> */}
                <View style={styles.pic_circle}>
                    <Text style={{fontSize: 80}}>{user?.displayName.charAt(0)}</Text>
                </View> 
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
            <TouchableOpacity onPress={() => setDialogPW(!dialogPWVisible)}>
                <Text style={styles.change_pass}>Change password</Text>
                <View style={{ backgroundColor: "transparent", flexDirection: 'row', marginTop: 20}}>
                    <View style={{flex: 1, height: 1, backgroundColor: '#C3C3C3'}} />
                </View>
            </TouchableOpacity>
            <View style={{backgroundColor: "transparent", alignItems:'center'}}>
                <TouchableOpacity onPress={pressedDone} style={styles.button}>
                    <Text style={styles.textbutton}>Done</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={pressedLogout} style={styles.logout_button}>
                <Text style={styles.textbutton}>Log out</Text>
                </TouchableOpacity>
            </View>

            {/* Confirm password for changing email */}
            <Dialog.Container visible={dialogEMVisible}>
                <Dialog.Title>Confirm Password</Dialog.Title>
                <Dialog.Description>
                    Please enter your password
                </Dialog.Description>
                <Dialog.Input
                    secureTextEntry
                    onChangeText={(value) => setPass(value)}
                />
                <Dialog.Button label="Submit" onPress={emailUpdated} />
                <Dialog.Button label="Cancel" style={{color: "red"}} onPress={() => setDialogEM(!dialogEMVisible)} />
            </Dialog.Container>

            {/* Change password */}
            <Dialog.Container visible={dialogPWVisible}>
                <Dialog.Title>Update password</Dialog.Title>
                <Dialog.Input
                    placeholder='Current password'
                    secureTextEntry
                    onChangeText={(value) => setPass(value)}
                />
                <TouchableOpacity onPress={forgetPasswordHandler}>
                    <Text style={styles.forgot}>Forgot your password?</Text>
                </TouchableOpacity>
                <View style={{ backgroundColor: "transparent", flexDirection: 'row', marginBottom: 20}}>
                    <View style={{flex: 1, height: 1, backgroundColor: '#DADADF'}} />
                </View>
                <Dialog.Input
                    placeholder='New password'
                    secureTextEntry
                    onChangeText={(value) => setNewPass(value)}
                />
                <Dialog.Input
                    placeholder='Confirm password'
                    secureTextEntry
                    onChangeText={(value) => setCFPass(value)}
                />
                <Dialog.Button label="Submit" onPress={passUpdated} />
                <Dialog.Button label="Cancel" style={{color: "red"}} onPress={() => setDialogPW(!dialogPWVisible)} />
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
        fontSize: 16,
        color: "grey",
        paddingTop: 25,
        paddingLeft: 12
    },
    forgot: {
        fontSize: 12,
        fontWeight: 'bold',
        color: "#2D9CDB",
        marginLeft: 20,
        marginBottom: 5,
    },
});
