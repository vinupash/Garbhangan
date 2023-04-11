import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Dimensions, ScrollView } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { COLORS, SHADOWS, SIZES, FONT } from '../../../constants';
import MenuComponents from '../../../components/MenuComponents';
import BackIcon from '../../../../assets/images/BackIcon';
import BellIcon from '../../../../assets/images/BellIcon';
import AddIcon from '../../../../assets/images/AddIcon';
import ChildIcon from '../../../../assets/images/ChildIcon';
import LogoIcon from '../../../../assets/images/LogoIcon';
import ScreenTab from '../../../components/ScreenTab';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const WomenScreen = ({ navigation }) => {
    const iamges = [LogoIcon, LogoIcon, LogoIcon];
    const [indexImage, setIndexImage] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setIndexImage((indexImage + 1) % iamges.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [indexImage]);

    const BackIconSecton = ({ onPress, title }) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', width: 360 }}>
                <TouchableOpacity
                    style={styles.backIcon}
                    onPress={onPress}
                >
                    <SvgXml xml={BackIcon} height={25} width={25} />
                </TouchableOpacity>
                <Text style={styles.titleText}>{title}</Text>
            </View>
        )
    }

    const BellSection = ({ onPress }) => {
        return (
            <TouchableOpacity
                style={styles.bellIcon}
                onPress={onPress}
            >
                <SvgXml xml={BellIcon} height={25} width={25} />
            </TouchableOpacity>
        )
    }

    const RegistrationSection = ({ onPress }) => {
        return (
            <TouchableOpacity
                style={styles.registrationBtn}
                onPress={onPress}
            >
                <Text style={{ fontFamily: FONT.Charlatan, fontSize: 22, color: COLORS.brand.black }}>New Registration</Text>
                <SvgXml xml={AddIcon} height={20} width={20} />
            </TouchableOpacity>
        )
    }

    const StackSection = ({ onPress }) => {
        return (
            <TouchableOpacity
                style={styles.backIcon}
                onPress={onPress}
            >
                <SvgXml xml={ChildIcon} height={40} width={40} />
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='light-content'
                backgroundColor={COLORS.brand.primary}
            />

            <View style={styles.headerBox}>
                <BackIconSecton
                    onPress={() => navigation.goBack()}
                    title='Women'
                />
                <SvgXml xml={iamges[indexImage]} width={132} height={73} />

                <View style={styles.menuBox}>
                    <BellSection
                        onPress={() => navigation.navigate('WomenNavigationsStack', { screen: 'NotificationScreen' })}
                    />

                    <RegistrationSection
                        onPress={() => navigation.navigate('WomenNavigationsStack', { screen: 'NewRegistrationWomen' })}
                    />

                    <StackSection
                        onPress={() => navigation.navigate('KidNavigationsStack', { screen: 'KidScreen' })}
                    />
                </View>
            </View>

            <View style={{ justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                <View style={{ width: windowWidth - 100, alignItems: 'center', marginTop: 30 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                        <ScreenTab
                            title="Garbha Sanskar"
                            onPress={() => navigation.navigate('GarbhaSanskarStack', { screen: 'LanguageScreen' })}
                        />

                        <ScreenTab
                            title="Food & Fitness"
                            onPress={() => navigation.navigate('WomenNavigationsStack', { screen: 'GarbhaSanskarStack' })}
                        />

                        <ScreenTab
                            title="Growth & Changes"
                            onPress={() => navigation.navigate('WomenNavigationsStack', { screen: 'GarbhaSanskarStack' })}
                        />

                        <ScreenTab
                            title="List of Women's"
                            onPress={() => navigation.navigate('WomenNavigationsStack', { screen: 'GarbhaSanskarStack' })}
                        />

                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default WomenScreen

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
        backgroundColor: '#FFF7EF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bellIcon: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        ...SHADOWS.light,
        backgroundColor: '#FFF7EF',
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
        borderWidth: 1
    },
    separator: {
        width: 10,
    },
})