import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Dimensions, ScrollView, Animated, Image, ActivityIndicator, Keyboard, ImageBackground } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { COLORS, SHADOWS, SIZES, FONT, assets } from '../../../constants';
import BackIcon from '../../../../assets/images/BackIcon';
import moment from 'moment';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doctorVisitsList } from '../../../constants/AllApiCall';
import BoardEng from '../../../../assets/images/Board-Eng.png'
import BoardHin from '../../../../assets/images/Board-Hin.png'
import BoardMar from '../../../../assets/images/Board-Mar.png'

const ListofDocterVisit = ({ navigation }) => {
    const [isLoading, setLoading] = useState(false)
    const [isDocterVisitList, setDocterVisitList] = useState([]);
    const iamges = [BoardEng, BoardHin, BoardMar];
    const [errorMessage, setErrorMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const isFocused = useIsFocused()
    const [isAccessToken, setAccessToken] = useState('')
    const [isAnganwadiId, setAnganwadiId] = useState('')
    const [isSuccessMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchDataAsync()
    }, [isFocused])

    const fetchDataAsync = async () => {
        setLoading(true)
        const userData = await AsyncStorage.getItem('userData');
        const token = await AsyncStorage.getItem('accessToken');
        const tokenRefresh = await AsyncStorage.getItem('refreshToken');
        if (!userData && !token && tokenRefresh) {
            // Alert.alert("Unable to fetch mobile number, Login again");
            return;
        }

        const transformedUserData = JSON.parse(userData);
        const transformedAccessToken = JSON.parse(token);
        setAnganwadiId(transformedUserData.anganwadiId)
        const accessToken = "Bearer " + transformedAccessToken.accessToken
        setAccessToken(accessToken)
        const anganwadiId = transformedUserData.anganwadiId
        const responseDoctorVisitsList = await doctorVisitsList(accessToken, anganwadiId)
        setLoading(false)
        if (responseDoctorVisitsList.IsError == true) {
            handleErrorMsg()
            setErrorMessage(responseDoctorVisitsList.message);
            return
        }
        responseDoctorVisitsList.data.sort((a, b) => b.id - a.id);
        setDocterVisitList(responseDoctorVisitsList.data)

    };

    const [indexImage, setIndexImage] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setIndexImage((indexImage + 1) % iamges.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [indexImage]);

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

    const handleSuccessMsg = () => {
        Animated.timing(
            fadeAnim,
            {
                toValue: isVisible ? 0 : 1,
                duration: 500,
                useNativeDriver: true
            }
        ).start();
        setTimeout(() => {

        }, 5000);
    };

    const BackIconSecton = ({ onPress, title }) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', width: windowWidth >= 1280 ? 360 : 300 }}>
                <TouchableOpacity
                    style={styles.backIcon}
                    onPress={onPress}
                    activeOpacity={0.98}
                >
                    <SvgXml xml={BackIcon} height={windowWidth >= 1280 ? 25 : 20} width={windowWidth >= 1280 ? 25 : 20} />
                </TouchableOpacity>
                <Text style={[styles.titleText, { fontSize: windowWidth >= 1280 ? SIZES.xl : SIZES.extraLarge }]}>{title}</Text>
            </View>
        )
    }

    const AdmitCard = () => {
        return isDocterVisitList.map((AdmitCardData, i) => {
            return (
                <View style={styles.boxContent} key={i}>
                    <TouchableOpacity
                        activeOpacity={0.98}
                        style={styles.sectionBtn}
                    >
                        <View style={[styles.profileSection]}>
                            {
                                AdmitCardData.profilePicture == null ?
                                    <Image
                                        source={assets.child_img}
                                        style={{
                                            width: '100%',
                                            height: 150,
                                            borderRadius: 5,
                                        }}
                                    />
                                    :
                                    <Image
                                        source={{ uri: `data:image/png;base64,${AdmitCardData.profilePicture}` }}
                                        style={{
                                            width: '100%',
                                            height: 150,
                                            borderRadius: 5,
                                        }}
                                    />
                            }
                        </View>
                        <View style={{ flex: 1, height: '100%' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.labelText, { marginRight: 5 }]}>Docter Name:</Text>
                                <Text style={{
                                    fontFamily: FONT.MartelSansRegular,
                                    fontSize: SIZES.small,
                                    color: COLORS.brand.black
                                }}>{AdmitCardData.doctor.firstName} {AdmitCardData.doctor.lastName}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: '49%' }}>
                                    <Text style={[styles.labelText]}>Qualification</Text>
                                    <Text style={{
                                        fontFamily: FONT.MartelSansRegular,
                                        fontSize: SIZES.small,
                                        color: COLORS.brand.black
                                    }}>{AdmitCardData.doctor.qualification}</Text>
                                </View>
                                <View style={{ width: '49%' }}>
                                    <Text style={[styles.labelText]}>Date of Visit:</Text>
                                    <Text style={{
                                        fontFamily: FONT.MartelSansRegular,
                                        fontSize: SIZES.small,
                                        color: COLORS.brand.black
                                    }}>{moment(AdmitCardData.dateOfVisit).format("DD-MM-YYYY")}</Text>
                                </View>
                            </View>
                            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: '100%' }}>
                                    <Text style={[styles.labelText]}>Date of Visit:</Text>
                                    <Text style={{
                                        fontFamily: FONT.MartelSansRegular,
                                        fontSize: SIZES.small,
                                        color: COLORS.brand.black
                                    }}>{moment(AdmitCardData.dateOfVisit).format("DD-MM-YYYY")}</Text>
                                </View>
                            </View> */}
                        </View>
                    </TouchableOpacity>
                </View>
            );
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='light-content'
                backgroundColor={COLORS.brand.primary}
            />
            {isLoading ?
                <View style={styles.loading}>
                    <ActivityIndicator size='large' color={COLORS.brand.primary} />
                </View>
                : null}
            {errorMessage !== '' && (
                <Animated.View style={[styles.snackbar, {
                    opacity: fadeAnim
                }]}>
                    <Text style={styles.snackbarText}>{errorMessage}</Text>
                </Animated.View>
            )}

            {isSuccessMessage !== '' && (
                <Animated.View style={[styles.snackbar, {
                    opacity: fadeAnim, backgroundColor: '#28a745'
                }]}>
                    <Text style={[styles.snackbarText, { color: '#FFFFFF' }]}>{isSuccessMessage}</Text>
                </Animated.View>
            )}

            <ImageBackground
                source={assets.ParkElement}
                style={{ width: windowWidth, height: '100%', resizeMode: 'cover', position: 'relative' }}
            >
                <View style={{ flexDirection: 'column', justifyContent: 'space-between', height: '100%', alignItems: 'center' }}>
                    <View style={styles.headerBox}>
                        <BackIconSecton
                            onPress={() => navigation.goBack()}
                            title="Doctor Visit"
                        />
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
                            {isDocterVisitList.length === 0 ? <Text style={{ fontFamily: FONT.Charlatan, fontSize: SIZES.extraLarge, textAlign: 'center', width: '100%', marginTop: 50, color: '#B71C1C' }}>No record found</Text> : <>
                                {AdmitCard()}
                                {/* <Text>{JSON.stringify(isDocterVisitList)}</Text> */}
                            </>}
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default ListofDocterVisit

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
    },
    menuBox: {
        width: windowWidth >= 1280 ? 400 : 300,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    cardSection: {
        flexDirection: 'row',
        flexWrap: "wrap",
        width: windowWidth - 50,
        alignSelf: 'center'
    },
    boxContent: {
        width: windowWidth >= 1280 ? '25%' : '33.33%',
        padding: 8,
    },
    sectionBtn: {
        width: '100%',
        minHeight: 120,
        borderRadius: 5,
        backgroundColor: "#FFFFFF",
        ...SHADOWS.light,
        // flexDirection: 'row',
        padding: 5,
    },
    profileSection: {
        width: '100%',
        height: 150,
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
        fontFamily: FONT.Charlatan,
        fontSize: SIZES.xxl,
        color: "#FFFFFF",
        marginLeft: 20
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
    headerBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: windowWidth - 30,
        alignSelf: 'center',
        // marginVertical: 10
    },
    backIcon: {
        width: windowWidth >= 1280 ? 50 : 40,
        height: windowWidth >= 1280 ? 50 : 40,
        borderRadius: windowWidth >= 1280 ? 50 / 2 : 40 / 2,
        ...SHADOWS.light,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
})