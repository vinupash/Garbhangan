// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const NewRegistrationKid = () => {
//     return (
//         <View>
//             <Text>NewRegistrationKid</Text>
//         </View>
//     )
// }

// export default NewRegistrationKid

// const styles = StyleSheet.create({})

import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Dimensions, ScrollView, Animated } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { COLORS, SHADOWS, SIZES, FONT } from '../../../constants';
import MenuComponents from '../../../components/MenuComponents';
import BackIcon from '../../../../assets/images/BackIcon';
import BellIcon from '../../../../assets/images/BellIcon';
import AddIcon from '../../../../assets/images/AddIcon';
import ChildIcon from '../../../../assets/images/ChildIcon';
import LogoIcon from '../../../../assets/images/LogoIcon';
import ForwardArrow from '../../../../assets/images/ForwardArrow';
import { Input, InputTextArea } from '../../../components/CustomInput';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import WomenIcon from '../../../../assets/images/WomenIcon';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const NewRegistrationKid = ({ navigation }) => {
    const iamges = [LogoIcon, LogoIcon, LogoIcon];
    const [isWomenName, setWomenName] = useState('')
    const [isHusbandName, setHusbandName] = useState('')
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
    const [womanPregnancyDate, setWomanPregnancyDate] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;

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

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='light-content'
                backgroundColor={COLORS.brand.primary}
            />
            {errorMessage !== '' && (
                <Animated.View style={[styles.snackbar, {
                    opacity: fadeAnim
                }]}>
                    <Text style={styles.snackbarText}>{errorMessage}</Text>
                </Animated.View>
            )}
            <View style={styles.headerBox}>
                <BackIconSecton
                    onPress={() => navigation.goBack()}
                    title='Registration'
                />
                <SvgXml xml={iamges[indexImage]} width={132} height={73} />
                <View style={styles.menuBox}>
                    <StackSection
                        onPress={() => navigation.navigate('WomenNavigationsStack', { screen: 'WomenScreen' })}
                    />
                </View>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    width: '70%',
                    alignSelf: 'center',
                    marginTop: 20,
                    marginBottom: 20,
                    flex: 1
                }}
            >
                {/* <Text style={styles.pageTitle}>Log In</Text> */}

                <Input
                    label='Mother name'
                    placeholder='Enter mother name'
                    value={isWomenName}
                    setValue={setWomenName}
                    autoCapitalize='none'
                />

                <View style={{ marginTop: 20 }}>
                    <Input
                        label='Husband name'
                        placeholder='Enter husband name'
                        value={isHusbandName}
                        setValue={setHusbandName}
                        autoCapitalize='none'
                    />
                </View>

                <View style={{ marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ width: '30%' }}>
                            <Text style={{ fontFamily: FONT.MartelSansSemiBold, fontSize: SIZES.large, color: COLORS.brand.black, textAlign: 'right' }}>Date of birth:</Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                width: '68%',
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

                <View style={{ marginTop: 20 }}>
                    <Input
                        label='Height (CM)'
                        placeholder='Enter height (CM)'
                        value={isHeight}
                        setValue={setHeight}
                        autoCapitalize='none'
                        keyboardType='number-pad'
                    />
                </View>

                <View style={{ marginTop: 20 }}>
                    <Input
                        label='Weight (KG)'
                        placeholder='Enter weight (KG)'
                        value={isWeight}
                        setValue={setWeight}
                        autoCapitalize='none'
                        keyboardType='number-pad'
                    />
                </View>

                <View style={{ marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ width: '30%' }}>
                            <Text style={{ fontFamily: FONT.MartelSansSemiBold, fontSize: SIZES.large, color: COLORS.brand.black, textAlign: 'right' }}>Date of pregnancy:</Text>
                        </View>

                        <TouchableOpacity
                            style={{
                                width: '68%',
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

                <View style={{ marginTop: 20 }}>
                    <InputTextArea
                        label='Pregnancy symptoms'
                        placeholder='Before period any pregnancy symptoms'
                        value={isPregnancySymptoms}
                        setValue={setPregnancySymptoms}
                        autoCapitalize='none'
                        multiline={true}
                        numberOfLines={5}
                        placeholderTextColor='#727c95'
                    />
                </View>

                <View style={{ marginTop: 20 }}>
                    <InputTextArea
                        label='Medical history'
                        placeholder='Enter medical history'
                        value={isMedicalHistory}
                        setValue={setMedicalHistory}
                        autoCapitalize='none'
                        multiline={true}
                        numberOfLines={5}
                        placeholderTextColor='#727c95'
                    />
                </View>

                <View style={{ marginTop: 20 }}>
                    <InputTextArea
                        label='Pregnancy note'
                        placeholder='Enter pregnancy note'
                        value={isPregnancyNote}
                        setValue={setPregnancyNote}
                        autoCapitalize='none'
                        multiline={true}
                        numberOfLines={5}
                        placeholderTextColor='#727c95'
                    />
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginTop: 20
                }}>
                    <TouchableOpacity
                        style={styles.forwardIcon}
                    // onPress={submitData}
                    >
                        <SvgXml xml={ForwardArrow} height={30} width={30} />
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default NewRegistrationKid

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
        height: 60,
        padding: 5,
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
})