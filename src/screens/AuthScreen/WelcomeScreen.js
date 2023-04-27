import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import { COLORS, FONT, SHADOWS, SIZES } from '../../constants';
import { SvgXml } from 'react-native-svg';
import Logo from '../../../assets/images/Logo';
import LogoIcon from '../../../assets/images/LogoIcon';
import HartIcon from '../../../assets/images/HartIcon';
import FastImage from 'react-native-fast-image';
import LogoGif from '../../../assets/images/Logo.gif'
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const WelcomeScreen = ({ navigation }) => {
    const texts = ['Shikshan, Aaichya Savalitla...', 'शिक्षण, आईच्या सावलीतल...', 'सिख, मां के छाया की...'];
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
            <View style={styles.loginBox}>
                <View style={{ width: '45%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <SvgXml xml={Logo} width={268} height={418} />
                    {/* <FastImage
                        source={{ uri: 'https://media.giphy.com/media/l3vR9aA1jbkAp7i8E/giphy.gif' }}
                        style={{ width: 200, height: 200 }}
                    /> */}
                </View>
                <View style={{ width: '55%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    {/* <SvgXml xml={LogoIcon} width={202} height={111} /> */}
                    <SvgXml xml={iamges[indexImage]} width={202} height={111} />
                    <Text style={styles.subTitle}>{texts[index]}</Text>

                    <TouchableOpacity
                        activeOpacity={0.98}
                        style={styles.loginBtn}
                        onPress={() => navigation.navigate('LoginScreen')}
                    >
                        <View style={styles.loginBtnInner}>

                            <Text style={styles.btnText}>Log In</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.textBox}>
                        <Text style={[styles.boxTitle, { marginRight: 8 }]}>MADE WITH</Text>
                        <SvgXml xml={HartIcon} width={30} height={20} />
                        <Text style={[styles.boxTitle, { marginLeft: 8 }]}>BY REVOLT CREATIONS</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.brand.background
    },
    loginBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: windowHeight
    },
    loginBtn: {
        width: 297,
        height: 106,
        borderRadius: 22,
        backgroundColor: '#102251',
        marginTop: 120,
        marginBottom: 20,
        ...SHADOWS.light,
    },
    btnText: {
        fontFamily: FONT.MartelSansBold,
        fontSize: 32,
        color: '#FFFFFF'
    },
    loginBtnInner: {
        width: 297,
        height: 95,
        borderRadius: 22,
        backgroundColor: '#204093',
        justifyContent: 'center',
        alignItems: 'center'
    },
    subTitle: {
        fontSize: SIZES.extraLarge,
        fontFamily: FONT.MartelSansRegular,
        color: COLORS.brand.black,
        marginTop: 30
    },
    textBox: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    boxTitle: {
        fontSize: SIZES.font,
        fontFamily: FONT.MartelSansBold,
        color: COLORS.brand.black
    }
})