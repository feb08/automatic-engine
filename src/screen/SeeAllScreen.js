import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';

const SeeAllScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Detail')}>
                    <View>
                        <ImageBackground
                            style={styles.images}
                            imageStyle={{ borderRadius: 12 }}
                            source={{ uri: route.params.data.urlToImage }}
                            resizeMode='cover'>
                            <View style={styles.containerText}>
                                <Text
                                    numberOfLines={1}
                                    style={styles.fontTitle}>{route.params.data.title}</Text>
                                <Text
                                    numberOfLines={1}
                                    style={styles.fontDescription}>{route.params.data.description}</Text>
                                <Text style={styles.fontAuthor}>{route.params.data.author}</Text>
                            </View>
                        </ImageBackground>
                    </View>
                </TouchableOpacity>
            </ScrollView>
            <Text>Hello</Text>
        </View>
    );
}

const styles = StyleSheet.create({})

export default SeeAllScreen;
