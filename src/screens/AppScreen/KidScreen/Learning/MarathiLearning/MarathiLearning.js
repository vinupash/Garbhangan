import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, Dimensions, ScrollView, ActivityIndicator, Image, Animated, ImageBackground } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { COLORS, SHADOWS, FONT, SIZES, assets } from '../../../../../constants';
// import { BackIconSecton } from '../../../../components/CustomButtons';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import LogoIcon from '../../../../../../assets/images/LogoIcon';
import { BackIconSecton } from '../../../../../components/CustomButtons';
import BoardEng from '../../../../../../assets/images/Board-Eng.png'
import BoardHin from '../../../../../../assets/images/Board-Hin.png'
import BoardMar from '../../../../../../assets/images/Board-Mar.png'

const MarathiLearning = ({ navigation }) => {
    const [isLoading, setLoading] = useState(false)
    const texts = ['Shikshan, Aaichya Savalitla...', 'शिक्षण, आईच्या सावलीतल...', 'सिख, मां की छाव में...'];
    const iamges = [BoardEng, BoardHin, BoardMar];
    const [index, setIndex] = useState(0);
    const [indexImage, setIndexImage] = useState(0);
    const isFocused = useIsFocused()
    const [errorMessage, setErrorMessage] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [isVisible, setIsVisible] = useState(false);
    const { t, i18n } = useTranslation();
    const [currentLanguage, setLanguage] = useState('');

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

    useEffect(() => {
        fetchDataAsync()
    }, [isFocused])

    const handleErrorMsg = () => {
        Animated.timing(
            fadeAnim,
            {
                toValue: isVisible ? 0 : 1,
                duration: 500,
                useNativeDriver: true
            }
        ).start();
        setTimeout(() => {
            setErrorMessage('');
        }, 3000);
    };

    const fetchDataAsync = async () => {
        setLoading(true)
        const currentLanguage = await AsyncStorage.getItem('currentLanguage');
        if (!currentLanguage) {
            // Alert.alert("Unable to fetch mobile number, Login again");
            return;
        }
        setLoading(false)
        const transformedLanguage = JSON.parse(currentLanguage);
        // console.log('transformedLanguage--->', transformedLanguage.currentLanguage);
        setLanguage(transformedLanguage.currentLanguage)
    };

    const EducationTab = ({ onPress, title }) => {
        return (
            <View style={[styles.boxContent, { width: windowWidth >= 960 ? '47%' : '40%', }]}>
                <TouchableOpacity
                    activeOpacity={0.98}
                    style={[styles.sectionBtn, { minHeight: windowWidth >= 960 ? 80 : 60, }]}
                    onPress={onPress}
                >
                    <ImageBackground
                        source={assets.WoodBord}
                        style={{ width: '100%', height: windowWidth >= 960 ? 100 : 85, resizeMode: 'contain', position: 'relative', justifyContent: 'center', alignItems: 'center', ...SHADOWS.light }}
                    >
                        <Text style={{ fontFamily: FONT.Charlatan, fontSize: windowWidth >= 960 ? SIZES.xl : SIZES.mediumLarge, color: '#FFFFFF', letterSpacing: 1 }}>{title}</Text>
                    </ImageBackground>
                </TouchableOpacity>

            </View>
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
                            title="मराठी"
                        />
                        {/* <SvgXml xml={iamges[indexImage]} width={windowWidth >= 960 ? 132 : 120} height={windowWidth >= 960 ? 73 : 63} /> */}
                        <Image source={iamges[indexImage]} style={{ width: windowWidth >= 1280 ? 350 : 174, alignSelf: 'center', height: windowWidth >= 1280 ? 170 : 80 }} />
                        <View style={styles.menuBox}>
                            {/* <InputBoxSearch
                                value={query}
                                onChangeText={handleSearch}
                                placeholder="Search by name or ID"
                            /> */}
                        </View>
                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ width: '100%', height: '100%' }}
                    >
                        <View style={styles.cardSection}>
                            {/* <EducationTab
                                title="Rhymes"
                                onPress={() => navigation.navigate('Rhymes')}
                            />

                            <EducationTab
                                title="Story"
                                onPress={() => navigation.navigate('Story')}
                            />

                            <EducationTab
                                title="Alphabet"
                                onPress={() => navigation.navigate('Alphabet')}
                            /> */}

                            {/* <EducationTab
                                title="Math's"
                            />

                            <EducationTab
                                title="General Science"
                            /> */}
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default MarathiLearning

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
        width: windowWidth >= 960 ? 360 : 300,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    cardSection: {
        flexDirection: 'row',
        flexWrap: "wrap",
        // justifyContent: 'space-between',
        width: windowWidth >= 960 ? windowWidth - 200 : windowWidth - 100,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    boxContent: {
        // width: '47%',

        marginVertical: 5,
        marginHorizontal: 10
    },
    sectionBtn: {
        width: '100%',

        marginBottom: 5,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
    },
    profileSection: {
        width: 80,
        height: 100,
        borderRadius: 5,
        backgroundColor: COLORS.brand.primary,
        ...SHADOWS.light
    },
    labelText: {
        fontFamily: FONT.MartelSansBold,
        fontSize: SIZES.base,
        color: COLORS.brand.black
    },
    titleText: {
        fontFamily: FONT.MartelSansRegular,
        fontSize: SIZES.small,
        lineHeight: 18,
        color: COLORS.brand.black
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
    },
    snackbar: {
        backgroundColor: '#B71C1C',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1,
        paddingVertical: 10,
        justifyContent: 'center'
    },
    snackbarText: {
        color: '#FFFFFF',
        fontSize: SIZES.medium,
        fontFamily: FONT.MartelSansRegular,
        textAlign: 'center'
    },
})