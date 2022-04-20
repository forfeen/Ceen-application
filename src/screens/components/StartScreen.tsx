import { StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Text, View } from '../components/Themed';
import React, {useState, useEffect} from 'react';
import { auth } from '../../../firebase'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const StartScreen = ({navigation}: {navigation: any}) => {

    const pressedStart = () => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigation.push("Index")
            } else {
                navigation.push("LogIn")
            }
        });
        unsubscribe();
    };
    
return (
    <ImageBackground 
    source={require('../../assets/images/bg-start.png')} 
    style={styles.container}>
        <View  style={styles.header}>
            <Text style={styles.textheader}>Ceen{'\n'}Application</Text>
            <Text style={styles.textbody}>Mobile Application for providing information{'\n'}About COVID-19 vaccine.</Text>
        </View>
        <View style={{alignItems: 'center'}}>
            <TouchableOpacity onPress={pressedStart} style={styles.button}>
                <Text style={styles.textbutton}>Get Started</Text>
            </TouchableOpacity>
        </View>
    </ImageBackground>
    );
};

export default StartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: "cover",
    },
    header: {
        backgroundColor: 'transparent',
        top: hp('40%'),
        left: wp('15%')
    },
    button: {
        height: hp('7'),
        width: wp('70%'),
        top: hp('60%'),
        backgroundColor: '#2D9CDB',
        borderRadius: 100,
        justifyContent: 'center',
        position: 'absolute'
    },
    textbutton: {
        textAlign: 'center',
        fontSize: wp('4.2%'),
        fontWeight: 'bold',
        color: 'white',
    },
    textheader: {
        fontSize: wp('12%'),
        color: 'black',
    },
    textbody: {
        fontSize: wp('3.4%'),
        color: 'black',
        marginTop: 10,
        lineHeight: hp('3%')
    }
});
