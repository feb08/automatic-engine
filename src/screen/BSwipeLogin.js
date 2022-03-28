import React from 'react';
import {View, StyleSheet} from 'react-native';
import BottomSwipeLogin from '../components/BottomSwipeLogin';
import Icon from 'react-native-vector-icons/Ionicons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const BSwipeLogin = () => {
    return (
        <GestureHandlerRootView style={{flex: 1}}>
        <View>
            <Icon
                    name='newspaper-outline'
                    color='#C74B50'
                    size={213}
                    style={styles.iconNews}/>
            <BottomSwipeLogin/>
        </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    iconNews: {
        marginTop: 8,
        textAlign: 'center',
        //top: 3
    }
})

export default BSwipeLogin;
