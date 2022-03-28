import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SeeAllScreen = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

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

    const onRefresh = () => {
        setRefreshing(true);
        getData();
        setRefreshing(false);
    }

    useEffect(() => {
        getData();
    }, []);
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['#FF3A44']}/>
                }>
                {data && data.map((item, i) => {
                    return (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => navigation.navigate('Detail', {
                                data: item
                            })}
                            >
                                <View style={styles.viewItem}>
                                    <Image 
                                        style={styles.images}
                                        imageStyle={{ borderRadius: 12}}
                                        source={{ uri: item.urlToImage }}
                                        resizeMode='cover'/>
                                            <View style={styles.containerText}>
                                                <Text
                                                    numberOfLines={1}
                                                    style={styles.fontTitle}>{item.title}</Text>
                                                <Text style={styles.fontDesc}>{item.description}</Text>
                                                <Text style={styles.fontAuthor}>{item.author}</Text>   
                                            </View>
                                </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    viewItem: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    images: {
        width: 370,
        height: 230,
        borderRadius: 18,
        opacity: 0.7
    },
    containerText: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        justifyContent: 'center',
    },
    fontTitle: {
        fontSize: 16,
        fontWeight: '400',
        color: 'black',
        marginBottom: 10
    },
    viewFont: {
        marginTop: 53,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    fontDesc: {
        fontSize: 12,
        fontWeight: '400',
        color: 'black',
        marginBottom: 5,
    },
    fontAuthor: {
        fontSize: 12,
        fontWeight: '400',
        color: 'black',
        textAlign: 'right'
    },
})

export default SeeAllScreen;
