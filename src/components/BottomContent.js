import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ImageBackground, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import Axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const BottomContent = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [fav, setFav] = useState([]);

    const getData = () => {
        Axios.get('https://newsapi.org/v2/top-headlines', {
            params: {
                country: 'us',
                category: 'business',
                apiKey: '7a0ce75211e146319b70abd7adecde16'
            }
        })
            .then(res => {
                //console.log('success:', res) -> test data ke get or no
                setData(res.data.articles);
            })
    }

    useEffect(() => {
        getData();
    }, []);

    // function to add an item to fav list
    const onFav = (news) => {
        setFav([...fav, news])
    }

    // function to remove an item from fav list
    const onRemoveFav = (news) => {
        const filtered = fav.filter(
            item => item.id !== news.id 
        );
        setFav(filtered);
    }

    //function to check if an item exist in the fav list or not
    const ifExist = (news) => {
       if(fav.filter(item => item.id === news.id).length > 0){
           return true;
       }
       return false;
    };

    return (
        <>
            {data && data.map((item, i) => {
                return (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Detail', {
                            data: item
                        })}
                        key={item.id}>
                        <View style={styles.viewItem}>
                            <ImageBackground
                                style={styles.images}
                                imageStyle={{ borderRadius: 12 }}
                                source={{ uri: item.urlToImage }}
                                resizeMode='cover'>
                                <View style={styles.containerText}>
                                    <Text
                                        numberOfLines={1}
                                        style={styles.fontTitle}>{item.title}</Text>
                                    <TouchableOpacity
                                    onPress={() => ifExist(item) ? onRemoveFav(item) : onFav(item)}>
                                        <Icon
                                        name={ifExist(item) ? 'heart' : 'heart-outline'}
                                        size={25}
                                        color='#ED555D'
                                        style={{textAlign: 'right'}}/>
                                    </TouchableOpacity>
                                    <View style={styles.viewFont}>
                                        <Text style={styles.fontAuthor}>{item.author}</Text>
                                        <Text style={styles.fontDate}>{moment(data.publishedAt).format('ll')}</Text>
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                )
            })}
        </>
    );
}

const styles = StyleSheet.create({
    viewItem: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    images: {
        width: 370,
        height: 120,
        alignSelf: 'stretch',
        borderRadius: 18,
        opacity: 0.9,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    containerText: {
        paddingHorizontal: 12,
        paddingVertical: 10
    },
    fontTitle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#FFF',
        marginBottom: 10
    },
    viewFont: {
        marginTop: 33,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    fontAuthor: {
        fontSize: 12,
        fontWeight: '400',
        color: '#FFF',
    },
    fontDate: {
        fontSize: 10,
        fontWeight: '400',
        color: '#FFF',
    }
})

export default BottomContent;
