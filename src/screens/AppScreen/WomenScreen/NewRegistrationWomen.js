import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Dimensions, ScrollView, Animated, Image, ActivityIndicator, Keyboard, ImageBackground } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { COLORS, SHADOWS, SIZES, FONT, assets } from '../../../constants';
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
import { registrationWomenApi } from '../../../constants/AllApiCall';

const NewRegistrationWomen = ({ navigation }) => {
    const [isLoading, setLoading] = useState(false)
    const iamges = [LogoIcon, LogoIcon, LogoIcon];
    const [isFirstName, setFirstName] = useState('')
    const [isMiddleName, setMiddleName] = useState('')
    const [isLastdName, setLastdName] = useState('')
    const [isHeight, setHeight] = useState('')
    const [isWeight, setWeight] = useState('')
    const [isPregnancySymptoms, setPregnancySymptoms] = useState('')
    const [isMedicalHistory, setMedicalHistory] = useState('')
    const [isPregnancyNote, setPregnancyNote] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedDate, setSelectedDate] = useState();
    const [userBirth, setUserBirth] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedPregnancyDate, setSelectedPregnancyDate] = useState();
    // const [selectedCheckupDate, setSelectedCheckupDate] = useState();
    const [userCheckupDate, setUserCheckupDate] = useState(false);
    const [womanPregnancyDate, setWomanPregnancyDate] = useState(false);
    const [womanCheckupDate, setWomanCheckupDate] = useState(false);
    const [selectedCheckupDate, setSelectedCheckupDate] = useState();
    // const [selectedCheckupDate, setSelectedCheckupDate] = useState();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [image, setImage] = useState('');
    const [isFileData, setFileData] = useState(null);
    const [option, setOption] = useState(null);
    const isFocused = useIsFocused()
    const [isAccessToken, setAccessToken] = useState('')
    const [isAnganwadiId, setAnganwadiId] = useState('')
    const [isSuccessMessage, setSuccessMessage] = useState('');
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [isProfileImage, setProfileImage] = useState(null);


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
        setLoading(false)
        const transformedUserData = JSON.parse(userData);
        const transformedAccessToken = JSON.parse(token);
        // const transformedRefreshToken = JSON.parse(tokenRefresh);
        // console.log('transformedAccessToken ListofWomens--->', transformedAccessToken.accessToken);
        // console.log('transformedRefreshToken ListofWomens--->', transformedRefreshToken.refreshToken);
        // console.log('transformedUserData ListofWomens--->', transformedUserData.anganwadiId);
        setAnganwadiId(transformedUserData.anganwadiId)
        const accessToken = "Bearer " + transformedAccessToken.accessToken
        setAccessToken(accessToken)
        // // const refreshToken = "refreshToken= " + transformedRefreshToken.refreshToken
        // setLoading(false)
        // const responseWomenList = await womenListApi(accessToken)
        // console.log('responseWomenList--->', responseWomenList.data);
        // setWomenList(responseWomenList.data)
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


    const submitData = async () => {
        if (image === '') {
            handleErrorMsg()
            setErrorMessage('Image is required');
            return;
        }
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
        if (!isHeight) {
            handleErrorMsg()
            setErrorMessage('Please enter height')
            return
        }
        if (!isWeight) {
            handleErrorMsg()
            setErrorMessage('Please enter weight')
            return
        }
        if (selectedPregnancyDate == null) {
            handleErrorMsg()
            setErrorMessage('Please select pregnancy date')
            return
        }
        if (option == null) {
            handleErrorMsg()
            setErrorMessage('Please select specially abled')
            return
        }
        if (selectedCheckupDate == null) {
            handleErrorMsg()
            setErrorMessage('Please select checkup date')
            return
        }
        if (!isPregnancyNote) {
            handleErrorMsg()
            setErrorMessage('Please enter pregnancy note')
            return
        }

        const selectUserBirthDate = moment(selectedDate).format("YYYY-MM-DD HH:mm:ss.SSS");
        const selectUserCheckupDate = moment(selectedCheckupDate).format("YYYY-MM-DD HH:mm:ss.SSS");
        const selectUserPregnancyDate = moment(selectedPregnancyDate).format("YYYY-MM-DD HH:mm:ss.SSS");

        // var myHeaders = new Headers();
        // myHeaders.append("Authorization", isAccessToken);

        // var formdata = new FormData();
        // formdata.append("FirstName", isFirstName);
        // formdata.append("MiddleName", isMiddleName);
        // formdata.append("LastName", isLastdName);
        // formdata.append("Weight", isWeight);
        // formdata.append("Height", isHeight);
        // formdata.append("DateOfBirth", selectUserBirthDate);
        // formdata.append("Image", isFileData, image);
        // formdata.append("IsSpeciallyAbled", option);
        // formdata.append("WomanCheckUpDetails.WomanId", "0");
        // formdata.append("AnganwadiId", isAnganwadiId);
        // formdata.append("WomanCheckUpDetails.DoctorId", "1");
        // formdata.append("WomanCheckUpDetails.Weight", isWeight);
        // formdata.append("WomanCheckUpDetails.PregnancyDate", selectUserPregnancyDate);
        // formdata.append("WomanCheckUpDetails.PregnancyNotes", isPregnancyNote);
        // formdata.append("WomanCheckUpDetails.CheckUpDate", selectUserCheckupDate);

        // var requestOptions = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     body: formdata,
        //     redirect: 'follow'
        // };

        // const response = await fetch("http://51.77.105.23:81/api/Woman/register", requestOptions);
        // const json = await response.json();
        // setLoading(false)
        // console.log(json);
        setLoading(true)
        const responseRegistrationWomen = await registrationWomenApi(isAccessToken, isFirstName, isMiddleName, isLastdName, isWeight, isHeight, selectUserBirthDate, selectUserCheckupDate, selectUserPregnancyDate, isAnganwadiId, isPregnancyNote, option, isFileData, image)
        setLoading(false)
        // console.log('responseRegistrationWomen--->', responseRegistrationWomen);
        if (responseRegistrationWomen.isError == false) {
            handleSuccessMsg()
            setSuccessMessage(responseRegistrationWomen.message);
            setSelectedDate(responseRegistrationWomen.data.dateOfBirth)
            setFirstName(responseRegistrationWomen.data.firstName)
            setMiddleName(responseRegistrationWomen.data.middleName)
            setLastdName(responseRegistrationWomen.data.lastName)
            setHeight(responseRegistrationWomen.data.height)
            setWeight(responseRegistrationWomen.data.weight)
            setProfileImage(responseRegistrationWomen.data.profilePicture)
        } else {
            handleErrorMsg();
            setErrorMessage(responseRegistrationWomen.data.message);
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
            setSelectedDate()
            setFirstName('')
            setMiddleName('')
            setLastdName('')
            setHeight('')
            setWeight('')
            setOption('')
            setSelectedCheckupDate()
            setSelectedPregnancyDate()
            setPregnancySymptoms('')
            setMedicalHistory('')
            setPregnancyNote('')
            setImage('')
        }, 5000);
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

    const showDatePickerPregnancy = () => {
        setWomanPregnancyDate(true);
    };

    const hideDatePickerPregnancy = () => {
        setWomanPregnancyDate(false);
    };

    const handleConfirmPregnancy = (date) => {
        setSelectedPregnancyDate(date);
        hideDatePickerPregnancy();
    };

    const showDatePickerCheckup = () => {
        setUserCheckupDate(true);
    };

    const hideDatePickerCheckupDate = () => {
        setUserCheckupDate(false);
    };

    const handleConfirmCheckup = (date) => {
        setSelectedCheckupDate(date);
        hideDatePickerCheckupDate();
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
                <SvgXml xml={ChildIcon} height={40} width={40} />
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
            const fileName = image.path.split('/').pop();
            const img = {
                uri: image.path,
                name: fileName,
                type: image.mime
            }
            // console.log('img:', img);
            setFileData(img)
            setImage(image.path)
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
                <Animated.View style={[styles.snackbarRegistar, { opacity: fadeAnim }]}>
                    <View style={{ width: 80, height: 90, borderRadius: 5, backgroundColor: COLORS.brand.primary, marginRight: 10 }}>
                        <Image
                            source={{ uri: image }}
                            style={{ width: 80, height: 90, borderRadius: 5, }}
                        />
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ marginRight: 20 }}>
                                <Text style={styles.label}>Name:</Text>
                                <Text style={styles.snackbarTextRegistar}>{isFirstName} {isLastdName}</Text>

                                <Text style={styles.label}>Husband name:</Text>
                                <Text style={styles.snackbarTextRegistar}>{isMiddleName} {isLastdName}</Text>
                            </View>

                            <View style={{ marginRight: 20 }}>
                                <Text style={styles.label}>Height(CM):</Text>
                                <Text style={styles.snackbarTextRegistar}>{isHeight} Centimeter</Text>

                                <Text style={styles.label}>Weight(Kg):</Text>
                                <Text style={styles.snackbarTextRegistar}>{isWeight} Kilogram</Text>
                            </View>

                            <View >
                                <Text style={styles.label}>D.O.B:</Text>
                                <Text style={styles.snackbarTextRegistar}>{moment(selectedDate).format("DD-MM-YYYY")}</Text>

                                <Text style={styles.label}></Text>
                                <Text style={styles.snackbarTextRegistar}></Text>
                            </View>
                        </View>
                    </View>
                </Animated.View>
            )}

            <ImageBackground
                source={assets.ParkElement}
                style={{ width: windowWidth, height: '100%', resizeMode: 'cover', position: 'relative' }}
            >
                <View style={styles.headerBox}>
                    <BackIconSecton
                        onPress={() => navigation.goBack()}
                        title='Registration'
                    />
                    <SvgXml xml={iamges[indexImage]} width={132} height={73} />
                    <View style={styles.menuBox}>
                        <StackSection
                            onPress={() => navigation.navigate('KidNavigationsStack', { screen: 'KidScreen' })}
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
                                <Text style={{ fontFamily: FONT.MartelSansSemiBold, fontSize: SIZES.large, color: COLORS.brand.black, textAlign: 'left' }}>Date of pregnancy:</Text>

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
                                    onPress={showDatePickerPregnancy}>
                                    <Text
                                        style={[styles.inputStyleLeft, styles.borderPink, { color: selectedPregnancyDate ? '#000000' : '#727c95' }]} name="womanPregnancyDate" value={womanPregnancyDate}
                                        placeholder="Date of Pregnancy"
                                        placeholderTextColor={selectedPregnancyDate ? '#727c95' : "#000000"}
                                        onChangeText={actualData => setWomanPregnancyDate(actualData)}
                                    >{`${selectedPregnancyDate ? moment(selectedPregnancyDate).format("DD-MM-YYYY") : "Date of Pregnancy"}`}</Text>

                                </TouchableOpacity>

                                <DateTimePickerModal
                                    isVisible={womanPregnancyDate}
                                    mode="date"
                                    onConfirm={handleConfirmPregnancy}
                                    onCancel={hideDatePickerPregnancy}
                                />
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

                        <View style={{ marginTop: 10 }}>
                            <View style={{ paddingHorizontal: 5 }}>
                                <Text style={{ fontFamily: FONT.MartelSansSemiBold, fontSize: SIZES.large, color: COLORS.brand.black, textAlign: 'left' }}>Checkup Date:</Text>

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
                                    onPress={showDatePickerCheckup}>
                                    <Text
                                        style={[styles.inputStyleLeft, styles.borderPink, { color: selectedCheckupDate ? '#000000' : '#727c95' }]} name="womanCheckupDate" value={womanCheckupDate}
                                        placeholder="Checkup Date"
                                        placeholderTextColor={selectedCheckupDate ? '#727c95' : "#000000"}
                                        onChangeText={actualData => setWomanCheckupDate(actualData)}
                                    >{`${selectedCheckupDate ? moment(selectedCheckupDate).format("DD-MM-YYYY") : "Checkup Date"}`}</Text>

                                </TouchableOpacity>

                                <DateTimePickerModal
                                    isVisible={userCheckupDate}
                                    mode="date"
                                    onConfirm={handleConfirmCheckup}
                                    onCancel={hideDatePickerCheckupDate}

                                />
                            </View>
                        </View>

                        {/* <View style={{ marginTop: 10 }}>
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
                    </View> */}

                        {/* <View style={{ marginTop: 10 }}>
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
                    </View> */}
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

export default NewRegistrationWomen

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
        marginRight: 30
    }
})