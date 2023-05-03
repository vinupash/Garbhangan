import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, Dimensions, ActivityIndicator, Image, Alert, ImageBackground } from 'react-native';
import { COLORS, FONT, SIZES, SHADOWS, assets } from '../../constants';
import { SvgXml } from 'react-native-svg';
import LogoIcon from '../../../assets/images/LogoIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import { useIsFocused } from '@react-navigation/native';
import jwtDecode from 'jwt-decode';
import FastImage from 'react-native-fast-image';
import welcomImage from './../../../assets/images/welcome_img.gif'
import Cool from './../../../assets/images/welcome_video.mp4'
import Video from 'react-native-video';
const HomeScreen = ({ navigation }) => {
    const [isLoading, setLoading] = useState(false)
    const texts = ['Shikshan, Aaichya Savalitla...', 'शिक्षण, आईच्या सावलीतल...', 'सिख, मां के छाया की...'];
    const iamges = [LogoIcon, LogoIcon, LogoIcon];
    const [index, setIndex] = useState(0);
    const [indexImage, setIndexImage] = useState(0);
    const [isPromoVideo, setPromoVideo] = React.useState(true);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        handlePopupVideo()
    }, [])

    const handlePopupVideo = () => {
        setTimeout(() => {
            setPromoVideo(false);
            setIsPlaying(true);
        }, 7000);
    };

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
                            height: 250,
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

    return (

        // <>
        //     {isPromoVideo ?

        //         <Video
        //             source={Cool}
        //             resizeMode="cover"
        //             style={{ width: '100%', height: '100%' }}
        //             play={isPlaying}
        //             muted={true}
        //             paused={false}
        //             repeat={false}
        //             playInBackground={false}
        //             playWhenInactive={false}
        //         /> : <Text>Cool</Text>
        //     }
        // </>


        <>
            {isPromoVideo ?
                <View style={{ flex: 1 }}>
                    <StatusBar
                        barStyle='light-content'
                        backgroundColor={COLORS.brand.primary}
                    />
                    {/* <FastImage
                        style={{ width: '100%', height: '100%' }}
                        source={welcomImage}
                        resizeMode={FastImage.resizeMode.cover}
                    /> */}

                    <Video
                        source={Cool}
                        resizeMode="cover"
                        style={{ width: '100%', height: '100%' }}
                        play={isPlaying}
                        muted={true}
                        paused={false}
                        repeat={false}
                        playInBackground={false}
                        playWhenInactive={false}
                    />
                </View>
                :
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
                    <ImageBackground
                        source={assets.ParkElement}
                        style={{ width: windowWidth, height: '100%', resizeMode: 'cover', position: 'relative' }}
                    >
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', height: '100%', alignItems: 'center' }}>

                            <ImageBackground
                                source={assets.Bamboojungle}
                                style={{ width: 280, height: 160, resizeMode: 'cover', position: 'relative', justifyContent: 'center', alignItems: 'center' }}
                            >
                                <SvgXml xml={iamges[indexImage]} width={128} height={69} style={{ marginTop: 40 }} />
                                <Text style={styles.subTitle}>{texts[index]}</Text>
                            </ImageBackground>

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
                    </ImageBackground>
                </SafeAreaView>
            }
        </>

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
        fontSize: SIZES.small,
        fontFamily: FONT.MartelSansRegular,
        color: '#FFFFFF',
        marginTop: 5
    },
    sectionBtn: {
        width: '100%',
        height: 300,
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
        height: 250,
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