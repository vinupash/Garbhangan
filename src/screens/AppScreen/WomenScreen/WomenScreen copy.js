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

    const data = [
        { key: '1', value: 'Garbha Sanskar' },
        { key: '2', value: 'Food & Fitness' },
        { key: '3', value: 'Growth & Changes' },
        { key: '4', value: "List of Women's" },
    ];

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
                <View style={{ width: windowWidth - 100, alignItems: 'center', }}>
                    <ScrollView horizontal={true}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('WomenNavigationsStack', { screen: 'GarbhaSanskarStack' })}
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
                                <Text style={styles.cardBoxTitle}>Cool</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('WomenNavigationsStack', { screen: 'GarbhaSanskarStack' })}
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
                                <Text style={styles.cardBoxTitle}>Cool</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('WomenNavigationsStack', { screen: 'GarbhaSanskarStack' })}
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
                                <Text style={styles.cardBoxTitle}>Cool</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('WomenNavigationsStack', { screen: 'GarbhaSanskarStack' })}
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
                                <Text style={styles.cardBoxTitle}>Cool</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
            <ScrollView horizontal={true} style={{ flex: 1 }}>

                {/* <View style={styles.sectionBox}> */}
                {/* <View>cool</View> */}
                {/* <TouchableOpacity
                        onPress={() => navigation.navigate('WomenNavigationsStack', { screen: 'GarbhaSanskarStack' })}
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
                            <Text style={styles.cardBoxTitle}>Cool</Text>
                        </View>
                    </TouchableOpacity> */}
                {/* <FlatList
                        data={data}
                        horizontal={true}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('WomenNavigationsStack', { screen: 'GarbhaSanskarStack' })}
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
                    /> */}
                {/* </View> */}
            </ScrollView>
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
        marginBottom: 5,
    },
    cardBoxTitle: {
        fontFamily: FONT.Charlatan,
        fontSize: SIZES.medium,
        color: COLORS.brand.black,
    }
})