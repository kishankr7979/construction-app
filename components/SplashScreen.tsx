import React from 'react'
import {View, ImageBackground} from 'react-native';
const SplashScreen = () => {
    return (
        <ImageBackground source={require('../assets/constech.png')} resizeMode='cover' style={{height: '100%', width: '100%'}}>
        </ImageBackground>
    )
}

export default SplashScreen
