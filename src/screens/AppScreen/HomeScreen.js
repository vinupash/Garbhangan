import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, Dimensions, ActivityIndicator, Image, Alert } from 'react-native';
import { COLORS, FONT, SIZES, SHADOWS, assets } from '../../constants';
import { SvgXml } from 'react-native-svg';
import LogoIcon from '../../../assets/images/LogoIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import { useIsFocused } from '@react-navigation/native';
import jwtDecode from 'jwt-decode';

const HomeScreen = ({ navigation }) => {
    const [isLoading, setLoading] = useState(false)
    const texts = ['Shikshan, Aaichya Savalitla...', 'शिक्षण, आईच्या सावलीतल...', 'सिख, मां के छाया की...'];
    const iamges = [LogoIcon, LogoIcon, LogoIcon];
    const [index, setIndex] = useState(0);
    const [indexImage, setIndexImage] = useState(0);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const isFocused = useIsFocused()
    const BASE_URL = 'http://51.77.105.23:81/';
    // const TOKEN_KEY = accessToken;
    // const REFRESH_TOKEN_KEY = refreshToken;

    useEffect(() => {
        // fetchDataAsync()
        checkTokenExpiration()
    }, [isFocused])

    // const fetchDataAsync = async () => {
    //     setLoading(true)
    //     const token = await AsyncStorage.getItem('accessToken');
    //     const tokenRefresh = await AsyncStorage.getItem('refreshToken');
    //     setLoading(false)
    //     const transformedAccessToken = JSON.parse(token);
    //     const transformedRefreshToken = JSON.parse(tokenRefresh);
    //     console.log('transformedAccessToken Home page--->', transformedAccessToken.accessToken);
    //     console.log('transformedRefreshToken home page--->', transformedRefreshToken.refreshToken);
    // };

    const checkTokenExpiration = async () => {
        try {
            const token = await AsyncStorage.getItem('accessToken');
            const tokenRefresh = await AsyncStorage.getItem('refreshToken');
            const transformedAccessToken = JSON.parse(token);
            const transformedRefreshToken = JSON.parse(tokenRefresh);
            console.log('transformedAccessToken--->', transformedAccessToken.accessToken);
            console.log('transformedRefreshToken--->', transformedRefreshToken.refreshToken);
            setRefreshToken(transformedRefreshToken.refreshToken)
            if (transformedAccessToken.accessToken !== null) {
                const decodedToken = jwtDecode(transformedAccessToken.accessToken);
                const currentTime = Date.now() / 1000; // convert to seconds
                if (decodedToken.exp < currentTime) {
                    console.log('Access token has expired.');
                    // Alert.alert(
                    //     'Confirmation',
                    //     'Access token has expired.',
                    //     [
                    //         {
                    //             text: 'Create new Access token',
                    //             onPress: () => newTokeGenerate(refreshToken)
                    //         },
                    //     ],
                    //     { cancelable: false }
                    // );
                    newTokeGenerate(refreshToken)
                    // perform any necessary action, such as requesting a new access token using the refresh token
                } else {
                    console.log('Access token is still valid.');
                }
            } else {
                console.log('Access token not found in async storage.');
            }
        } catch (e) {
            console.log('Error checking access token expiration:', e);
        }
    };

    const newTokeGenerate = async () => {
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("Cookie", refreshToken);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "api/auth/refreshtoken", requestOptions);
        const json = await response.json();
        setLoading(false)
        console.log('json HomeScreen--->', json);
        AsyncStorage.setItem(
            "accessToken",
            JSON.stringify({
                accessTokenStatusUser: 1,
                accessToken: json.data.accessToken,
                // refreshToken: json.data.refreshToken,
            })
        );
        AsyncStorage.setItem(
            "refreshToken",
            JSON.stringify({
                refreshTokenStatusUser: 1,
                refreshToken: json.data.refreshToken,
            })
        );
        return
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((index + 1) % texts.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [index]);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndexImage((indexImage + 1) % iamges.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [indexImage]);

    const BtnSection = ({
        onPress,
        title,
        source
    }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.98}
                style={styles.sectionBtn}
                onPress={onPress}
            >
                <View style={[styles.loginBtnInner]}>
                    <Image source={source}
                        style={{
                            width: '100%',
                            height: 300,
                            borderRadius: 16,
                        }}
                    />
                </View>
                <View style={{ height: 40, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.btnText]}>{title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    // if (isLoading) {
    //     return (
    //         <ActivityIndicator size="large" color={COLORS.brand.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
    //     )
    // }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='light-content'
                backgroundColor={COLORS.brand.primary}
            />
            {isLoading ?
                <View style={styles.loading}>
                    <ActivityIndicator size='large' color={COLORS.brand.primary} />
                </View>
                : null}
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', height: '100%', alignItems: 'center' }}>
                {/* <SvgXml xml={LogoIcon} width={192} height={123} style={{ marginTop: 50 }} /> */}
                <View style={{ alignItems: 'center', marginTop: 8 }}>
                    <SvgXml xml={iamges[indexImage]} width={132} height={73} />
                    <Text style={styles.subTitle}>{texts[index]}</Text>
                </View>

                <View style={styles.btnBox}>
                    <View style={{
                        width: 220,
                        height: 350,
                    }}>
                        <BtnSection
                            title="Women"
                            onPress={() => navigation.navigate('WomenNavigationsStack')}
                            // onPress={coolSubmit}
                            source={assets.women_img}
                        />
                    </View>
                    <View style={{
                        width: 220,
                        height: 350,
                    }}>
                        <BtnSection
                            title="Kid's"
                            onPress={() => navigation.navigate('KidNavigationsStack')}
                            source={assets.child_img}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.brand.background,
        height: windowHeight
    },
    btnBox: {
        marginBottom: 50,
        width: windowWidth - 450,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    subTitle: {
        fontSize: SIZES.medium,
        fontFamily: FONT.MartelSansRegular,
        color: COLORS.brand.black,
        marginTop: 10
    },
    sectionBtn: {
        width: '100%',
        height: 350,
        borderRadius: 16,
        backgroundColor: "#FFFFFF",
        ...SHADOWS.light,
        marginBottom: 5,
    },
    btnText: {
        fontFamily: FONT.Charlatan,
        fontSize: SIZES.mediumLarge,
        color: COLORS.brand.black
    },
    loginBtnInner: {
        width: '100%',
        height: 300,
        borderRadius: 16,
        backgroundColor: COLORS.brand.primary,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.light
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
    },
})