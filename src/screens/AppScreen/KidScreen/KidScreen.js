import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Dimensions, ScrollView } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { COLORS, SHADOWS, SIZES, FONT, assets } from '../../../constants';
import LogoIcon from '../../../../assets/images/LogoIcon';
import WomenIcon from '../../../../assets/images/WomenIcon';
import ScreenTab from '../../../components/ScreenTab';
import { BackIconSecton, BellSection, LogoutSection, RegistrationSection } from '../../../components/CustomButtons';
import { AuthContext } from '../../../context/AuthContext';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import FastImage from 'react-native-fast-image';
import welcomImage from './../../../../assets/images/welcome_img.gif'

const KidScreen = ({ navigation }) => {
    const { userLogout } = useContext(AuthContext)
    const iamges = [LogoIcon, LogoIcon, LogoIcon];
    const [indexImage, setIndexImage] = useState(0);
    const [isPromoVideo, setPromoVideo] = React.useState(true);

    useEffect(() => {
        handlePopupVideo()
    }, [])

    const handlePopupVideo = () => {
        setTimeout(() => {
            setPromoVideo(false);
        }, 7000);
    };
    useEffect(() => {
        const interval = setInterval(() => {
            setIndexImage((indexImage + 1) % iamges.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [indexImage]);

    const StackSection = ({ onPress }) => {
        return (
            <TouchableOpacity
                style={styles.backIcon}
                onPress={onPress}
            >
                <SvgXml xml={WomenIcon} height={40} width={40} />
            </TouchableOpacity>
        )
    }


    const data = [
        { key: '1', value: 'Garbha Sanskar' },
        { key: '2', value: 'Food & Fitness' },
        { key: '3', value: 'Growth & Changes' },
        { key: '4', value: 'List' },
    ];


    return (
        <>
            {isPromoVideo ?
                <View style={{ flex: 1 }}>
                    <StatusBar
                        barStyle='light-content'
                        backgroundColor={COLORS.brand.primary}
                    />
                    <FastImage
                        style={{ width: '100%', height: '100%' }}
                        source={welcomImage}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </View>
                :
                <SafeAreaView style={styles.container}>
                    <StatusBar
                        barStyle='light-content'
                        backgroundColor={COLORS.brand.primary}
                    />

                    <View style={styles.headerBox}>
                        <BackIconSecton
                            onPress={() => navigation.goBack()}
                            title="Kid's"
                        />
                        <SvgXml xml={iamges[indexImage]} width={132} height={73} />
                        <View style={styles.menuBox}>

                            <BellSection
                                onPress={() => navigation.navigate('WomenNavigationsStack', { screen: 'NotificationScreen' })}
                            />

                            <RegistrationSection
                                onPress={() => navigation.navigate('KidNavigationsStack', { screen: 'NewRegistrationKid' })}
                            />

                            <StackSection
                                onPress={() => navigation.navigate('WomenNavigationsStack', { screen: 'WomenScreen' })}
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
                                    title="List of Kid's"
                                    onPress={() => navigation.navigate('KidNavigationsStack', { screen: 'ListofKids' })}
                                    source={assets.child_img}
                                />
                            </ScrollView>
                        </View>
                    </View>

                    {/* <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={styles.sectionBox}>
                    <FlatList
                        data={data}
                        horizontal={true}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                // onPress={() => navigation.navigate('WomenNavigationsStack', { screen: 'WomenScreen' })}
                                style={styles.cardBox}
                            >
                                <View style={styles.innerCardBox}>

                                </View>
                                <View style={{
                                    height: 30,
                                    justifyContent: 'center',
                                    alignItems: 'center', backgroundColor: '#FFFFFF', borderBottomEndRadius: 20,
                                    borderBottomLeftRadius: 20,
                                }}>
                                    <Text style={styles.cardBoxTitle}>{item.value}</Text>
                                </View>
                            </TouchableOpacity>
                        }
                        keyExtractor={item => item.key}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View> */}
                </SafeAreaView>

            }
        </>

    )
}

export default KidScreen

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
    backIcon: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        ...SHADOWS.light,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bellIcon: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        ...SHADOWS.light,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontFamily: FONT.Charlatan,
        fontSize: SIZES.xxl,
        color: COLORS.brand.black,
        marginLeft: 20
    },
    registrationBtn: {
        width: 230,
        height: 50,
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#EACAA6',
        ...SHADOWS.light
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
        justifyContent: 'center',
    },
    cardBox: {
        width: 220,
        height: 350,
        backgroundColor: '#FFFFFF',
        marginVertical: 8,
        marginHorizontal: 10,
        borderRadius: 20,
        ...SHADOWS.light
    },
    separator: {
        width: 10,
    },
    innerCardBox: {
        width: '100%',
        height: 310,
        borderRadius: 20,
        backgroundColor: COLORS.brand.primary,
        ...SHADOWS.light,
        marginBottom: 5
    },
    cardBoxTitle: {
        fontFamily: FONT.Charlatan,
        fontSize: SIZES.medium,
        color: COLORS.brand.black,
    }
})