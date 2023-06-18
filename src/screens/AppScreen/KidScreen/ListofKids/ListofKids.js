import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, Dimensions, ScrollView, ActivityIndicator, Image, TextInput, Animated, ImageBackground } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { COLORS, SHADOWS, FONT, SIZES, assets } from '../../../../constants';
import { BackIconSecton } from '../../../../components/CustomButtons';
import LogoIcon from '../../../../../assets/images/LogoIcon';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { childListApi, womenListApi } from '../../../../constants/AllApiCall';
import moment from 'moment';
import { InputBoxSearch } from '../../../../components/CustomInput';
import BoardEng from '../../../../../assets/images/Board-Eng.png'
import BoardHin from '../../../../../assets/images/Board-Hin.png'
import BoardMar from '../../../../../assets/images/Board-Mar.png'

const ListofKids = ({ navigation }) => {
    const [isLoading, setLoading] = useState(false)
    const texts = ['Shikshan, Aaichya Savalitla...', 'शिक्षण, आईच्या सावलीतल...', 'सिख, मां की छाव में...'];
    const iamges = [BoardEng, BoardHin, BoardMar];
    const [index, setIndex] = useState(0);
    const [indexImage, setIndexImage] = useState(0);
    const [isChildList, setChildList] = useState([])
    const isFocused = useIsFocused()
    const [errorMessage, setErrorMessage] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [isVisible, setIsVisible] = useState(false);
    const [isConnected, setIsConnected] = useState(true);

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

    useEffect(() => {
        fetchDataAsync()
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
        // console.log('transformedAccessToken ListofKids--->', transformedAccessToken.accessToken);
        // console.log('transformedRefreshToken ListofKids--->', transformedRefreshToken.refreshToken);
        // console.log('transformedUserData ListofKids--->', transformedUserData.anganwadiId);
        const anganwadiId = transformedUserData.anganwadiId
        const accessToken = "Bearer " + transformedAccessToken.accessToken
        // const refreshToken = "refreshToken= " + transformedRefreshToken.refreshToken
        const responseChildList = await childListApi(accessToken, anganwadiId)
        setLoading(false)
        if (responseChildList.IsError == true) {
            handleErrorMsg()
            setErrorMessage(responseChildList.Message);
            return
        }
        // console.log('responseChildList--->', responseChildList.data);
        responseChildList.data.sort((a, b) => b.id - a.id);
        setChildList(responseChildList.data)
        setFilteredData(responseChildList.data)
    };

    const [query, setQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const handleSearch = (text) => {
        // const newData = isChildList.filter(item => item.firstName.toLowerCase().includes(text.toLowerCase()));
        const newData = isChildList.filter((item) => {
            if (item.firstName.toLowerCase().includes(text.toLowerCase()) || item.lastName.toLowerCase().includes(text.toLowerCase()) || item.id.toString().startsWith(text.toLowerCase())) {
                return item;
            }
        });
        setQuery(text);
        setFilteredData(newData);
    }

    // console.log(filteredData);
    const AdmitCard = () => {
        return filteredData.map((AdmitCardData, i) => {
            return (
                <View style={styles.boxContent} key={i}>
                    <TouchableOpacity
                        activeOpacity={0.98}
                        style={styles.sectionBtn}
                        onPress={() => navigation.navigate('DetailsViewKid',
                            {
                                personDetails: {
                                    anganwad: AdmitCardData.anganwadiId,
                                    childId: AdmitCardData.id,
                                    firstName: AdmitCardData.firstName,
                                    lastName: AdmitCardData.lastName,
                                    isProfileImage: AdmitCardData.profilePicture,
                                },
                            }
                        )}
                    >
                        <View style={[styles.profileSection]}>
                            {
                                AdmitCardData.profilePicture == null ?
                                    <Image
                                        source={assets.child_img}
                                        style={{
                                            width: 80,
                                            height: 100,
                                            borderRadius: 5,
                                        }}
                                    />
                                    :
                                    <Image
                                        source={{ uri: `data:image/png;base64,${AdmitCardData.profilePicture}` }}
                                        style={{
                                            width: 80,
                                            height: 100,
                                            borderRadius: 5,
                                        }}
                                    />
                            }
                        </View>
                        <View style={{ flex: 1, marginLeft: 5, height: '100%' }}>
                            <Text style={[styles.labelText]}>Name:</Text>
                            <Text style={[styles.titleText]}>{AdmitCardData.firstName} {AdmitCardData.lastName}</Text>
                            <Text style={[styles.labelText]}>Father name:</Text>
                            <Text style={[styles.titleText]}>{AdmitCardData.middleName} {AdmitCardData.lastName}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: '49%' }}>
                                    <Text style={[styles.labelText]}>Weight(Kg)</Text>
                                    {/* <Text style={[styles.titleText]}>{AdmitCardData.childCheckUpDetails[AdmitCardData.childCheckUpDetails.length - 1].weight} kg</Text> */}
                                    {/* <Text style={[styles.titleText]}>{JSON.stringify(AdmitCardData.childCheckUpDetails)}</Text> */}
                                </View>
                                <View style={{ width: '49%' }}>
                                    <Text style={[styles.labelText]}>Height(CM)</Text>
                                    {/* <Text style={[styles.titleText]}>{AdmitCardData.childCheckUpDetails[AdmitCardData.childCheckUpDetails.length - 1].height} cm</Text> */}
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: '100%' }}>
                                    <Text style={[styles.labelText]}>D.O.B:</Text>
                                    <Text style={[styles.titleText]}>{moment(AdmitCardData.dateOfBirth).format("DD-MM-YYYY")}</Text>
                                </View>
                            </View>

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
            {errorMessage !== '' && (
                <Animated.View style={[styles.snackbar, {
                    opacity: fadeAnim
                }]}>
                    <Text style={styles.snackbarText}>{errorMessage}</Text>
                </Animated.View>
            )}
            {isLoading ?
                <View style={styles.loading}>
                    <ActivityIndicator size='large' color={COLORS.brand.primary} />
                </View>
                : null}

            <ImageBackground
                source={assets.ParkElement}
                style={{ width: windowWidth, height: '100%', resizeMode: 'cover', position: 'relative' }}
            >
                <View style={{ flexDirection: 'column', justifyContent: 'space-between', height: '100%', alignItems: 'center' }}>
                    <View style={styles.headerBox}>
                        <BackIconSecton
                            onPress={() => navigation.goBack()}
                            title="List of Kid's"
                        />
                        <Image source={iamges[indexImage]} style={{ width: windowWidth >= 1280 ? 350 : 174, alignSelf: 'center', height: windowWidth >= 1280 ? 170 : 80 }} />
                        <View style={styles.menuBox}>
                            <InputBoxSearch
                                value={query}
                                onChangeText={handleSearch}
                                placeholder="Search by name or ID"
                            />
                        </View>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ width: '100%', height: '100%' }}
                    >
                        <View style={styles.cardSection}>
                            {filteredData.length === 0 ? <Text style={{ fontFamily: FONT.Charlatan, fontSize: SIZES.extraLarge, textAlign: 'center', width: '100%', marginTop: 50, color: '#B71C1C' }}>No record found</Text> : <>{AdmitCard()}</>}
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default ListofKids

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
        flexDirection: 'row',
        padding: 5,
    },
    profileSection: {
        width: 80,
        height: 100,
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
        fontFamily: FONT.MartelSansRegular,
        fontSize: SIZES.small,
        lineHeight: 18,
        color: COLORS.brand.black
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
})