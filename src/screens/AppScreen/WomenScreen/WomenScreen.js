import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Dimensions, ScrollView, ImageBackground } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { COLORS, SHADOWS, SIZES, FONT, assets } from '../../../constants';
import MenuComponents from '../../../components/MenuComponents';
import BackIcon from '../../../../assets/images/BackIcon';
import BellIcon from '../../../../assets/images/BellIcon';
import AddIcon from '../../../../assets/images/AddIcon';
import ChildIcon from '../../../../assets/images/ChildIcon';
import LogoIcon from '../../../../assets/images/LogoIcon';
import ScreenTab from '../../../components/ScreenTab';
import LogoutIcon from '../../../../assets/images/LogoutIcon';
import { BackIconSecton, BellSection, LogoutSection, RegistrationSection, StackSection } from '../../../components/CustomButtons';
import { AuthContext } from '../../../context/AuthContext';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import FastImage from 'react-native-fast-image';
import welcomImage from './../../../../assets/images/welcome_img.gif'
import PromoVideo from './../../../../assets/images/welcome_video.mp4'
import Video from 'react-native-video';

const WomenScreen = ({ navigation }) => {
    const { userLogout } = useContext(AuthContext)
    const iamges = [LogoIcon, LogoIcon, LogoIcon];
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
            setIndexImage((indexImage + 1) % iamges.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [indexImage]);

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

                    <ImageBackground
                        source={assets.ParkElement}
                        style={{ width: windowWidth, height: '100%', resizeMode: 'cover', position: 'relative' }}
                    >

                        <View style={styles.headerBox}>
                            <BackIconSecton
                                onPress={() => navigation.goBack()}
                                title='Women'
                            />

                            <SvgXml xml={iamges[indexImage]} width={132} height={73} />

                            <View style={styles.menuBox}>
                                <BellSection
                                    onPress={() => navigation.navigate('WomenNavigationsStack', { screen: 'NotificationScreen' })}
                                />

                                <RegistrationSection
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
                            <View style={{ width: windowWidth - 100, alignItems: 'center', marginTop: 30 }}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                                    <ScreenTab
                                        title="Garbha Sanskar"
                                        onPress={() => navigation.navigate('GarbhaSanskarStack', { screen: 'LanguageScreen' })}
                                        source={assets.women_img}
                                    />

                                    <ScreenTab
                                        title="Food & Fitness"
                                        onPress={() => navigation.navigate('WomenNavigationsStack', { screen: 'GarbhaSanskarStack' })}
                                        source={assets.women_img}
                                    />

                                    <ScreenTab
                                        title="Growth & Changes"
                                        onPress={() => navigation.navigate('WomenNavigationsStack', { screen: 'GarbhaSanskarStack' })}
                                        source={assets.women_img}
                                    />

                                    <ScreenTab
                                        title="List of Women's"
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
        width: windowWidth - 50,
        alignSelf: 'center',
        marginTop: 10
    },
    titleText: {
        fontFamily: FONT.Charlatan,
        fontSize: SIZES.xxl,
        color: COLORS.brand.black,
        marginLeft: 20
    },
    menuBox: {
        width: 360,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
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
})