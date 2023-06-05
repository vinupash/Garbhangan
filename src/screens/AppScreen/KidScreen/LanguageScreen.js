import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, Dimensions, ImageBackground, Image, ScrollView } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { COLORS, FONT, SHADOWS, SIZES, assets } from '../../../constants';
import LanguageTab from '../../../components/LanguageTab';
import BackIcon from '../../../../assets/images/BackIcon';
import { BackIconSecton } from '../../../components/CustomButtons';
import LogoIcon from '../../../../assets/images/LogoIcon';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import BoardEng from '../../../../assets/images/Board-Eng.png'
import BoardHin from '../../../../assets/images/Board-Hin.png'
import BoardMar from '../../../../assets/images/Board-Mar.png'
import ScreenTab from '../../../components/ScreenTab';

const LanguageScreen = ({ navigation }) => {
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
                source={assets.ParkElement}
                style={{ width: windowWidth, height: '100%', resizeMode: 'cover', position: 'relative' }}
            >
                <View style={styles.headerBox}>
                    <BackIconSecton
                        onPress={() => navigation.goBack()}
                        title='Language'
                    />
                    <Image source={iamges[indexImage]} style={{ width: windowWidth >= 1280 ? 350 : 174, alignSelf: 'center', height: windowWidth >= 1280 ? 170 : 80 }} />
                    <View style={styles.menuBox}>
                        {/* <Text style={styles.titleText}>Language</Text> */}
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                    <View style={{ width: windowWidth - 100, alignItems: 'center', marginTop: windowWidth >= 1280 ? 30 : 20 }}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                            <ScreenTab
                                title="English"
                                onPress={() => navigation.navigate('KidsEducationStack', { screen: 'EnglishLearningStack' })}
                                source={assets.LanguageBackground}
                            />

                            <ScreenTab
                                title="मराठी"
                                onPress={() => navigation.navigate('KidsEducationStack', { screen: 'MarathiLearningStack' })}
                                source={assets.LanguageBackground}
                            />

                            <ScreenTab
                                title="हिंदी"
                                onPress={() => navigation.navigate('KidsEducationStack', { screen: 'HindiLearningStack' })}
                                source={assets.LanguageBackground}
                            />
                        </ScrollView>
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
        width: windowWidth - 30,
        alignSelf: 'center',
    },
    menuBox: {
        width: windowWidth >= 1280 ? 400 : 300,
        alignItems: 'flex-end',
    },
})
