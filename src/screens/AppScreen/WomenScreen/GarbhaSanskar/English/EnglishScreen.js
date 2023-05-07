import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, Dimensions, ScrollView, ImageBackground } from 'react-native';
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

const EnglishScreen = ({ navigation }) => {
    const texts = ['Shikshan, Aaichya Savalitla...', 'शिक्षण, आईच्या सावलीतल...', 'सिख, मां की छाव में...'];
    const iamges = [LogoIcon, LogoIcon, LogoIcon];
    const [index, setIndex] = useState(0);
    const [indexImage, setIndexImage] = useState(0);

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
                            title='Garbha Sanskar'
                        />
                        <SvgXml xml={iamges[indexImage]} width={132} height={73} />
                        <View style={styles.menuBox}>
                            <Text style={styles.titleText}></Text>
                        </View>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ width: '100%', height: '100%' }}
                    >

                        <VideoTab
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
                        />

                    </ScrollView>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default EnglishScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.brand.background,
    },
    headerBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: windowWidth - 50,
        alignSelf: 'center',
        marginVertical: 10,
        height: 75,
    },
    menuBox: {
        width: 360,
        alignItems: 'flex-end',
    },

})