import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Dimensions, ScrollView, ImageBackground, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { COLORS, SHADOWS, SIZES, FONT, assets } from '../../../constants';
import ScreenTab from '../../../components/ScreenTab';
import { BackIconSecton, BellSection, LogoutSection, RegistrationSection, StackSection } from '../../../components/CustomButtons';
import { AuthContext } from '../../../context/AuthContext';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import PromoVideo from './../../../../assets/images/women.mp4'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Video from 'react-native-video';
import '../../../Language/i18n';
import { useTranslation } from 'react-i18next';
import CloseIcon from '../../../../assets/images/CloseIcon';
import PlusIcon from '../../../../assets/images/PlusIcon';
import BoardEng from '../../../../assets/images/Board-Eng.png'
import BoardHin from '../../../../assets/images/Board-Hin.png'
import BoardMar from '../../../../assets/images/Board-Mar.png'

const WomenScreen = ({ navigation }) => {
    const { userLogout } = useContext(AuthContext)
    const iamges = [BoardEng, BoardHin, BoardMar];
    const [indexImage, setIndexImage] = useState(0);
    const [isPromoVideo, setPromoVideo] = React.useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const { t, i18n } = useTranslation();
    const [currentLanguage, setLanguage] = useState('');
    const [isVisible, setIsVisible] = useState(false);

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
    }, [])


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

    useEffect(() => {
        const interval = setInterval(() => {
            setIndexImage((indexImage + 1) % iamges.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [indexImage]);

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
                    <Video
                        source={PromoVideo}
                        resizeMode="cover"
                        style={{ width: '100%', height: '100%' }}
                        play={isPlaying}
                        muted={false}
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

                    {isVisible && <View style={{ width: 50, position: 'absolute', bottom: 80, right: 25, zIndex: 100, alignItems: 'center', flexDirection: 'column' }}>

                        <FBA onPress={() => changeLanguage('ma')} title='मराठी' />
                        <FBA onPress={() => changeLanguage('hi')} title='हिंदी' />
                        <FBA onPress={() => changeLanguage('en')} title='ENG' />

                    </View>}

                    <TouchableOpacity activeOpacity={0.98} style={styles.FAB_button} onPress={handlePress}>
                        {isVisible ? <SvgXml xml={CloseIcon} height={25} width={25} /> : <SvgXml xml={PlusIcon} height={20} width={20} />}
                    </TouchableOpacity>

                    <ImageBackground
                        source={assets.ParkElement}
                        style={{ width: windowWidth, height: '100%', resizeMode: 'cover', position: 'relative' }}
                    >

                        <View style={styles.headerBox}>
                            <BackIconSecton
                                onPress={() => navigation.goBack()}
                                title={t('Women')}
                            />

                            <Image source={iamges[indexImage]} style={{ width: windowWidth >= 1280 ? 350 : 174, alignSelf: 'center', height: windowWidth >= 1280 ? 170 : 80 }} />

                            <View style={styles.menuBox}>
                                <BellSection
                                    onPress={() => navigation.navigate('WomenNavigationsStack', { screen: 'NotificationScreen' })}
                                />

                                <RegistrationSection
                                    title={t("New Registration")}
                                    onPress={() => navigation.navigate('WomenNavigationsStack', { screen: 'NewRegistrationWomen' })}
                                />

                                <StackSection
                                    onPress={() => navigation.navigate('KidNavigationsStack', { screen: 'KidScreen' })}
                                />

                                <LogoutSection
                                    onPress={userLogout}
                                />
                            </View>
                        </View>

                        <View style={{ justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                            <View style={{ width: windowWidth - 100, alignItems: 'center', marginTop: windowWidth >= 1280 ? 30 : 20 }}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                                    <ScreenTab
                                        title={t('Garbha Sanskar')}
                                        onPress={() => navigation.navigate('GarbhaSanskarStack')}
                                        source={assets.GarbhSanskar}
                                    />

                                    <ScreenTab
                                        title={t("Food & Fitness")}
                                        onPress={() => navigation.navigate('WomenNavigationsStack', { screen: 'FoodFitnessStack' })}
                                        source={assets.FitnessImg}
                                    />

                                    <ScreenTab
                                        title={t("Growth & Changes")}
                                        onPress={() => navigation.navigate('WomenNavigationsStack', { screen: 'GrowthChangesStack' })}
                                        source={assets.GrowthImg}
                                    />

                                    <ScreenTab
                                        title={t("List of Women's")}
                                        onPress={() => navigation.navigate('WomenNavigationsStack', { screen: 'ListofWomens' })}
                                        source={assets.women_img}
                                    />

                                </ScrollView>
                            </View>
                        </View>

                    </ImageBackground>
                </SafeAreaView>
            }
        </>

    )
}

export default WomenScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.brand.background
    },
    headerBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: windowWidth - 30,
        alignSelf: 'center',
    },
    titleText: {
        fontFamily: FONT.Charlatan,
        fontSize: SIZES.xxl,
        color: COLORS.brand.black,
        marginLeft: 20
    },
    menuBox: {
        width: windowWidth >= 1280 ? 400 : 300,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sectionBox: {
        width: windowWidth - 100,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 20,
        borderWidth: 1
    },
    separator: {
        width: 10,
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
    FAB_button: {
        width: 50,
        height: 50,
        position: 'absolute',
        bottom: 25,
        right: 25,
        backgroundColor: COLORS.brand.primary,
        zIndex: 100,
        borderRadius: 50 / 2,
        ...SHADOWS.light,
        justifyContent: 'center',
        alignItems: 'center'
    }
})