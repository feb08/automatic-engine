import React, { useEffect } from 'react';
import {View, StyleSheet} from 'react-native';
import message from '@react-native-firebase/messaging';

const NotesScreens = () => {
    useEffect(() => {
        const unSubscribe = message().onMessage(async remoteMessage  => {
            Alert.alert('A new FCM message arrived', JSON.stringify(remoteMessage))
        })
        return unSubscribe
    }, []);

    handleReceiveNotification = () => {
        firebase.messaging().onMessage(message => {
            console.log('Received a message', message);
          });          
    }
    return (
        <View>
            <Text>{handleReceiveNotification}</Text>
        </View>
    );
}

const styles = StyleSheet.create({})

export default NotesScreens;
