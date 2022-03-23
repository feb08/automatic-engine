import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

//import { auth } from '../../firebase/firebase-config';

const {height: SCREEN_HEIGHT} = Dimensions.get('window')

const BottomSwipeLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const unSubscribe = auth().onAuthStateChanged(user => {
            if(user) {
                navigation.navigate("HomeStack");
            }
        })

        return unSubscribe
    }, []);
    
    handleRegister = () => {
        auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
            const user = userCredentials.user;
            console.log('User account Registered & signed in', user.email);
        })
        .catch(error => alert(error.message))
    }

    handleLogin = () => {
        auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredentials) => {
            const user = userCredentials.user;
            console.log('User Signed in', user.email);
        })
        .catch(error => alert(error.message))
    }

    const translateY = useSharedValue(0);

    const context = useSharedValue({ y: 0 });

    const gesture = Gesture.Pan()
    .onStart(() => {
        context.value = { y: translateY.value } 
    })
    .onUpdate((event) => {
        //console.log(event.translationY); make check log from pan gesture
        translateY.value = event.translationY + context.value.y;
        //console.log(translateY.value); make check log value translateY
        translateY.value = Math.max(translateY.value, -SCREEN_HEIGHT);
    });

    useEffect(() => {
        translateY.value = withTiming(-SCREEN_HEIGHT / 1, { damping: 50 });
    },[])

    const rBottomSheetStyle = useAnimatedStyle(() => {
        return{
            transform: [{ translateY: translateY.value }],
        };
    });
    
    return (
        <GestureDetector gesture={gesture}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
            <View style={styles.lineBottomSheet}/>
            <Text style={styles.fontTitleBottomSheet}>News App</Text>
            <View style={styles.inputContainer}>
                <TextInput 
                style={styles.input}
                placeholder='Email'
                autoComplete='email' 
                keyboardType='email-address'
                value={email}
                onChangeText={(value) => setEmail(value)}
                />
                <TextInput
                style={styles.input}
                placeholder='Password'
                secureTextEntry={true}
                value={password}
                onChangeText={(value) => setPassword(value)}
                />
            </View>
            <TouchableOpacity 
            style={styles.buttonLogin}
            onPress={handleLogin}
            >
                <Text style={styles.fontButtonLogin}>Masuk Ke Akun Saya</Text>
            </TouchableOpacity>
            <Text style={styles.fontMiddle }>atau Masuk Dengan</Text>
            <TouchableOpacity 
            style={styles.buttonOutlineGoogle}>
                <Text style={styles.fontButtonLoginGoogle}>Masuk Dengan Google  <Icon
                    name='logo-google'
                    color="#C74B50"
                    size={17}
                    style={styles.iconGoogle}
                    />
                </Text>
            </TouchableOpacity>
            <View style={styles.buttonContainerRegister}>
                <Text>Belum memiliki akun?</Text>
                <TouchableOpacity 
                style={styles.buttonRegister}
                onPress={handleRegister}>
                    <Text style={styles.fontButtonRegister}> Daftar disini</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
        </KeyboardAvoidingView>
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bottomSheetContainer: {
        height: SCREEN_HEIGHT,
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 20,
        position: 'absolute',
        top: SCREEN_HEIGHT
    },
    lineBottomSheet: {
        height: 3,
        width: '20%',
        backgroundColor: '#C74B50',
        alignSelf: 'center', 
        marginTop: 8
    },
    fontTitleBottomSheet: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 20,
        fontWeight: '700',
        color: 'grey'
    },
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginVertical: 20
    },
    input: {
        width: '80%',
        borderWidth: 2,
        borderRadius: 20,
        paddingHorizontal: 20,
        marginTop: 10,
        borderColor: '#C74B50'
    },
    buttonLogin: {
        padding: 10,
        width: '80%',
        backgroundColor: '#C74B50',
        borderRadius: 18,
        alignSelf: 'center',
        marginVertical: 10
    },
    fontButtonLogin: {
        textAlign: 'center',
        color: '#FFF'
    },
    fontMiddle: {
        textAlign: 'center'
    },
    buttonOutlineGoogle: {
        padding: 10,
        width: '80%',
        //backgroundColor: '#FFF',
        borderRadius: 18,
        borderColor: '#C74B50',
        borderWidth: 2,
        alignSelf: 'center',
        marginVertical: 10,
    },
    fontButtonLoginGoogle: {
        textAlign: 'center',
        color: '#000',
        marginRight: 5,
    },
    iconGoogle: {},
    buttonContainerRegister: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fontButtonRegister: {
        color: '#C74B50',
        fontSize: 14,
        fontWeight: '600'
    }
})

export default BottomSwipeLogin;
