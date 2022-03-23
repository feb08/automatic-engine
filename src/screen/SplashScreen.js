import React, { useEffect } from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

//https://lottiefiles.com/353-newspaper-spinner <- lottie file for this

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Login');
        }, 3000)
    }, [navigation]);
    return (
        <View style={{ flex: 1, backgroundColor: '#FF3A44', justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
            <LottieView
            style={{ width: 333, height: 333 }}
            source={require('../assets/splashscreen/353-newspaper-spinner.json')}
            autoPlay={true}
            loop={true}
            resizeMode='cover'/>
        </View>
    );
}

const styles = StyleSheet.create({})

export default SplashScreen;
