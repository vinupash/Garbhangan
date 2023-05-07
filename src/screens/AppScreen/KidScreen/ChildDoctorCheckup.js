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
import { addChildCheckupApi, addWomenCheckupApi, getChildDetailsApi, getDoctorListApi, getWomenDetailsApi, registrationWomenApi } from '../../../constants/AllApiCall';
import { Dropdown } from 'react-native-element-dropdown';
import WomenIcon from '../../../../assets/images/WomenIcon';

const ChildDoctorCheckup = ({ navigation, route }) => {
    const [isLoading, setLoading] = useState(false)
    const iamges = [LogoIcon, LogoIcon, LogoIcon];
    const [isWeight, setWeight] = useState('')
    const [isPregnancySymptoms, setPregnancySymptoms] = useState('')
    const [isMedicalHistory, setMedicalHistory] = useState('')
    const [isCheckUpNotes, setCheckUpNotes] = useState('')
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
    const [isChildId, setChildId] = useState('')
    const [isPrescription, setPrescription] = useState('')
    const [isHeight, setHeight] = useState('')
    const [isProfileImage, setProfileImage] = useState(null)
    // console.log(route.params.personDetails.childId);

    var date = moment().format("YYYY-MM-DD")
    // console.log(date);

    useEffect(() => {
        fetchDataAsync()
        setChildId(route.params.personDetails.childId)
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
        const childId = route.params.personDetails.childId;
        // const responseChildDetails = await getChildDetailsApi(accessToken, childId)
        const responseDoctorList = await getDoctorListApi(accessToken, childId)
        setLoading(false)
        // console.log('responseChildDetails--->', responseChildDetails);
        // console.log('responseDoctorList--->', responseDoctorList);
        // setPregnancyDate(responseChildDetails.data.womanCheckUpDetails[0].pregnancyDate)
        // setPregnancyDate(responseChildDetails.data.womanCheckUpDetails)
        setAccessToken(accessToken)
        const isDocterList = [...responseDoctorList.data];
        const newArrayDocterName = isDocterList.map((item) => {
            return { value: item.id, label: item.firstName + " " + item.lastName }
        })
        // console.log('newArrayDocterName--->', newArrayDocterName);
        setDocterList(newArrayDocterName)

        // const highestId = responseChildDetails.data.womanCheckUpDetails.reduce((prev, current) => {
        //     return (prev.id > current.id) ? prev : current;
        // });

        // console.log('highestId--->', highestId.pregnancyDate);
        // setPregnancyDate(highestId.pregnancyDate)
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
        if (!isHeight) {
            handleErrorMsg()
            setErrorMessage('Please enter weight')
            return
        }
        if (!isWeight) {
            handleErrorMsg()
            setErrorMessage('Please enter weight')
            return
        }
        if (!isCheckUpNotes) {
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
        const responseAddChildCheckup = await addChildCheckupApi(isAccessToken, isChildId, isValueDocterName, isWeight, isCheckUpNotes, date, isPrescription, isHeight)
        setLoading(false)
        // console.log('responseAddChildCheckup--->', responseAddChildCheckup);
        if (responseAddChildCheckup.isError == false) {
            handleSuccessMsg()
            setSuccessMessage(responseAddChildCheckup.message);
        } else {
            handleErrorMsg();
            setErrorMessage(responseAddChildCheckup.data.message);
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
            setCheckUpNotes('')
            setPrescription('')
            setValueDocterName(null)
            setHeight('')
            navigation.goBack()
        }, 5000);
    };

    const BackIconSecton = ({ onPress, title }) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', width: 360 }}>
                <TouchableOpacity
                    style={styles.backIcon}
                    onPress={onPress}
                    activeOpacity={0.98}
                >
                    <SvgXml xml={BackIcon} height={25} width={25} />
                </TouchableOpacity>
                <Text style={styles.titleText}>{title}</Text>
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
                <SvgXml xml={WomenIcon} height={40} width={40} />
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
                    <SvgXml xml={iamges[indexImage]} width={132} height={73} />
                    <View style={styles.menuBox}>
                        <StackSection
                            onPress={() => navigation.navigate('WomenNavigationsStack', { screen: 'WomenScreen' })}
                        />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', height: windowHeight - 120, width: windowWidth - 50, flex: 1, alignSelf: 'center' }}>
                    <View style={[styles.profilePicture, { marginTop: 20 }]}>
                        {isProfileImage == null ?
                            <Image
                                source={assets.child_img}
                                style={{
                                    width: 250,
                                    height: 350,
                                    borderRadius: 10
                                }}
                            />
                            :
                            <Image
                                source={{ uri: `data:image/png;base64,${isProfileImage}` }}
                                style={{
                                    width: 250,
                                    height: 350,
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
                                label='Height (CM)'
                                placeholder='Enter weight (KG)'
                                value={isHeight.toString()}
                                setValue={setHeight}
                                // autoCapitalize='none'
                                keyboardType='number-pad'
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

                        <View style={{ marginTop: 10, }}>
                            <InputTextAreaBox
                                label='Checkup note'
                                placeholder='Enter pregnancy note'
                                value={isCheckUpNotes}
                                setValue={setCheckUpNotes}
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

export default ChildDoctorCheckup

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
        marginVertical: 10
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
        width: 360,
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
        width: 250,
        height: 350,
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