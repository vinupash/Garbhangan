import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, Dimensions, ScrollView, Image, ActivityIndicator } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { COLORS, SHADOWS, SIZES, FONT, assets } from '../../../../constants';
import { BackIconSecton, DoctorCheckup, LogoutSection, RegistrationSection, UpdateProfile } from '../../../../components/CustomButtons';
import LogoIcon from '../../../../../assets/images/LogoIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import { useIsFocused } from '@react-navigation/native';
import { getWomenDetailsApi } from '../../../../constants/AllApiCall';
import moment from 'moment';

const DetailsView = ({ navigation, route }) => {
    const [isLoading, setLoading] = useState(false)
    const texts = ['Shikshan, Aaichya Savalitla...', 'शिक्षण, आईच्या सावलीतल...', 'सिख, मां के छाया की...'];
    const iamges = [LogoIcon, LogoIcon, LogoIcon];
    const [index, setIndex] = useState(0);
    const [indexImage, setIndexImage] = useState(0);
    const isFocused = useIsFocused()
    const [isWomenID, setWomenID] = useState('')
    const [isFirstName, setFirstName] = useState('')
    const [isMiddleName, setMiddleName] = useState('')
    const [isLastName, setLastName] = useState('')
    const [isHeight, setHeight] = useState('')
    const [isWeight, setWeight] = useState('')
    const [userBirth, setUserBirth] = useState('');
    const [isSpeciallyAbled, setSpeciallyAbled] = useState(false)
    const [isWomanCheckUpDetails, setWomanCheckUpDetails] = useState([])
    const [isActive, setActive] = useState(null)

    console.log(route.params.personDetails);
    useEffect(() => {
        fetchDataAsync()
        setWomenID(route.params.personDetails.womenId)
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
        setLoading(false)
        // console.log('responseWomenDetails--->', responseWomenDetails.data.isSpeciallyAbled);
        setFirstName(responseWomenDetails.data.firstName)
        setMiddleName(responseWomenDetails.data.middleName)
        setLastName(responseWomenDetails.data.lastName)
        setHeight(responseWomenDetails.data.height)
        setWeight(responseWomenDetails.data.weight)
        setSpeciallyAbled(responseWomenDetails.data.isSpeciallyAbled)
        setUserBirth(responseWomenDetails.data.dateOfBirth)
        setActive(responseWomenDetails.data.isActive)
        // setWomanCheckUpDetails(responseWomenDetails.data.womanCheckUpDetails)
        responseWomenDetails.data.womanCheckUpDetails.sort((a, b) => b.id - a.id);
        setWomanCheckUpDetails(responseWomenDetails.data.womanCheckUpDetails)
        console.log(responseWomenDetails.data.womanCheckUpDetails);
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
        return isWomanCheckUpDetails.map((CheckUpDetails, i) => {
            return (
                <View style={{ paddingHorizontal: 5, paddingBottom: 20 }} key={i}>
                    <View style={{ height: 40, width: 250, borderRadius: 40 / 2, backgroundColor: COLORS.brand.primary, lineHeight: 40, marginBottom: 20, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', ...SHADOWS.light }}>
                        <Text style={[styles.inputText, { fontFamily: FONT.Charlatan, fontSize: SIZES.large, color: '#FFFFFF' }]}>Checkup date: {moment(CheckUpDetails.checkUpDate).format("DD-MM-YYYY")}</Text>
                    </View>

                    <Text style={styles.label}>Pregnancy symptoms:</Text>
                    <View style={styles.inputBox}>
                        <Text style={[styles.inputText, { paddingVertical: 10 }]}>{CheckUpDetails.prePregnancyNotes}</Text>
                    </View>
                    <Text style={[styles.label, { marginTop: 10 }]}>Medical history:</Text>
                    <View style={styles.inputBox}>
                        <Text style={styles.inputText}>{CheckUpDetails.medicalHistory}</Text>
                    </View>
                    <Text style={[styles.label, { marginTop: 10 }]}>Pregnancy note:</Text>
                    <View style={styles.inputBox}>
                        <Text style={styles.inputText}>{CheckUpDetails.pregnancyNotes}</Text>
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
            <View style={{ flexDirection: 'column', height: '100%', alignItems: 'center' }}>
                <View style={styles.headerBox}>
                    <BackIconSecton
                        onPress={() => navigation.goBack()}
                        title="Detail's"
                    />
                    <SvgXml xml={iamges[indexImage]} width={132} height={73} />
                    <View style={styles.menuBox}>
                        {/* <Text style={styles.titleText}></Text> */}
                        <UpdateProfile
                            onPress={() => navigation.navigate('WomenUpdateProfile', {
                                personDetails: {
                                    womenId: isWomenID,
                                    firstName: isFirstName,
                                    lastName: isLastName,
                                    middleName: isMiddleName,
                                    speciallyAbled: isSpeciallyAbled,
                                    userBirth: userBirth,
                                    weight: isWeight,
                                    height: isHeight,
                                    isActive: isActive,
                                },
                            })}
                        />
                        <DoctorCheckup
                            onPress={() => navigation.navigate('WomenDoctorCheckup', {
                                personDetails: {
                                    womenId: isWomenID,
                                },
                            })}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', height: windowHeight - 120, width: windowWidth - 50 }}>
                    <View style={styles.profilePicture}>
                        <Image
                            source={assets.women_img}
                            style={{
                                width: 250,
                                height: 350,
                                borderRadius: 10
                            }}
                        />
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
                                label='Husband name'
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

                        <Text style={[styles.label, { fontSize: SIZES.mediumLarge, textAlign: 'center', width: '100%', marginVertical: 20 }]}>Checkup detail's</Text>
                        {CheckUpDetails()}
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default DetailsView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.brand.background,
    },
    headerBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: windowWidth - 50,
        alignSelf: 'center',
        marginVertical: 10,
        height: 75,
    },
    menuBox: {
        width: 360,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    profilePicture: {
        width: 250,
        height: 350,
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
    }
})