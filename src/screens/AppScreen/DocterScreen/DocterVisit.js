import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Dimensions, ScrollView, Animated, Image, ActivityIndicator, Keyboard, ImageBackground } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { COLORS, SHADOWS, SIZES, FONT, assets } from '../../../constants';
import BackIcon from '../../../../assets/images/BackIcon';
import ForwardArrow from '../../../../assets/images/ForwardArrow';
import { InputTextAreaBox } from '../../../components/CustomInput';
import moment from 'moment';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import * as ImagePicker from 'react-native-image-crop-picker';
import CameraIcon from '../../../../assets/images/CameraIcon';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addDoctorvisit, getDoctorListApi } from '../../../constants/AllApiCall';
import BoardEng from '../../../../assets/images/Board-Eng.png'
import BoardHin from '../../../../assets/images/Board-Hin.png'
import BoardMar from '../../../../assets/images/Board-Mar.png'
import { Dropdown } from 'react-native-element-dropdown';

const DocterVisit = ({ navigation }) => {
    const [isLoading, setLoading] = useState(false)
    const [isFocus, setIsFocus] = useState(false);
    const [isValueDocterName, setValueDocterName] = useState(null);
    const [isDocterList, setDocterList] = useState([]);
    const iamges = [BoardEng, BoardHin, BoardMar];
    const [isDoctorCheckupNote, setDoctorCheckupNote] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [image, setImage] = useState('');
    const [isFileData, setFileData] = useState(null);
    const isFocused = useIsFocused()
    const [isAccessToken, setAccessToken] = useState('')
    const [isAnganwadiId, setAnganwadiId] = useState('')
    const [isSuccessMessage, setSuccessMessage] = useState('');
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [isProfileImage, setProfileImage] = useState(null);
    var date = moment().format("YYYY-MM-DD HH:mm:ss.SSS")

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
        const responseDoctorList = await getDoctorListApi(accessToken)
        setLoading(false)

        const isDocterList = [...responseDoctorList.data];
        const newArrayDocterName = isDocterList.map((item) => {
            return { value: item.id, label: item.firstName + " " + item.lastName }
        })
        setDocterList(newArrayDocterName)
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

    // console.log('isKeyboardVisible', optionGender);

    const submitData = async () => {
        if (image === '') {
            handleErrorMsg()
            setErrorMessage('Image is required');
            return;
        }
        if (!isValueDocterName) {
            handleErrorMsg()
            setErrorMessage('Please select docter')
            return
        }
        if (!isDoctorCheckupNote) {
            handleErrorMsg()
            setErrorMessage('Please enter medical checkup data')
            return
        }

        setLoading(true)
        const responseAddDoctorvisit = await addDoctorvisit(isAccessToken, isAnganwadiId, isDoctorCheckupNote, date, image, isFileData, isValueDocterName)
        setLoading(false)
        console.log('responseRegistrationChild--->', responseAddDoctorvisit);
        if (responseAddDoctorvisit.isError == false) {
            handleSuccessMsg()
            setSuccessMessage(responseAddDoctorvisit.message)
            // setShouldNavigate(json.isError)
        } else {
            handleErrorMsg()
            setErrorMessage(responseAddDoctorvisit.message)
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
            setDoctorCheckupNote('')
            setImage('')
            setValueDocterName(null)
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

    const captureImage = async (type) => {
        ImagePicker.openCamera({
            mediaType: type,
            width: 350,
            height: 250,
            cropping: true,
            quality: 0.5,
        }).then(image => {
            // console.log('selected media ==', image);
            // console.log('Image type:', image.mime);
            // console.log('Image path:', image.path);
            // const fileName = image.path.split('/').pop() || `image.${image.mime.split('/')[1]}`;
            const fileName = image.path.split('/').pop();
            // console.log('Image name:', fileName);

            const img = {
                uri: image.path,
                name: fileName,
                type: image.mime
            }
            // console.log('img:', img);
            // const fileName = image.path.split('/').p
            setFileData(img)
            setImage(image.path)
            // ImageUploadTableApi(isWaiter_id, isStore_id, img, image.path)
        })
            .catch(er => {
                console.log(er);
                alert(er);
                if (er.code === 'E_PICKER_CANCELLED') {
                    // here the solution
                    return false;
                }
            });
    };


    const UploadImage = () => {
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginTop: 10,
                    marginBottom: 20,
                    borderRadius: 5
                }}
            >
                <View style={{
                    width: windowWidth >= 1280 ? 350 : 210,
                    height: windowWidth >= 1280 ? 250 : 160,
                    backgroundColor: '#efefef',
                    marginBottom: 10,
                    borderRadius: 5,
                    ...SHADOWS.light
                }}>
                    {
                        image && (<Image source={{ uri: image }} style={{ width: windowWidth >= 1280 ? 350 : 210, height: windowWidth >= 1280 ? 250 : 160, borderRadius: 5, }} />)
                    }
                </View>

                <TouchableOpacity
                    style={[styles.forwardIcon, {
                        alignSelf: "center",
                        width: windowWidth >= 1280 ? 60 : 40,
                        height: windowWidth >= 1280 ? 60 : 40,
                    }]}
                    onPress={() => { captureImage('photo') }}
                    activeOpacity={0.98}
                >
                    <SvgXml xml={CameraIcon} height={windowWidth >= 1280 ? 30 : 15} width={windowWidth >= 1280 ? 30 : 15} />
                </TouchableOpacity>
            </View>
        )
    }

    if (isLoading) {
        return (
            <ActivityIndicator size="large" color={COLORS.brand.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
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
                        title='Doctor Visit'
                    />
                    {/* <SvgXml xml={iamges[indexImage]} width={windowWidth >= 1280 ? 132 : 120} height={windowWidth >= 1280 ? 73 : 63} /> */}
                    <Image source={iamges[indexImage]} style={{ width: windowWidth >= 1280 ? 350 : 174, alignSelf: 'center', height: windowWidth >= 1280 ? 170 : 80 }} />
                    <View style={styles.menuBox}>
                        {/* <StackSection
                            onPress={() => navigation.navigate('KidNavigationsStack', { screen: 'KidScreen' })}
                        />
                        <StackSection
                            onPress={() => navigation.navigate('WomenNavigationsStack', { screen: 'WomenScreen' })}
                        /> */}
                    </View>
                </View>

                <View style={{ flexDirection: 'row', height: windowHeight - 120, width: windowWidth - 50, flex: 1, alignSelf: 'center' }}>
                    <View style={[styles.profilePicture, { marginTop: isKeyboardVisible === true ? 100 : 0 }]}>
                        <UploadImage />
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{
                            width: '100%',
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
                            <InputTextAreaBox
                                label='Checkup note'
                                placeholder='Enter checkup note'
                                value={isDoctorCheckupNote}
                                setValue={setDoctorCheckupNote}
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
                                activeOpacity={0.98}
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

export default DocterVisit

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
        width: windowWidth >= 1280 ? 360 : 300,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
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
        color: "#000000",
    },
})