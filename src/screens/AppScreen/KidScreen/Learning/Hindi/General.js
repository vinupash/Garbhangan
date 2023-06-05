import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, Dimensions, ScrollView, ImageBackground, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';
import LanguageTab from '../../../../../components/LanguageTab';
import BackIcon from '../../../../../../assets/images/BackIcon';

import RadioButtonBoxValue from '../../../../../components/RadioButtonBoxValue';
import LogoIcon from '../../../../../../assets/images/LogoIcon';
import VideoTab from '../../../../../components/VideoTab';
import { COLORS, assets } from '../../../../../constants';
import { BackIconSecton } from '../../../../../components/CustomButtons';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import BoardEng from '../../../../../../assets/images/Board-Eng.png'
import BoardHin from '../../../../../../assets/images/Board-Hin.png'
import BoardMar from '../../../../../../assets/images/Board-Mar.png'
import VideoOfflineOnline from '../../../../../components/VideoOfflineOnline';

const General = ({ navigation }) => {
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


    const OfflineVideo = () => {
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
            <ImageBackground
                source={assets.ParkElement}
                style={{ width: windowWidth, height: '100%', resizeMode: 'cover', position: 'relative' }}
            >
                <View style={{ flexDirection: 'column', justifyContent: 'space-between', height: '100%', alignItems: 'center' }}>
                    <View style={styles.headerBox}>
                        <BackIconSecton
                            onPress={() => navigation.goBack()}
                            title='Alphabet'
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

export default General

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
        width: 360,
        alignItems: 'flex-end',
    },

})