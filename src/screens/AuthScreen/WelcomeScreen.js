import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { COLORS, FONT, SHADOWS, SIZES, assets } from '../../constants';
import { SvgXml } from 'react-native-svg';
import Logo from '../../../assets/images/Logo';
import HartIcon from '../../../assets/images/HartIcon';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import BoardEng from '../../../assets/images/Board-Eng.png'
import BoardHin from '../../../assets/images/Board-Hin.png'
import BoardMar from '../../../assets/images/Board-Mar.png'

const WelcomeScreen = ({ navigation }) => {
    const texts = ['Shikshan, Aaichya Savalitla...', 'शिक्षण, आईच्या सावलीतल...', 'सिख, मां की छाव में...'];
    const iamges = [BoardEng, BoardHin, BoardMar];
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
                source={assets.BackgroundLanguage}
                style={{ width: windowWidth, height: '100%', resizeMode: 'cover', position: 'relative' }}
            >
                <View style={{ position: 'absolute', left: 50, top: 20 }}>
                    <SvgXml xml={Logo} width={windowWidth >= 1280 ? 80 : 48} height={windowWidth >= 1280 ? 140 : 80} />
                </View>

                {/* <Image source={iamges[indexImage]} style={{ width: 260, height: 120, alignSelf: 'center' }} /> */}
                <Image source={iamges[indexImage]} style={{ width: windowWidth >= 1280 ? 360 : 174, alignSelf: 'center', height: windowWidth >= 1280 ? 170 : 80 }} />


                <View style={{ width: 300, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 20, right: 50 }}>
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
            </ImageBackground>
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
        width: 150,
        height: 50,
        borderRadius: 18,
        backgroundColor: '#102251',
        marginTop: 120,
        marginBottom: 10,
        ...SHADOWS.light,
    },
    btnText: {
        fontFamily: FONT.MartelSansBold,
        fontSize: 14,
        color: '#FFFFFF'
    },
    loginBtnInner: {
        width: 150,
        height: 45,
        borderRadius: 18,
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