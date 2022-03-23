import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const InputFunction = () => {
    const navigation = useNavigation();
    const [textInput, setTextInput] = useState('');

    //function search text in input
    const searchText = (event) => {
        setTextInput(event.target.value);
    }

    return (
        <View>
            <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Ukraine vs Russia who's win ?"
                    value={textInput}
                    onChangeText={searchText.bind(this)} />
                <Icon
                    name='search'
                    color="#D1CDCD"
                    size={28}
                    style={styles.iconSearch} />
                <TouchableOpacity
                onPress={() => navigation.navigate('Notification')}>
                    <Icon
                        name='notifications'
                        color="#FF3A44"
                        size={28}
                        style={styles.iconNotification} />
                </TouchableOpacity>
            </View>
            <View style={styles.viewLatest}>
                <Text style={styles.fontLatest}>Latest News</Text>
                <TouchableOpacity
                    style={styles.viewSeeAll}
                    onPress={() => navigation.navigate('SeeAllScreen')}>
                    <Text style={styles.fontSeeAll}>See All</Text>
                    <Icon
                        name='arrow-forward'
                        color="#0080FF"
                        size={20}
                        style={styles.iconArrow} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    textInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textInput: {
        width: '75%',
        height: 40,
        marginHorizontal: 18,
        marginTop: 18,
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 16,
    },
    iconSearch: {
        marginTop: 22,
        marginLeft: -120
    },
    iconNotification: {
        marginTop: 22,
        marginRight: 33
    },
    viewLatest: {
        paddingHorizontal: 16,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    fontLatest: {
        fontWeight: '600',
        fontSize: 22,
        color: 'black'
    },
    viewSeeAll: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    fontSeeAll: {
        marginTop: 7,
        marginRight: 10,
        fontWeight: '300',
        fontSize: 12,
        color: '#0080FF'
    },
    iconArrow: {
        margin: 5
    },
})

export default InputFunction;
