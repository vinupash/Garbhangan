import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, Dimensions, ActivityIndicator, Image, Alert, ImageBackground } from 'react-native';
import { COLORS, FONT, SIZES, SHADOWS, assets } from '../../constants';
import { SvgXml } from 'react-native-svg';
import LogoIcon from '../../../assets/images/LogoIcon';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import PromoVideo from './../../../assets/images/welcome_video.mp4'
import Video from 'react-native-video';
import PlusIcon from '../../../assets/images/PlusIcon';
import CloseIcon from '../../../assets/images/CloseIcon';
import '../../Language/i18n';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import BoardEng from '../../../assets/images/Board-Eng.png'
import BoardHin from '../../../assets/images/Board-Hin.png'
import BoardMar from '../../../assets/images/Board-Mar.png'
import { LogoutSection } from '../../components/CustomButtons';
import { AuthContext } from '../../context/AuthContext';

const HomeScreen = ({ navigation }) => {
    const { userLogout } = useContext(AuthContext)
    const [isLoading, setLoading] = useState(false)
    // const texts = ['Shikshan, Aaichya Savalitla...', 'शिक्षण, आईच्या सावलीतल...', 'सिख, मां की छाव में...'];
    // const iamges = [LogoIcon, LogoIcon, LogoIcon];
    const [index, setIndex] = useState(0);
    // const [indexImage, setIndexImage] = useState(0);
    const [isPromoVideo, setPromoVideo] = React.useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const { t, i18n } = useTranslation();
    const [currentLanguage, setLanguage] = useState('');
    const isFocused = useIsFocused()
    const iamges = [BoardEng, BoardHin, BoardMar];
    const [indexImage, setIndexImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndexImage((indexImage + 1) % iamges.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [indexImage]);

    useEffect(() => {
        const fetchDataAsync = async () => {
            // setLoading(true)
            const currentLanguage = await AsyncStorage.getItem('currentLanguage');
            if (!currentLanguage) {
                // Alert.alert("Unable to fetch mobile number, Login again");
                return;
            }
            // setLoading(false)
            const transformedLanguage = JSON.parse(currentLanguage);
            // console.log('transformedLanguage--->', transformedLanguage.currentLanguage);
            setLanguage(transformedLanguage.currentLanguage)
        };
        fetchDataAsync()
    }, [isFocused])

    const changeLanguage = value => {
        i18n
            .changeLanguage(value)
            .then(() => {
                setLanguage(value);
                AsyncStorage.setItem(
                    "currentLanguage",
                    JSON.stringify({
                        currentLanguageStatusUser: 1,
                        currentLanguage: value,
                        // refreshToken: json.data.refreshToken,
                    })
                );
            })
            .catch(err => console.log(err));
    };

    const handlePress = () => {
        setIsVisible(!isVisible);
    };

    useEffect(() => {
        handlePopupVideo()
    }, [])

    const handlePopupVideo = () => {
        setTimeout(() => {
            setPromoVideo(false);
            setIsPlaying(true);
        }, 7000);
    };

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setIndex((index + 1) % texts.length);
    //     }, 5000);

    //     return () => clearInterval(interval);
    // }, [index]);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setIndexImage((indexImage + 1) % iamges.length);
    //     }, 5000);

    //     return () => clearInterval(interval);
    // }, [indexImage]);

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
                            height: 310,
                            borderRadius: 16,
                        }}
                    />
                </View>
                <View style={{ height: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.btnText]}>{title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const FBA = ({
        title,
        onPress,
    }) => {
        return (
            <TouchableOpacity activeOpacity={0.98}
                style={styles.FBA} onPress={onPress}><Text style={styles.FBA_text}>{title}</Text></TouchableOpacity>
        )
    }

    return (

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
                        source={PromoVideo}
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

                    {isVisible && <View style={{ width: 50, position: 'absolute', bottom: 105, right: 25, zIndex: 100, alignItems: 'center', flexDirection: 'column' }}>

                        <FBA onPress={() => changeLanguage('ma')} title='मराठी' />
                        <FBA onPress={() => changeLanguage('hi')} title='हिंदी' />
                        <FBA onPress={() => changeLanguage('en')} title='ENG' />

                    </View>}

                    <TouchableOpacity activeOpacity={0.98} style={styles.FAB_button} onPress={handlePress}>
                        {isVisible ? <SvgXml xml={CloseIcon} height={25} width={25} /> : <SvgXml xml={PlusIcon} height={20} width={20} />}
                    </TouchableOpacity>

                    {isLoading ?
                        <View style={styles.loading}>
                            <ActivityIndicator size='large' color={COLORS.brand.primary} />
                        </View>
                        : null}
                    <ImageBackground
                        source={assets.ParkElement}
                        style={{ width: windowWidth, height: '100%', resizeMode: 'cover', position: 'relative' }}
                    >
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>

                            <View style={styles.headerBox}>
                                <View style={{ width: 50, height: 50 }}></View>
                                <Image source={iamges[indexImage]} style={{ width: 280, height: 120 }} />
                                <LogoutSection onPress={userLogout} />
                            </View>
                            {/* <ImageBackground
                                source={assets.Bamboojungle}
                                style={{ width: 280, height: 160, resizeMode: 'cover', position: 'relative', justifyContent: 'center', alignItems: 'center' }}
                            >
                                <SvgXml xml={iamges[indexImage]} width={128} height={69} style={{ marginTop: 40 }} />
                                <Text style={styles.subTitle}>{texts[index]}</Text>
                            </ImageBackground> */}
                            <View style={styles.btnBox}>
                                <View style={{
                                    width: 220,
                                    height: 350,
                                }}>
                                    <BtnSection
                                        title={t('Women')}
                                        onPress={() => navigation.navigate('WomenNavigationsStack')}
                                        source={assets.women_img}
                                    />
                                </View>
                                <View style={{
                                    width: 220,
                                    height: 350,
                                }}>
                                    <BtnSection
                                        title={t("Kid's")}
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
        marginBottom: 30,
        width: windowWidth - 450,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // marginTop: 30,
    },
    subTitle: {
        fontSize: SIZES.small,
        fontFamily: FONT.MartelSansRegular,
        color: '#FFFFFF',
        marginTop: 5
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
        height: 310,
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
    FBA: {
        width: 40,
        height: 40,
        backgroundColor: '#FFFFFF',
        borderRadius: 40 / 2,
        marginBottom: 5,
        ...SHADOWS.light,
        justifyContent: 'center',
        alignItems: 'center'
    },
    FBA_text: {
        color: COLORS.brand.primary,
        fontSize: SIZES.small,
        fontFamily: FONT.MartelSansRegular
    },
    headerBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: windowWidth - 50,
        alignSelf: 'center',
    },
    FAB_button: {
        width: 50,
        height: 50,
        position: 'absolute',
        bottom: 50,
        right: 25,
        backgroundColor: COLORS.brand.primary,
        zIndex: 100,
        borderRadius: 50 / 2,
        ...SHADOWS.light,
        justifyContent: 'center',
        alignItems: 'center'
    }
})