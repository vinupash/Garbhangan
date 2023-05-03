// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const ChildUpdateProfile = () => {
//     return (
//         <View>
//             <Text>ChildUpdateProfile</Text>
//         </View>
//     )
// }

// export default ChildUpdateProfile

// const styles = StyleSheet.create({})

import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Dimensions, ScrollView, Animated, Image, ActivityIndicator, Keyboard } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { COLORS, SHADOWS, SIZES, FONT } from '../../../constants';
import MenuComponents from '../../../components/MenuComponents';
import BackIcon from '../../../../assets/images/BackIcon';
import BellIcon from '../../../../assets/images/BellIcon';
import AddIcon from '../../../../assets/images/AddIcon';
import ChildIcon from '../../../../assets/images/ChildIcon';
import LogoIcon from '../../../../assets/images/LogoIcon';
import ForwardArrow from '../../../../assets/images/ForwardArrow';
import { Input, InputBox, InputTextArea, InputTextAreaBox } from '../../../components/CustomInput';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import * as ImagePicker from 'react-native-image-crop-picker';
import CameraIcon from '../../../../assets/images/CameraIcon';
import RadioButtonBoxValue from '../../../components/RadioButtonBoxValue';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registrationWomenApi, updateChildProfileApi, updateWomenProfileApi } from '../../../constants/AllApiCall';
import WomenIcon from '../../../../assets/images/WomenIcon';

const ChildUpdateProfile = ({ navigation, route }) => {
    const [isLoading, setLoading] = useState(false)
    const iamges = [LogoIcon, LogoIcon, LogoIcon];
    const [isFirstName, setFirstName] = useState('')
    const [isMiddleName, setMiddleName] = useState('')
    const [isLastdName, setLastdName] = useState('')
    const [isHeight, setHeight] = useState('')
    const [isWeight, setWeight] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedDate, setSelectedDate] = useState();
    const [userBirth, setUserBirth] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [image, setImage] = useState('');
    const [option, setOption] = useState(null);
    const isFocused = useIsFocused()
    const [isAccessToken, setAccessToken] = useState('')
    const [isAnganwadiId, setAnganwadiId] = useState('')
    const [isChildId, setChildId] = useState('')
    const [isSuccessMessage, setSuccessMessage] = useState('');
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [isActive, setActive] = useState(null)
    const [optionGender, setOptionGender] = useState(null);
    console.log(route.params.personDetails);

    useEffect(() => {
        fetchDataAsync()
        setFirstName(route.params.personDetails.firstName)
        setMiddleName(route.params.personDetails.middleName)
        setLastdName(route.params.personDetails.lastName)
        setWeight(route.params.personDetails.weight)
        setHeight(route.params.personDetails.height)
        setSelectedDate(route.params.personDetails.userBirth)
        setActive(route.params.personDetails.isActive)
        setChildId(route.params.personDetails.childId)
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
        setLoading(false)
        const transformedUserData = JSON.parse(userData);
        const transformedAccessToken = JSON.parse(token);
        // const transformedRefreshToken = JSON.parse(tokenRefresh);
        // console.log('transformedAccessToken ListofWomens--->', transformedAccessToken.accessToken);
        // console.log('transformedRefreshToken ListofWomens--->', transformedRefreshToken.refreshToken);
        // console.log('transformedUserData ListofWomens--->', transformedUserData.anganwadiId);
        setAccessToken("Bearer " + transformedAccessToken.accessToken)
        setAnganwadiId(transformedUserData.anganwadiId)
        // const responseWomenUpdate = await updateWomenProfileApi(accessToken, womenId, isFirstName, isMiddleName, isLastdName, isWeight, isHeight, selectedDate, image, isAnganwadiId, isActive)
        // console.log('responseWomenUpdate--->', responseWomenUpdate);
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

    // console.log('isKeyboardVisible', isKeyboardVisible);

    // console.log(isAccessToken);

    const submitData = async () => {
        if (!isFirstName) {
            handleErrorMsg()
            setErrorMessage('Please entrer first name')
            return
        }
        if (!isMiddleName) {
            handleErrorMsg()
            setErrorMessage('Please entrer middle name')
            return
        }
        if (!isLastdName) {
            handleErrorMsg()
            setErrorMessage('Please entrer last name')
            return
        }
        if (selectedDate == null) {
            handleErrorMsg()
            setErrorMessage('Please select D.O.B')
            return
        }
        if (optionGender == null) {
            handleErrorMsg()
            setErrorMessage('Please select gender')
            return
        }
        if (option == null) {
            handleErrorMsg()
            setErrorMessage('Please select specially abled')
            return
        }

        setLoading(true)
        const responseUpdateChildProfile = await updateChildProfileApi(isAccessToken, isFirstName, isMiddleName, isLastdName, isWeight, isHeight, selectedDate, isAnganwadiId, option, optionGender, isChildId, isActive)
        setLoading(false)
        console.log('responseUpdateChildProfile--->', responseUpdateChildProfile);
        if (responseUpdateChildProfile.isError == false) {
            handleSuccessMsg()
            setSuccessMessage(responseUpdateChildProfile.message)
            // setShouldNavigate(responseUpdateChildProfile.isError)
        } else {
            handleErrorMsg()
            setErrorMessage(responseUpdateChildProfile.message)
        }

        // responseUpdateWomenProfil---> {"data": null, "error": null, "isError": false, "message": "Woman data updated successfully."}
    }

    // console.log('userBirth--->', selectedDate, selectedCheckupDate, selectedPregnancyDate, typeof image, option);

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
            navigation.goBack()
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
            setSelectedDate()
            setFirstName('')
            setMiddleName('')
            setLastdName('')
            setHeight('')
            setWeight('')
            setOption('')
            navigation.goBack()
        }, 3000);
    };

    const showDatePicker = () => {
        setUserBirth(true);
    };

    const hideDatePicker = () => {
        setUserBirth(false);
    };

    const handleConfirm = (date) => {
        setSelectedDate(date);
        hideDatePicker();
    };

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

    // const BellSection = ({ onPress }) => {
    //     return (
    //         <TouchableOpacity
    //             style={styles.bellIcon}
    //             onPress={onPress}
    //         >
    //             <SvgXml xml={BellIcon} height={25} width={25} />
    //         </TouchableOpacity>
    //     )
    // }

    // const RegistrationSection = ({ onPress }) => {
    //     return (
    //         <TouchableOpacity
    //             style={styles.registrationBtn}
    //             onPress={onPress}
    //         >
    //             <Text style={{ fontFamily: FONT.MartelSansSemiBold, fontSize: SIZES.large, color: COLORS.brand.black }}>New Registration</Text>
    //             <SvgXml xml={AddIcon} height={20} width={20} />
    //         </TouchableOpacity>
    //     )
    // }

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

    const captureImage = async (type) => {
        ImagePicker.openCamera({
            mediaType: type,
            width: 250,
            height: 350,
            cropping: true,
            quality: 0.5,
        }).then(image => {
            console.log('selected media ==', image);
            console.log('Image type:', image.mime);
            console.log('Image path:', image.path);
            // const fileName = image.path.split('/').pop() || `image.${image.mime.split('/')[1]}`;
            const fileName = image.path.split('/').pop();
            console.log('Image name:', fileName);

            const img = {
                uri: image.path,
                name: fileName,
                type: image.mime
            }
            console.log('img:', img);
            // const fileName = image.path.split('/').p
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
                    width: 250,
                    height: 350,
                    backgroundColor: '#efefef',
                    marginBottom: 10,
                    borderRadius: 5,
                    ...SHADOWS.light
                }}>
                    {
                        image && (<Image source={{ uri: image }} style={{ width: 250, height: 350, borderRadius: 5, }} />)
                    }
                </View>

                <TouchableOpacity
                    style={[styles.forwardIcon, {
                        alignSelf: "center",
                    }]}
                    onPress={() => { captureImage('photo') }}
                >
                    <SvgXml xml={CameraIcon} height={30} width={30} />
                </TouchableOpacity>
            </View>
        )
    }

    const speciallyAbledData = [
        { id: true, value: 'Yes' },
        { id: false, value: 'No' },
    ];

    const genderData = [
        { id: 'M', value: 'Male' },
        { id: 'F', value: 'Female' },
    ];

    // console.log(op);

    // if (isLoading) {
    //     return (
    //         <ActivityIndicator size="large" color={COLORS.brand.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
    //     )
    // }

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


            <View style={styles.headerBox}>
                <BackIconSecton
                    onPress={() => navigation.goBack()}
                    title='Profile update'
                />
                <SvgXml xml={iamges[indexImage]} width={132} height={73} />
                <View style={styles.menuBox}>
                    <StackSection
                        onPress={() => navigation.navigate('WomenNavigationsStack', { screen: 'WomenScreen' })}
                    />
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
                        alignSelf: 'center',
                        flex: 1
                    }}
                >

                    <InputBox
                        label='First name'
                        placeholder='Enter first name'
                        value={isFirstName}
                        setValue={setFirstName}
                    // autoCapitalize='none'
                    />

                    <View style={{ marginTop: 10 }}>
                        <InputBox
                            label='Middle name'
                            placeholder='Enter middle name'
                            value={isMiddleName}
                            setValue={setMiddleName}
                        // autoCapitalize='none'
                        />
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <InputBox
                            label='Last name'
                            placeholder='Enter last name'
                            value={isLastdName}
                            setValue={setLastdName}
                        // autoCapitalize='none'
                        />
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <View style={{ paddingHorizontal: 5 }}>

                            <Text style={{ fontFamily: FONT.MartelSansSemiBold, fontSize: SIZES.large, color: COLORS.brand.black, textAlign: 'left' }}>Date of birth:</Text>
                            <TouchableOpacity
                                style={{
                                    width: '100%',
                                    height: 50,
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: 10,
                                    paddingHorizontal: 20,
                                    ...SHADOWS.light,
                                    marginRight: 5,
                                    justifyContent: 'center'
                                }}
                                onPress={showDatePicker}>
                                <Text
                                    style={[styles.inputStyleLeft, { color: selectedDate ? '#000000' : '#727c95' }]} name="userbirth" value={userBirth}
                                    placeholder="Date of Birth"
                                    placeholderTextColor={selectedDate ? '#727c95' : "#000000"}
                                    onChangeText={actualData => setUserBirth(actualData)}
                                >{`${selectedDate ? moment(selectedDate).format("DD-MM-YYYY") : "Date of Birth"}`}</Text>

                            </TouchableOpacity>

                            <DateTimePickerModal
                                isVisible={userBirth}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                        </View>
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <InputBox
                            label='Height (CM)'
                            placeholder='Enter height (CM)'
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

                    <View style={{ marginTop: 10 }}>
                        <View style={{ paddingHorizontal: 5 }}>
                            <Text style={{ fontFamily: FONT.MartelSansSemiBold, fontSize: SIZES.large, color: COLORS.brand.black, textAlign: 'left' }}>Gender:</Text>

                            <View
                                style={{
                                    width: '100%',
                                    height: 50,
                                    // backgroundColor: '#FFFFFF',
                                    // borderRadius: 10,
                                    // paddingHorizontal: 20,
                                    // ...SHADOWS.light,
                                    marginRight: 5,
                                    // justifyContent: 'center'
                                }}
                            >

                                <RadioButtonBoxValue
                                    data={genderData}
                                    onSelect={(value) => setOptionGender(value)}
                                />

                            </View>
                        </View>
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <View style={{ paddingHorizontal: 5 }}>
                            <Text style={{ fontFamily: FONT.MartelSansSemiBold, fontSize: SIZES.large, color: COLORS.brand.black, textAlign: 'left' }}>Specially abled:</Text>

                            <View
                                style={{
                                    width: '100%',
                                    height: 50,
                                    // backgroundColor: '#FFFFFF',
                                    // borderRadius: 10,
                                    // paddingHorizontal: 20,
                                    // ...SHADOWS.light,
                                    marginRight: 5,
                                    // justifyContent: 'center'
                                }}
                            >

                                <RadioButtonBoxValue
                                    data={speciallyAbledData}
                                    onSelect={(value) => setOption(value)}
                                />

                            </View>
                        </View>
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
        </SafeAreaView>
    )
}

export default ChildUpdateProfile

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
        marginRight: 30
    }
})