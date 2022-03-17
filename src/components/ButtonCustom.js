import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ButtonCustom = (props) => {
    return (
        <View style={styles.viewTouchable}>
            <TouchableOpacity style={styles.buttonCustom}>
                <Text style={styles.fontButton}>{props.button}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    viewTouchable: {
        flex: 1,
        flexDirection: 'row',
    },
    buttonCustom: {
        margin: 10,
        width: 100,
        height: 33,
        borderRadius: 20,
        paddingVertical: 3,
        backgroundColor: '#FF3A44',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    fontButton: {
        color: '#FFF',
    }
})

export default ButtonCustom;
