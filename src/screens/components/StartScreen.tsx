import { StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Text, View } from '../components/Themed';
import { Card } from 'react-native-elements';
import React, {useState, useEffect} from 'react';

const StartScreen = ({navigation}: {navigation: any}) => {

    const pressedStart = () => {
        navigation.push("LogIn")
    };
    
return (
    <ImageBackground 
    source={require('../../assets/images/bg-start.jpeg')} 
    style={styles.container}>
        <View  style={styles.header}>
            <Text style={styles.textheader}>Covid{'\n'}Vaccine</Text>
            <Text style={styles.textbody}>Lorem ipsum dolor sit amet, consectetur{'\n'}adipiscing elit, sed do eiusmod.</Text>
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
        width: null,
        height: null,
    },
    header: {
        backgroundColor: 'transparent',
        marginTop: 300,
        marginLeft: 60
    },
    button: {
        height: 51,
        width: 343,
        marginTop: 180,
        backgroundColor: '#2D9CDB',
        borderRadius: 100,
        justifyContent: 'center',
        position: 'absolute'
    },
    textbutton: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    textheader: {
        fontSize: 43,
        color: 'black',
    },
    textbody: {
        fontSize: 13,
        color: 'black',
        marginTop: 5
    }
});
