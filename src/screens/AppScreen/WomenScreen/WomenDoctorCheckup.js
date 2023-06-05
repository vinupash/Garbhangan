import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Dimensions, ScrollView, Animated, Image, ActivityIndicator, Keyboard, ImageBackground } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { COLORS, SHADOWS, SIZES, FONT, assets } from '../../../constants';
import BackIcon from '../../../../assets/images/BackIcon';
import ChildIcon from '../../../../assets/images/ChildIcon';
import LogoIcon from '../../../../assets/images/LogoIcon';
import ForwardArrow from '../../../../assets/images/ForwardArrow';
import { InputBox, InputTextAreaBox } from '../../../components/CustomInput';
import moment from 'moment';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addWomenCheckupApi, getDoctorListApi, getWomenDetailsApi, registrationWomenApi } from '../../../constants/AllApiCall';
import { Dropdown } from 'react-native-element-dropdown';
import { validateNumbers } from '../../../constants/methods';
import BoardEng from '../../../../assets/images/Board-Eng.png'
import BoardHin from '../../../../assets/images/Board-Hin.png'
import BoardMar from '../../../../assets/images/Board-Mar.png'

const WomenDoctorCheckup = ({ navigation, route }) => {
    const [isLoading, setLoading] = useState(false)
    const iamges = [BoardEng, BoardHin, BoardMar];
    const [isWeight, setWeight] = useState('')
    const [isPregnancySymptoms, setPregnancySymptoms] = useState('')
    const [isMedicalHistory, setMedicalHistory] = useState('')
    const [isPregnancyNote, setPregnancyNote] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const isFocused = useIsFocused()
    const [isAccessToken, setAccessToken] = useState('')
    const [isAnganwadiId, setAnganwadiId] = useState('')
    const [isSuccessMessage, setSuccessMessage] = useState('');
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [isPregnancyDate, setPregnancyDate] = useState('')
    const [isFocus, setIsFocus] = useState(false);
    const [isValueDocterName, setValueDocterName] = useState(null);
    const [isDocterList, setDocterList] = useState([]);
    const [isWomenId, setWomenId] = useState('')
    const [isPrescription, setPrescription] = useState('')
    const [isProfileImage, setProfileImage] = useState(null)
    // console.log(route.params.personDetails.womenId);

    var date = moment().format("YYYY-MM-DD")
    // console.log(date);

    useEffect(() => {
        fetchDataAsync()
        setWomenId(route.params.personDetails.womenId)
        setProfileImage(route.params.personDetails.isProfileImage)
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
        const transformedRefreshToken = JSON.parse(tokenRefresh);
        // console.log('transformedAccessToken ListofWomens--->', transformedAccessToken.accessToken);
        // console.log('transformedRefreshToken ListofWomens--->', transformedRefreshToken.refreshToken);
        // console.log('transformedUserData ListofWomens--->', transformedUserData.anganwadiId);
        const anganwadiId = transformedUserData.anganwadiId
        const accessToken = "Bearer " + transformedAccessToken.accessToken
        // const refreshToken = "refreshToken= " + transformedRefreshToken.refreshToken
        const womenId = route.params.personDetails.womenId;
        const responseWomenDetails = await getWomenDetailsApi(accessToken, womenId)
        const responseDoctorList = await getDoctorListApi(accessToken, womenId)
        setLoading(false)
        // console.log('responseWomenDetails--->', responseWomenDetails.data.womanCheckUpDetails[0].pregnancyDate);
        // console.log('responseDoctorList--->', responseDoctorList);
        // setPregnancyDate(responseWomenDetails.data.womanCheckUpDetails[0].pregnancyDate)
        // setPregnancyDate(responseWomenDetails.data.womanCheckUpDetails)
        setAccessToken(accessToken)
        const isDocterList = [...responseDoctorList.data];
        const newArrayDocterName = isDocterList.map((item) => {
            return { value: item.id, label: item.firstName + " " + item.lastName }
        })
        // console.log('newArrayDocterName--->', newArrayDocterName);
        setDocterList(newArrayDocterName)

        const highestId = responseWomenDetails.data.womanCheckUpDetails.reduce((prev, current) => {
            return (prev.id > current.id) ? prev : current;
        });

        // console.log('highestId--->', highestId.pregnancyDate);
        setPregnancyDate(highestId.pregnancyDate)
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    // console.log('isKeyboardVisible', isValueDocterName);

    const submitData = async () => {
        if (!isValueDocterName) {
            handleErrorMsg()
            setErrorMessage('Please select docter')
            return
        }

        if (!isWeight) {
            handleErrorMsg()
            setErrorMessage('Please enter weight')
            return
        } else if (!validateNumbers(isWeight)) {
            handleErrorMsg()
            setErrorMessage('Special characters and text are not allowed')
            return
        }

        if (!isPregnancySymptoms) {
            handleErrorMsg()
            setErrorMessage('Please enter pregnancy symptoms')
            return
        }
        if (!isMedicalHistory) {
            handleErrorMsg()
            setErrorMessage('Please enter medical history')
            return
        }
        if (!isPregnancyNote) {
            handleErrorMsg()
            setErrorMessage('Please enter pregnancy note')
            return
        }
        if (!isPrescription) {
            handleErrorMsg()
            setErrorMessage('Please enter prescription')
            return
        }
        setLoading(true)
        const responseAddWomenCheckup = await addWomenCheckupApi(isAccessToken, isWomenId, isValueDocterName, isPregnancyDate, isWeight, isPregnancyNote, isPregnancySymptoms, isMedicalHistory, date, isPrescription)
        setLoading(false)
        // console.log('responseAddWomenCheckup--->', responseAddWomenCheckup);
        if (responseAddWomenCheckup.isError == false) {
            handleSuccessMsg()
            setSuccessMessage(responseAddWomenCheckup.message);
        } else {
            handleErrorMsg();
            setErrorMessage(responseAddWomenCheckup.data.message);
        }
    }

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
            setSuccessMessage('');
            setWeight('')
            setPregnancySymptoms('')
            setMedicalHistory('')
            setPregnancyNote('')
            setPrescription('')
            setValueDocterName(null)
            navigation.goBack()
        }, 5000);
    };

    const BackIconSecton = ({ onPress, title }) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', width: windowWidth >= 960 ? 360 : 300 }}>
                <TouchableOpacity
                    activeOpacity={0.98}
                    style={styles.backIcon}
                    onPress={onPress}
                >
                    <SvgXml xml={BackIcon} height={windowWidth >= 960 ? 25 : 20} width={25} />
                </TouchableOpacity>
                <Text style={[styles.titleText, { fontSize: windowWidth >= 960 ? SIZES.xxl : SIZES.extraLarge }]}>{title}</Text>
            </View>
        )
    }

    const StackSection = ({ onPress }) => {
        return (
            <TouchableOpacity
                style={styles.backIcon}
                onPress={onPress}
                activeOpacity={0.98}
            >
                <SvgXml xml={ChildIcon} height={windowWidth >= 960 ? 40 : 25} width={windowWidth >= 960 ? 40 : 25} />
            </TouchableOpacity>
        )
    }



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
                <View style={styles.headerBox}>
                    <BackIconSecton
                        onPress={() => navigation.goBack()}
                        title='Docter checkup'
                    />
                    {/* <SvgXml xml={iamges[indexImage]} width={windowWidth >= 960 ? 132 : 120} height={windowWidth >= 960 ? 73 : 63} /> */}
                    <Image source={iamges[indexImage]} style={{ width: windowWidth >= 1280 ? 350 : 174, alignSelf: 'center', height: windowWidth >= 1280 ? 170 : 80 }} />
                    <View style={styles.menuBox}>
                        <StackSection
                            onPress={() => navigation.navigate('KidNavigationsStack', { screen: 'KidScreen' })}
                        />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', height: windowHeight - 120, width: windowWidth - 50, flex: 1, alignSelf: 'center' }}>
                    <View style={[styles.profilePicture, { marginTop: 20 }]}>
                        {isProfileImage == null ?
                            <Image
                                source={assets.women_img}
                                style={{
                                    width: windowWidth >= 960 ? 250 : 160,
                                    height: windowWidth >= 960 ? 350 : 210,
                                    borderRadius: 10
                                }}
                            />
                            :
                            <Image
                                source={{ uri: `data:image/png;base64,${isProfileImage}` }}
                                style={{
                                    width: windowWidth >= 960 ? 250 : 160,
                                    height: windowWidth >= 960 ? 350 : 210,
                                    borderRadius: 10
                                }}
                            />
                        }

                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{
                            width: '100%',
                            alignSelf: 'center',
                            flex: 1
                        }}
                    >

                        <View style={{ marginTop: 0, paddingHorizontal: 5 }}>
                            <Text style={{ fontFamily: FONT.MartelSansSemiBold, fontSize: SIZES.large, color: COLORS.brand.black, textAlign: 'left' }}>Select docter:</Text>
                            <Dropdown
                                style={[styles.dropdown]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={isDocterList}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Select docter name' : '...'}
                                searchPlaceholder="Search..."
                                value={isDocterList}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setValueDocterName(item.value);
                                    setIsFocus(false);
                                }}
                            />
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <InputBox
                                label='Weight (KG)'
                                placeholder='Enter weight (KG)'
                                value={isWeight.toString()}
                                setValue={setWeight}
                                // autoCapitalize='none'
                                keyboardType='number-pad'
                            />
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <InputTextAreaBox
                                label='Pregnancy symptoms'
                                placeholder='Before period any pregnancy symptoms'
                                value={isPregnancySymptoms}
                                setValue={setPregnancySymptoms}
                                // autoCapitalize='none'
                                multiline={true}
                                numberOfLines={5}
                                placeholderTextColor='#727c95'
                            />
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <InputTextAreaBox
                                label='Medical history'
                                placeholder='Enter medical history'
                                value={isMedicalHistory}
                                setValue={setMedicalHistory}
                                // autoCapitalize='none'
                                multiline={true}
                                numberOfLines={5}
                                placeholderTextColor='#727c95'
                            />
                        </View>
                        <View style={{ marginTop: 10, }}>
                            <InputTextAreaBox
                                label='Pregnancy note'
                                placeholder='Enter pregnancy note'
                                value={isPregnancyNote}
                                setValue={setPregnancyNote}
                                // autoCapitalize='none'
                                multiline={true}
                                numberOfLines={5}
                                placeholderTextColor='#727c95'
                            />
                        </View>

                        <View style={{ marginTop: 10, }}>
                            <InputTextAreaBox
                                label='Prescription'
                                placeholder='Enter prescription'
                                value={isPrescription}
                                setValue={setPrescription}
                                // autoCapitalize='none'
                                multiline={true}
                                numberOfLines={5}
                                placeholderTextColor='#727c95'
                            />
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            marginTop: 20,
                            marginRight: 5
                        }}>
                            <TouchableOpacity
                                style={styles.forwardIcon}
                                onPress={submitData}
                            >
                                {isLoading ? <ActivityIndicator size="large" color="#FFFFFF" /> : <SvgXml xml={ForwardArrow} height={30} width={30} />}
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default WomenDoctorCheckup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.brand.background
    },
    headerBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: windowWidth - 30,
        alignSelf: 'center',
        // marginVertical: 10
        marginBottom: 10
    },
    backIcon: {
        width: windowWidth >= 960 ? 50 : 40,
        height: windowWidth >= 960 ? 50 : 40,
        borderRadius: windowWidth >= 960 ? 50 / 2 : 40 / 2,
        ...SHADOWS.light,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    forwardIcon: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        ...SHADOWS.light,
        backgroundColor: '#24A471',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    titleText: {
        fontFamily: FONT.Charlatan,
        fontSize: SIZES.xxl,
        color: "#FFFFFF",
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
        width: windowWidth >= 960 ? 360 : 300,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end'
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
    inputStyleLeft: {
        fontFamily: FONT.MartelSansSemiBold,
        fontSize: SIZES.medium,
        flex: 1,
        justifyContent: 'center',
        lineHeight: 50
    },
    snackbarRegistar: {
        backgroundColor: '#28a745',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    snackbarTextRegistar: {
        fontFamily: FONT.MartelSansRegular,
        fontSize: SIZES.font,
        lineHeight: 20,
        color: '#FFFFFF'
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
    label: {
        fontFamily: FONT.MartelSansBold,
        fontSize: SIZES.small,
        color: '#FFFFFF'
    },
    profilePicture: {
        width: windowWidth >= 960 ? 250 : 160,
        height: windowWidth >= 960 ? 350 : 210,
        backgroundColor: COLORS.brand.primary,
        borderRadius: 10,
        ...SHADOWS.light,
        marginRight: 30
    },
    dropdown: {
        borderRadius: 10,
        paddingHorizontal: 20,
        height: 50,
        backgroundColor: '#FFFFFF',
        ...SHADOWS.light,
        marginBottom: 2,
    },
    placeholderStyle: {
        fontFamily: FONT.MartelSansSemiBold,
        fontSize: SIZES.medium,
        color: '#727c95',
    },
    selectedTextStyle: {
        fontFamily: FONT.MartelSansSemiBold,
        fontSize: SIZES.medium,
        color: "#000000",
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})