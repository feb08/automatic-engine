import React, { useEffect, useState } from 'react';
import {View, Text, ImageBackground, Image, StyleSheet} from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DrawerCustom = (props) => {
    const [data, setData] = useState();
    const getImageData = () => {
        Axios.get('https://api.pexels.com/v1/curated', {
            headers: {
                Authorization: '563492ad6f917000010000018bc5a83e74c54a9daf78a95b8b2a084d'
            },
            params: {
                per_page: 1,
            }
        })
        .then(res => {
            //console.log('Data Working Get', res);
            setData(res.data.photos);
        })
    }

    useEffect(() => {
        getImageData();
    }, []);

    return (
        <>
        { data && data.map((img, i)=> {
            return(
            <View style={{ flex: 1 }}>
                <DrawerContentScrollView 
                { ...props }
                contentContainerStyle={{ backgroundColor: '#FF3A44' }}>
                    <ImageBackground
                    key={img.id}
                    source={{ uri: img.src.tiny }}
                    style={{ padding: 20 }}>
                        <Image
                        source={{ uri: img.src.small }}
                        style={{ 
                            height: 80, 
                            width: 80, 
                            borderRadius: 40, 
                            borderWidth: 3,
                            borderColor: 'blue', 
                            marginBottom: 20 }}/>
                        <Text 
                        style={{ color: '#FFF', fontSize: 18, marginBottom: 5 }}>Vladimir Putin</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text
                            style={{ color: '#FFF', fontSize: 18, marginRight: 5 }}>250 Points</Text>
                            <Icon name='loyalty' size={14} color='#FFF'/>
                        </View>
                    </ImageBackground>
                    <View style={{ flex: 1, backgroundColor: '#FFF', paddingTop: 10 }}>
                        <DrawerItemList { ...props }/>
                    </View>
                </DrawerContentScrollView>
                <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#CCC' }}>
                    <TouchableOpacity style={{ paddingVertical: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='share' size={22}/>
                            <Text style={{ fontSize: 15, marginLeft: 5 }}>Tell a Friend</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingVertical: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='logout' size={22}/>
                            <Text style={{ fontSize: 15, marginLeft: 5 }}>Sign Out</Text>
                        </View>
                    </TouchableOpacity>
                </View> 
            </View>        
            )
        } )}
        </>
    );
}

const styles = StyleSheet.create({})

export default DrawerCustom;