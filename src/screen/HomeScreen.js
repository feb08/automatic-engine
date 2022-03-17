import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, ImageBackground, TouchableOpacity, TextInput, Dimensions, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ButtonCustom from '../components/ButtonCustom';
import moment from 'moment';

const { width } = Dimensions.get("screen");

const HomeScreen = ({ navigation }) => {
    const [data, setData] = useState();
    const [data1, setData1] = useState();
    const [textInput, setTextInput] = useState('');
    
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

    const getData1 = () => {
        Axios.get('https://newsapi.org/v2/top-headlines', {
            params: {
                sources: 'techcrunch',
                apiKey: '7a0ce75211e146319b70abd7adecde16'
            }
        })
        .then(res => {
            setData1(res.data.articles);
        })
    }

    useEffect(() => {
        getData();
        getData1();
    }, []);

    return (
        <>
            {/* {console.log(data)} -> for check is get data ? */}
            <View style={styles.viewHome}>
                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Ukraine vs Russia who's win ?"
                        value={textInput}
                        onChangeText={setTextInput} />
                    <Icon
                        name='search'
                        color="#D1CDCD"
                        size={28}
                        style={styles.iconSearch} />
                    <TouchableOpacity style={{}}>
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
                <View>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        {data1 && data1.map((item, i) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Detail', {
                                        data: item
                                    })}
                                    key={i.id}
                                    style={{
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
                                    }}>
                                        <ImageBackground
                                            style={styles.imagesHorizontal}
                                            imageStyle={{ borderRadius: 20}}
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
                <View>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        <ButtonCustom
                            button="Wall Street" />
                        <ButtonCustom
                            button="Tesla" />
                        <ButtonCustom
                            button="Apple" />
                        <ButtonCustom
                            button="Wall Street" />
                    </ScrollView>
                </View>
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}>
                    {data && data.map((item, i) => {
                        return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Detail', {
                                    data: item
                                })}
                                key={i.id}>
                                <View style={styles.viewItem}>
                                    <ImageBackground 
                                        style={styles.images}
                                        imageStyle={{ borderRadius: 12}}
                                        source={{ uri: item.urlToImage }}
                                        resizeMode='cover'>
                                            <View style={styles.containerText}>
                                                <Text
                                                    numberOfLines={1}
                                                    style={styles.fontTitle}>{item.title}</Text>
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
                </ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    viewHome: {
        flex: 1,
        width: width,
        backgroundColor: '#FFF'
    },
    textInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textInput: {
        width: '80%',
        height: 40,
        marginHorizontal: 18,
        marginTop: 18,
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 16,
    },
    iconSearch: {
        marginTop: 22,
        marginLeft: -90
    },
    iconNotification: {
        marginTop: 22,
        marginRight: 20
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
    scrollView: {
        marginTop: 5
    },
    viewItem: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    images: {
        width: 370,
        height: 120,
        borderRadius: 18,
        opacity: 0.9
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
        marginTop: 53,
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

export default HomeScreen;
