import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { COLORS, FONT, SIZES, SHADOWS } from '../../constants';
import { SvgXml } from 'react-native-svg';
import LogoIcon from '../../../assets/images/LogoIcon';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const HomeScreen = ({ navigation }) => {
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

    const BtnSection = ({
        onPress,
        title,
    }) => {
        return (
            <TouchableOpacity
                style={styles.sectionBtn}
                onPress={onPress}
            >
                <View style={[styles.loginBtnInner]}>

                </View>
                <View style={{ height: 40, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.btnText]}>{title}</Text>
                </View>
            </TouchableOpacity>
        )
    }


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='light-content'
                backgroundColor={COLORS.brand.primary}
            />
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', height: '100%', alignItems: 'center' }}>
                {/* <SvgXml xml={LogoIcon} width={192} height={123} style={{ marginTop: 50 }} /> */}
                <View style={{ alignItems: 'center', marginTop: 8 }}>
                    <SvgXml xml={iamges[indexImage]} width={191} height={100} />
                    <Text style={styles.subTitle}>{texts[index]}</Text>
                </View>

                <View style={styles.btnBox}>
                    <View style={{ width: '40%' }}>
                        <BtnSection
                            title="Women"
                            onPress={() => navigation.navigate('WomenNavigationsStack')}
                        />
                    </View>
                    <View style={{ width: '40%' }}>
                        <BtnSection
                            title="Kids"
                            onPress={() => navigation.navigate('KidNavigationsStack')}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
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
        width: windowWidth - 200,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    subTitle: {
        fontSize: SIZES.large,
        fontFamily: FONT.MartelSansRegular,
        color: COLORS.brand.black,
        marginTop: 10
    },
    sectionBtn: {
        width: '100%',
        height: 240,
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
        height: 200,
        borderRadius: 16,
        backgroundColor: '#204093',
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.light
    },
})