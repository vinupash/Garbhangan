import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, Dimensions, ScrollView, Image, ActivityIndicator, ImageBackground, Animated } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { COLORS, SHADOWS, SIZES, FONT, assets } from '../../../../constants';
import { BackIconSecton, DoctorCheckup, LogoutSection, RegistrationSection, UpdateProfile } from '../../../../components/CustomButtons';
import LogoIcon from '../../../../../assets/images/LogoIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import { useIsFocused } from '@react-navigation/native';
import { getChildDetailsApi, getWomenDetailsApi } from '../../../../constants/AllApiCall';
import moment from 'moment';
import BoardEng from '../../../../../assets/images/Board-Eng.png'
import BoardHin from '../../../../../assets/images/Board-Hin.png'
import BoardMar from '../../../../../assets/images/Board-Mar.png'

const DetailsViewKid = ({ navigation, route }) => {
    const [isLoading, setLoading] = useState(false)
    const texts = ['Shikshan, Aaichya Savalitla...', 'शिक्षण, आईच्या सावलीतल...', 'सिख, मां की छाव में...'];
    const iamges = [BoardEng, BoardHin, BoardMar];
    const [index, setIndex] = useState(0);
    const [indexImage, setIndexImage] = useState(0);
    const isFocused = useIsFocused()
    const [isChildID, setChildID] = useState('')
    const [isFirstName, setFirstName] = useState('')
    const [isMiddleName, setMiddleName] = useState('')
    const [isLastName, setLastName] = useState('')
    const [isHeight, setHeight] = useState('')
    const [isWeight, setWeight] = useState('')
    const [isGender, setGender] = useState('')
    const [userBirth, setUserBirth] = useState('');
    const [isSpeciallyAbled, setSpeciallyAbled] = useState(false)
    const [isChildCheckUpDetails, setChildCheckUpDetails] = useState([])
    const [isActive, setActive] = useState(null)
    const [isProfileImage, setProfileImage] = useState(null)
    const [errorMessage, setErrorMessage] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [isVisible, setIsVisible] = useState(false);
    // console.log(route.params.personDetails);
    useEffect(() => {
        fetchDataAsync()
        setChildID(route.params.personDetails.childId)
    }, [isFocused])

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
        const responseChildDetails = await getChildDetailsApi(accessToken, childId)
        setLoading(false)
        // console.log('responseChildDetails--->', responseChildDetails.data);
        if (responseChildDetails.IsError == true) {
            handleErrorMsg();
            setErrorMessage(responseChildDetails.Message)
            return;
        }
        setFirstName(responseChildDetails.data.firstName)
        setMiddleName(responseChildDetails.data.middleName)
        setLastName(responseChildDetails.data.lastName)
        setSpeciallyAbled(responseChildDetails.data.isSpeciallyAbled)
        setUserBirth(responseChildDetails.data.dateOfBirth)
        setActive(responseChildDetails.data.isActive)
        setGender(responseChildDetails.data.gender)
        setProfileImage(responseChildDetails.data.profilePicture)
        // setWomanCheckUpDetails(responseChildDetails.data.childCheckUpDetails)
        responseChildDetails.data.childCheckUpDetails.sort((a, b) => b.id - a.id);
        setChildCheckUpDetails(responseChildDetails.data.childCheckUpDetails)
        // console.log(responseChildDetails.data.childCheckUpDetails);
        const highestId = responseChildDetails.data.childCheckUpDetails.reduce((prev, current) => {
            return (prev.id > current.id) ? prev : current;
        });
        // console.log('highestId--->', highestId.height, highestId.weight);
        setHeight(highestId.height)
        setWeight(highestId.weight)
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((index + 1) % texts.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [index]);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndexImage((indexImage + 1) % iamges.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [indexImage]);

    const UserDetailsViewBox = ({
        label,
        labelText
    }) => {
        return (
            <View style={{ width: '49%' }}>
                <View style={{ paddingHorizontal: 5 }}>
                    <Text style={styles.label}>{label}:</Text>
                    <View style={styles.inputBox}>
                        <Text style={styles.inputText}>{labelText}</Text>
                    </View>
                </View>
            </View>
        )
    }

    const CheckUpDetails = () => {
        return isChildCheckUpDetails.map((CheckUpDetails, i) => {
            return (
                <View style={{ paddingHorizontal: 5, paddingBottom: 20 }} key={i}>
                    <View style={{ height: 40, width: 250, borderRadius: 40 / 2, backgroundColor: COLORS.brand.primary, lineHeight: 40, marginBottom: 20, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', ...SHADOWS.light }}>
                        <Text style={[styles.inputText, { fontFamily: FONT.Charlatan, fontSize: SIZES.large, color: '#FFFFFF' }]}>Checkup date: {moment(CheckUpDetails.checkUpDate).format("DD-MM-YYYY")}</Text>
                    </View>

                    <Text style={styles.label}>CheckUp notes:</Text>
                    <View style={styles.inputBox}>
                        <Text style={[styles.inputText, { paddingVertical: 10 }]}>{CheckUpDetails.checkUpNotes}</Text>
                    </View>
                    <Text style={[styles.label, { marginTop: 10 }]}>Prescription:</Text>
                    <View style={styles.inputBox}>
                        <Text style={styles.inputText}>{!CheckUpDetails.prescription ? 'No prescription' : CheckUpDetails.prescription}</Text>
                    </View>
                </View>
            );
        });
    };

    // console.log(isFirstName + ' ' + isLastName);
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
            <ImageBackground
                source={assets.ParkElement}
                style={{ width: windowWidth, height: '100%', resizeMode: 'cover', position: 'relative' }}
            >
                <View style={{ flexDirection: 'column', height: '100%', alignItems: 'center' }}>
                    <View style={styles.headerBox}>
                        <BackIconSecton
                            onPress={() => navigation.goBack()}
                            title="Detail's"
                        />
                        {/* <SvgXml xml={iamges[indexImage]} width={windowWidth >= 1280 ? 132 : 120} height={windowWidth >= 1280 ? 73 : 63} /> */}
                        <Image source={iamges[indexImage]} style={{ width: windowWidth >= 1280 ? 350 : 174, alignSelf: 'center', height: windowWidth >= 1280 ? 170 : 80 }} />
                        <View style={styles.menuBox}>
                            {/* <Text style={styles.titleText}></Text> */}
                            <UpdateProfile
                                onPress={() => navigation.navigate('ChildUpdateProfile', {
                                    personDetails: {
                                        childId: isChildID,
                                        firstName: isFirstName,
                                        lastName: isLastName,
                                        middleName: isMiddleName,
                                        speciallyAbled: isSpeciallyAbled,
                                        userBirth: userBirth,
                                        weight: isWeight,
                                        height: isHeight,
                                        isActive: isActive,
                                        gander: isGender,
                                        isProfileImage: isProfileImage
                                    },
                                })}
                            />
                            <DoctorCheckup
                                onPress={() => navigation.navigate('ChildDoctorCheckup', {
                                    personDetails: {
                                        childId: isChildID,
                                        isProfileImage: isProfileImage
                                    },
                                })}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', height: windowHeight - 120, width: windowWidth - 50 }}>
                        <View style={styles.profilePicture}>
                            {isProfileImage == null ?
                                <Image
                                    source={assets.child_img}
                                    style={{
                                        width: windowWidth >= 1280 ? 250 : 200,
                                        height: windowWidth >= 1280 ? 350 : 250,
                                        borderRadius: 10
                                    }}
                                />
                                :
                                <Image
                                    source={{ uri: `data:image/png;base64,${isProfileImage}` }}
                                    style={{
                                        width: windowWidth >= 1280 ? 250 : 200,
                                        height: windowWidth >= 1280 ? 350 : 250,
                                        borderRadius: 10
                                    }}
                                />
                            }
                        </View>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={{ height: '100%', width: '100%' }}
                        >
                            <View style={styles.rowBox}>
                                <UserDetailsViewBox
                                    label='Name'
                                    labelText={isFirstName + ' ' + isLastName}
                                />
                                <UserDetailsViewBox
                                    label='Father name'
                                    labelText={isMiddleName + ' ' + isLastName}
                                />
                            </View>

                            <View style={[styles.rowBox, { marginTop: 10 }]}>
                                <UserDetailsViewBox
                                    label='Date of birth'
                                    labelText={moment(userBirth).format("DD-MM-YYYY")}
                                />
                                <UserDetailsViewBox
                                    label='Specially abled'
                                    labelText={isSpeciallyAbled == true ? 'Yes' : 'No'}
                                />
                            </View>

                            <View style={[styles.rowBox, { marginTop: 10 }]}>
                                <UserDetailsViewBox
                                    label='Weight (Kg)'
                                    labelText={isWeight}
                                />
                                <UserDetailsViewBox
                                    label='Height (CM)'
                                    labelText={isHeight}
                                />
                            </View>

                            <View style={[styles.rowBox, { marginTop: 10 }]}>
                                <UserDetailsViewBox
                                    label='Gander'
                                    labelText={isGender === 'M' ? 'Male' : 'Female'}
                                />
                            </View>

                            <Text style={[styles.label, { fontSize: SIZES.mediumLarge, textAlign: 'center', width: '100%', marginVertical: 20, textTransform: 'uppercase', fontFamily: FONT.MartelSansExtraBold, color: '#FFFFFF' }]}>Checkup detail's</Text>
                            {CheckUpDetails()}
                        </ScrollView>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default DetailsViewKid

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
        // marginVertical: 10,
        // height: 75,
    },
    menuBox: {
        width: windowWidth >= 1280 ? 360 : 300,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    profilePicture: {
        width: windowWidth >= 1280 ? 250 : 200,
        height: windowWidth >= 1280 ? 350 : 250,
        backgroundColor: COLORS.brand.primary,
        borderRadius: 10,
        ...SHADOWS.light,
        marginRight: 30
    },
    label: {
        fontFamily: FONT.MartelSansSemiBold,
        fontSize: SIZES.large,
        color: COLORS.brand.black,
        textAlign: 'left'
    },
    inputBox: {
        width: '100%',
        minHeight: 50,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingHorizontal: 20,
        ...SHADOWS.light,
        marginBottom: 5,
        justifyContent: 'center'
    },
    inputText: {
        fontFamily: FONT.MartelSansSemiBold,
        fontSize: SIZES.medium,
        color: COLORS.brand.black,
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
    rowBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
})

