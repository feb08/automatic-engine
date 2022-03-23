import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView, View, TouchableOpacity, ImageBackground, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BannersContent = () => {
    const navigation = useNavigation();
    const [data, setData] = useState();

    const getData = () => {
        Axios.get('https://newsapi.org/v2/top-headlines', {
            params: {
                sources: 'techcrunch',
                apiKey: '7a0ce75211e146319b70abd7adecde16'
            }
        })
            .then(res => {
                setData(res.data.articles);
            })
    }

    useEffect(() => {
        getData();
    }, []);
    return (
        <View>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {data && data.slice(0, 3).map(item => {
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Detail', {
                                data: item
                            })}
                            key={item.id}
                            style={styles.bannerTouch}>
                            <ImageBackground
                                style={styles.imagesHorizontal}
                                imageStyle={{ borderRadius: 20 }}
                                source={{ uri: item.urlToImage }}
                                resizeMode='cover'
                            >
                                <View style={styles.viewFontWrapperBanner}>
                                    <Text style={styles.fontAuthorBanner}>{item.author}</Text>
                                    <Text style={styles.fontTitleBanner}>{item.title}</Text>
                                    <Text
                                        numberOfLines={1}
                                        style={styles.fontDescBanner}>{item.description}</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    bannerTouch: {
        backgroundColor: '#fff',
        margin: 10,
        width: 350,
        height: 220,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    imagesHorizontal: {
        width: 350,
        height: 220,
        borderRadius: 20,
        opacity: 0.7
    },
    viewFontWrapperBanner: {
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    fontAuthorBanner: {
        marginTop: 33,
        fontWeight: '600',
        color: '#FFF'
    },
    fontTitleBanner: {
        marginBottom: 23,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF'
    },
    fontDescBanner: {
        marginTop: 33,
        color: '#FFF'
    },
})

export default BannersContent;
