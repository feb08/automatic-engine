import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, RefreshControl } from 'react-native';
import InputFunction from '../components/InputFunction';
import BannersContent from '../components/BannersContent';
import ButtonCustom from '../components/ButtonCustom';
import BottomContent from '../components/BottomContent';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { width } = Dimensions.get("screen");

const HomeScreen = () => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        // must a state from api map exp: setData(res.data.articles);
        //setRefreshing(false);
    }

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <View style={styles.viewHome}>
                <InputFunction/>
                <View style={styles.viewBannerTop}>
                    <BannersContent/>
                </View>
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={['#FF3A44']}
                        />
                    }>
                <View style={styles.viewContainerButton}>
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
                <BottomContent/>
                </ScrollView>
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    viewHome: {
        flex: 1,
        width: width,
        backgroundColor: '#FFF'
    },
    viewBannerTop: {
        zIndex: 0
    },
    scrollView: {
        flex: 1,
        marginTop: 5,
    },
    viewContainerButton: {
        flex: 1,
        zIndex: 1
    },
    
})

export default HomeScreen;
