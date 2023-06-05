// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const MarathiScreen = () => {
//     return (
//         <View>
//             <Text>MarathiScreen</Text>
//         </View>
//     )
// }

// export default MarathiScreen

// const styles = StyleSheet.create({})

import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, Dimensions, ScrollView, ImageBackground, Image, Animated, ActivityIndicator } from 'react-native';
import { SvgXml } from 'react-native-svg';
import LogoIcon from '../../../../../../assets/images/LogoIcon';
import LanguageTab from '../../../../../components/LanguageTab';
import BackIcon from '../../../../../../assets/images/BackIcon';
import { BackIconSecton } from '../../../../../components/CustomButtons';
import { COLORS, FONT, SHADOWS, SIZES, assets } from '../../../../../constants';
import VideoTab from '../../../../../components/VideoTab';
import RadioButtonBoxValue from '../../../../../components/RadioButtonBoxValue';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import BoardEng from '../../../../../../assets/images/Board-Eng.png'
import BoardHin from '../../../../../../assets/images/Board-Hin.png'
import BoardMar from '../../../../../../assets/images/Board-Mar.png'
import { useIsFocused } from '@react-navigation/native';
import { getContentApi } from '../../../../../constants/AllApiCall';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VideoOfflineOnline from '../../../../../components/VideoOfflineOnline';

const MarathiScreen = ({ navigation }) => {
    const [isLoading, setLoading] = useState(false)
    const texts = ['Shikshan, Aaichya Savalitla...', 'शिक्षण, आईच्या सावलीतल...', 'सिख, मां की छाव में...'];
    const iamges = [BoardEng, BoardHin, BoardMar];
    const [index, setIndex] = useState(0);
    const [indexImage, setIndexImage] = useState(0);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [errorMessage, setErrorMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const isFocused = useIsFocused();
    const [isVideoOfflineOnline, setVideoOfflineOnline] = useState(1);
    const [isContentApi, setContentApi] = useState([])
    const onSelectSwitch = value => {
        setVideoOfflineOnline(value);
    };

    useEffect(() => {
        fetchDataAsync()
    }, [isFocused])

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

    const handleErrorMsg = () => {
        Animated.timing(
            fadeAnim,
            {
                toValue: isVisible ? 0 : 1,
                duration: 500,
                useNativeDriver: true
            }
        ).start();
        setTimeout(() => {
            setErrorMessage('');
        }, 3000);
    };

    const options = [
        {
            key: 1,
            title: 'Most High Pay',
        },
        {
            key: 2,
            title: 'Most Perfomance',
        },
        {
            key: 3,
            title: 'A - Z',
        },
        {
            key: 4,
            title: 'Z - A bc',
        },
    ];

    const fetchDataAsync = async () => {
        setLoading(true)
        const userData = await AsyncStorage.getItem('userData');
        const token = await AsyncStorage.getItem('accessToken');
        const tokenRefresh = await AsyncStorage.getItem('refreshToken');
        if (!userData && !token && tokenRefresh) {
            // Alert.alert("Unable to fetch mobile number, Login again");
            return;
        }
        const transformedUserData = JSON.parse(userData);
        const transformedAccessToken = JSON.parse(token);
        const transformedRefreshToken = JSON.parse(tokenRefresh);
        // console.log('transformedAccessToken ListofWomens--->', transformedAccessToken.accessToken);
        // console.log('transformedRefreshToken ListofWomens--->', transformedRefreshToken.refreshToken);
        // console.log('transformedUserData ListofWomens--->', transformedUserData.anganwadiId);
        const anganwadiId = transformedUserData.anganwadiId
        const accessToken = "Bearer " + transformedAccessToken.accessToken
        // const refreshToken = "refreshToken= " + transformedRefreshToken.refreshToken
        const responseContentApi = await getContentApi(accessToken)
        setLoading(false)
        console.log('responseContentApi--->', responseContentApi);
        if (responseContentApi.IsError == true) {
            handleErrorMsg()
            setErrorMessage(responseContentApi.message);
            return
        }
        setContentApi(responseContentApi.data)
    };

    const OfflineVideo = () => {
        return (
            <>
                {
                    isContentApi == null ?
                        <Text style={{ fontFamily: FONT.Charlatan, fontSize: SIZES.extraLarge, textAlign: 'center', width: '100%', marginTop: 50, color: '#B71C1C' }}>No record found</Text>
                        :
                        <VideoTab
                            data={options}
                            onPress={() => navigation.navigate('VideoScreenKid',
                                {
                                    videoDetails: {
                                        id: 'jane',
                                        firstName: 'Jane',
                                        lastName: 'Done',
                                        age: 25,
                                        options: options
                                    },
                                }
                            )}
                        />
                }

            </>
        )
    }

    const OnlineVideo = () => {
        return (
            <>
                <VideoTab
                    data={options}
                    onPress={() => navigation.navigate('VideoScreenKid',
                        {
                            videoDetails: {
                                id: 'jane',
                                firstName: 'Jane',
                                lastName: 'Done',
                                age: 25,
                                options: options
                            },
                        }
                    )}
                />
            </>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='light-content'
                backgroundColor={COLORS.brand.primary}
            />
            {errorMessage !== '' && (
                <Animated.View style={[styles.snackbar, {
                    opacity: fadeAnim
                }]}>
                    <Text style={styles.snackbarText}>{errorMessage}</Text>
                </Animated.View>
            )}
            {isLoading ?
                <View style={styles.loading}>
                    <ActivityIndicator size='large' color={COLORS.brand.primary} />
                </View>
                : null}
            <ImageBackground
                source={assets.ParkElement}
                style={{ width: windowWidth, height: '100%', resizeMode: 'cover', position: 'relative' }}
            >
                <View style={{ flexDirection: 'column', justifyContent: 'space-between', height: '100%', alignItems: 'center' }}>
                    <View style={styles.headerBox}>
                        <BackIconSecton
                            onPress={() => navigation.goBack()}
                            title='गर्भसंस्कार'
                        />
                        {/* <SvgXml xml={iamges[indexImage]} width={windowWidth >= 960 ? 132 : 120} height={windowWidth >= 960 ? 73 : 63} /> */}
                        <Image source={iamges[indexImage]} style={{ width: windowWidth >= 1280 ? 350 : 174, alignSelf: 'center', height: windowWidth >= 1280 ? 170 : 80 }} />
                        <View style={styles.menuBox}>
                            {/* <Text style={styles.titleText}></Text> */}
                            <VideoOfflineOnline
                                selectionMode={1}
                                onSelectSwitch={onSelectSwitch}
                            />
                        </View>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ width: '100%', height: '100%' }}
                    >

                        {isVideoOfflineOnline == 1 && <OfflineVideo />}
                        {isVideoOfflineOnline == 2 && <OnlineVideo />}

                        {/* <VideoTab
                            data={options}
                            onPress={() => navigation.navigate('VideoScreen',
                                {
                                    videoDetails: {
                                        id: 'jane',
                                        firstName: 'Jane',
                                        lastName: 'Done',
                                        age: 25,
                                        options: options
                                    },
                                }
                            )}
                        /> */}

                    </ScrollView>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default MarathiScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.brand.background,
    },
    headerBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: windowWidth - 30,
        alignSelf: 'center',
        marginBottom: 10,
        // height: 75,
    },
    menuBox: {
        width: windowWidth >= 960 ? 360 : 300,
        alignItems: 'flex-end',
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
    snackbar: {
        backgroundColor: '#B71C1C',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1,
        paddingVertical: 10,
        justifyContent: 'center'
    },
    snackbarText: {
        color: '#FFFFFF',
        fontSize: SIZES.medium,
        fontFamily: FONT.MartelSansRegular,
        textAlign: 'center'
    },
})