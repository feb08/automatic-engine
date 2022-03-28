import React from 'react';
import { View, StyleSheet, Text, Button, Image, Dimensions, ScrollView } from 'react-native';
import moment from 'moment';

const DetailScreen = ({ route, navigation }) => {
    const { width, height } = Dimensions.get("window");
    const dataType = new Date(route.params.data.publishedAt);

    return (
        <>
            {/* {console.log(route.params.data)} -> get data by route navigation*/}
            <View style={styles.viewDetail}>
                    <View style={{ width: width, height: width, }}>
                    <Image
                        source={{ uri: route.params.data.urlToImage }}
                        style= {{alignSelf: 'stretch', resizeMode: 'cover', width: 'auto', flex: 1 }} 
                        //resizeMode='cover'
                    />
                    </View>
                    <View style={styles.viewWrapper}>
                        <View style={styles.viewBoxMid}>
                            <Text style={styles.fontDate}>{moment(dataType).format('LLLL')}</Text>
                            <Text
                                style={styles.fontTitle}
                                numberOfLines={3}>{route.params.data.title}</Text>
                            <Text style={styles.fontAuthor}>{route.params.data.author}</Text>
                        </View>
                    </View>
                    <View style={styles.viewBottom}>
                        <Text style={styles.fontContent}>{route.params.data.content}</Text>
                    </View>
                    <Button
                        title="Very Detail"
                        color="#630606"
                        onPress={() => navigation.navigate('VeryDetail')} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    viewDetail: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    viewWrapper: {
        marginTop: -110,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    viewBoxMid: {
        width: 330,
        height: 150,
        backgroundColor: '#EEEEEE',
        opacity: 0.9,
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 20,
        zIndex: 1
    },
    fontDate: {
        fontSize: 12,
        color: '#630606',
        marginBottom: 10
    },
    fontTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#630606',
        marginBottom: 20
    },
    fontAuthor: {
        fontSize: 10,
        fontWeight: '400',
        color: '#630606',
    },
    viewBottom: {
        flex: 1,
        backgroundColor: '#FFF',
        marginTop: -80,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingTop: 100,
        paddingHorizontal: 15
    },
    fontContent: {
        fontSize: 16,
        fontWeight: '500',
        color: '#630606',
    }
})

export default DetailScreen;
