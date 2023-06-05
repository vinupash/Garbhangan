import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, Dimensions, ImageBackground } from 'react-native';
import { SvgXml } from 'react-native-svg';
import LogoIcon from '../../../../../assets/images/LogoIcon';
import { COLORS, FONT, SHADOWS, SIZES, assets } from '../../../../constants';
import LanguageTab from '../../../../components/LanguageTab';
import BackIcon from '../../../../../assets/images/BackIcon';
import { BackIconSecton } from '../../../../components/CustomButtons';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const LanguageScreen = ({ navigation }) => {
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
                            title='Language'
                        />
                        <SvgXml xml={iamges[indexImage]} width={windowWidth >= 960 ? 132 : 120} height={windowWidth >= 960 ? 73 : 63} />
                        <View style={styles.menuBox}>
                            {/* <Text style={styles.titleText}>Language</Text> */}
                        </View>
                    </View>

                    <View style={styles.btnBox}>
                        <LanguageTab
                            title="English"
                            onPress={() => navigation.navigate('GarbhaSanskarStack', { screen: 'EnglishScreen' })}
                        />

                        <LanguageTab
                            title="मराठी"
                            onPress={() => navigation.navigate('GarbhaSanskarStack', { screen: 'MarathiScreen' })}
                        />

                        <LanguageTab
                            title="हिंदी"
                            onPress={() => navigation.navigate('GarbhaSanskarStack', { screen: 'HindiScreen' })}
                        />
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default LanguageScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.brand.background,
    },
    btnBox: {
        marginBottom: 50,
        width: windowWidth - 200,
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
    headerBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: windowWidth - 50,
        alignSelf: 'center',
        marginTop: 10,
        height: 75,
    },
    menuBox: {
        width: 360,
        alignItems: 'flex-end',
    },
})