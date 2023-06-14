import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, Dimensions, ScrollView, ImageBackground, Image } from 'react-native';
import { COLORS, SHADOWS, assets, FONT, SIZES } from '../../../../../constants';
import { BackIconSecton } from '../../../../../components/CustomButtons';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import BoardEng from '../../../../../../assets/images/Board-Eng.png'
import BoardHin from '../../../../../../assets/images/Board-Hin.png'
import BoardMar from '../../../../../../assets/images/Board-Mar.png'
import VideoOfflineOnline from '../../../../../components/VideoOfflineOnline';
import BolnariGuha from '../../../../../../assets/images/videos/Marathi/Story/Bolnari-Guha.jpg'
import ChalReBhoplyaTunukTunuk from '../../../../../../assets/images/videos/Marathi/Story/Chal-Re-Bhoplya-Tunuk-Tunuk.jpg'
import ChanChanGoshti from '../../../../../../assets/images/videos/Marathi/Story/Chan-Chan-Goshti.jpg'
import ChaturSasa from '../../../../../../assets/images/videos/Marathi/Story/Chatur-Sasa.jpg'
import JaduchaHansa from '../../../../../../assets/images/videos/Marathi/Story/Jaducha-hansa.jpg'
import MakadAniMagar from '../../../../../../assets/images/videos/Marathi/Story/Makad-Ani-Magar.jpg'
import NashibwanShahad from '../../../../../../assets/images/videos/Marathi/Story/Nashibwan-shahad.jpg'
import SasaShivha from '../../../../../../assets/images/videos/Marathi/Story/Sasa-and-shivha.jpg'
import TheFrog from '../../../../../../assets/images/videos/Marathi/Story/The-frog.jpg'

const Story = ({ navigation }) => {
    const texts = ['Shikshan, Aaichya Savalitla...', 'शिक्षण, आईच्या सावलीतल...', 'सिख, मां की छाव में...'];
    const iamges = [BoardEng, BoardHin, BoardMar];
    const [index, setIndex] = useState(0);
    const [indexImage, setIndexImage] = useState(0);
    const [isVideoOfflineOnline, setVideoOfflineOnline] = useState(1);

    const onSelectSwitch = value => {
        setVideoOfflineOnline(value);
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

    const options = [
        {
            key: 1,
            title: 'बोलनारी गुहा',
            poster: BolnariGuha,
            video: 1
        },
        {
            key: 2,
            title: 'चल रे भोपल्या टुनुक टुनुक',
            poster: ChalReBhoplyaTunukTunuk,
            video: 2
        },
        {
            key: 3,
            title: 'छान छान गोष्टी',
            poster: ChanChanGoshti,
            video: 3
        },
        {
            key: 4,
            title: 'चतुर ससा',
            poster: ChaturSasa,
            video: 4
        },
        {
            key: 5,
            title: 'जादूचा हंस',
            poster: JaduchaHansa,
            video: 5
        },
        {
            key: 6,
            title: 'माकड आणि मगर',
            poster: MakadAniMagar,
            video: 6
        },
        {
            key: 7,
            title: 'नशिबवान शहाळं',
            poster: NashibwanShahad,
            video: 7
        },
        {
            key: 8,
            title: 'ससा आणि सिंह',
            poster: SasaShivha,
            video: 8
        },
        {
            key: 9,
            title: 'बेडूक',
            poster: TheFrog,
            video: 9
        },
    ];

    const OfflineVideoData = () => {
        return options.map((OfflineVideoInfo, i) => {
            return (
                <View style={styles.boxContent} key={i}>
                    <TouchableOpacity
                        activeOpacity={0.98}
                        style={styles.sectionBtn}
                        onPress={() => navigation.navigate('MarathiLearningStack', {
                            screen: 'VideoScreenMarathiRhymeStory',
                            params: { video: OfflineVideoInfo.video },
                        })}
                    >
                        <View style={[styles.loginBtnInner]}>
                            <Image
                                source={OfflineVideoInfo.poster}
                                style={{
                                    width: '100%',
                                    height: 250,
                                    borderRadius: 16,
                                }}
                            />
                        </View>
                        <View style={{ height: 40, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.btnText]}>{OfflineVideoInfo.title}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        })
    }

    const OfflineVideo = () => {
        return (
            <>
                <View style={styles.videoSection}>
                    {OfflineVideoData()}
                </View>
            </>
        )
    }

    const OnlineVideo = () => {
        return (
            <>
                <Text>Online video</Text>
            </>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='light-content'
                backgroundColor={COLORS.brand.primary}
            />
            <ImageBackground
                source={assets.ParkElement}
                style={{ width: windowWidth, height: '100%', resizeMode: 'cover', position: 'relative' }}
            >
                <View style={{ flexDirection: 'column', justifyContent: 'space-between', height: '100%', alignItems: 'center' }}>
                    <View style={styles.headerBox}>
                        <BackIconSecton
                            onPress={() => navigation.goBack()}
                            title='कथा'
                        />
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

                    </ScrollView>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Story

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
        marginBottom: 5,
    },
    menuBox: {
        width: 360,
        alignItems: 'flex-end',
    },
    videoSection: {
        flexDirection: 'row',
        flexWrap: "wrap",
        width: windowWidth - 50,
        alignSelf: 'center'
    },
    boxContent: {
        width: '33.33%',
        padding: 8
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
    btnText: {
        fontFamily: FONT.Charlatan,
        fontSize: SIZES.medium,
        color: COLORS.brand.black
    },
    sectionBtn: {
        width: '100%',
        height: 300,
        borderRadius: 16,
        backgroundColor: "#FFFFFF",
        ...SHADOWS.light,
    },
})