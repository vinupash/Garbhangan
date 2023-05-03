import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, Dimensions, ScrollView, ActivityIndicator, Image, TextInput } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { COLORS, SHADOWS, FONT, SIZES, assets } from '../../../../constants';
import { BackIconSecton } from '../../../../components/CustomButtons';
import LogoIcon from '../../../../../assets/images/LogoIcon';
// import AdmitCard from '../../../../components/AdmitCard';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { childListApi, womenListApi } from '../../../../constants/AllApiCall';
import moment from 'moment';
import { InputBoxSearch } from '../../../../components/CustomInput';

const ListofKids = ({ navigation }) => {
    const [isLoading, setLoading] = useState(false)
    const texts = ['Shikshan, Aaichya Savalitla...', 'शिक्षण, आईच्या सावलीतल...', 'सिख, मां के छाया की...'];
    const iamges = [LogoIcon, LogoIcon, LogoIcon];
    const [index, setIndex] = useState(0);
    const [indexImage, setIndexImage] = useState(0);
    const [isWomenList, setChildList] = useState([])
    const isFocused = useIsFocused()
    const [isSearchName, setSearchName] = useState('')
    const BASE_URL = 'http://51.77.105.23:81/';

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
        setLoading(false)
        const responseChildList = await childListApi(accessToken, anganwadiId)
        // console.log('responseChildList--->', responseChildList);
        setChildList(responseChildList.data)
        setFilteredData(responseChildList.data)
    };

    const [query, setQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    // console.log('query', query);
    const handleSearch = (text) => {
        // const newData = isWomenList.filter(item => item.firstName.toLowerCase().includes(text.toLowerCase()));
        const newData = isWomenList.filter((item) => {
            if (item.firstName.toLowerCase().includes(text.toLowerCase()) || item.middleName.toLowerCase().includes(text.toLowerCase()) || item.lastName.toLowerCase().includes(text.toLowerCase()) || item.id.toString().startsWith(text.toLowerCase())) {
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
                                },
                            }
                        )}
                    >
                        <View style={[styles.profileSection]}>
                            <Image
                                source={assets.child_img}
                                style={{
                                    width: 80,
                                    height: 100,
                                    borderRadius: 5,
                                }}
                            />
                        </View>
                        <View style={{ flex: 1, marginLeft: 5, height: '100%' }}>
                            <Text style={[styles.labelText]}>Name:</Text>
                            <Text style={[styles.titleText]}>{AdmitCardData.firstName} {AdmitCardData.lastName}</Text>
                            <Text style={[styles.labelText]}>Husband name:</Text>
                            <Text style={[styles.titleText]}>{AdmitCardData.middleName} {AdmitCardData.lastName}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: '49%' }}>
                                    <Text style={[styles.labelText]}>Weight(Kg)</Text>
                                    <Text style={[styles.titleText]}>{AdmitCardData.weight} kg</Text>
                                </View>
                                <View style={{ width: '49%' }}>
                                    <Text style={[styles.labelText]}>Height(CM)</Text>
                                    <Text style={[styles.titleText]}>{AdmitCardData.height} cm</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: '100%' }}>
                                    <Text style={[styles.labelText]}>D.O.B:</Text>
                                    <Text style={[styles.titleText]}>{moment(AdmitCardData.dateOfBirth).format("DD-MM-YYYY")}</Text>
                                </View>
                                {/* {moment(selectedDate).format("DD-MM-YYYY")} */}
                                {/* <View style={{ width: '49%' }}>
                                    <Text style={[styles.labelText]}>Pregnancy date:</Text>
                                    <Text style={[styles.titleText]}>{AdmitCardData.pregnancyDate}</Text>
                                </View> */}
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
            {isLoading ?
                <View style={styles.loading}>
                    <ActivityIndicator size='large' color={COLORS.brand.primary} />
                </View>
                : null}
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', height: '100%', alignItems: 'center' }}>
                <View style={styles.headerBox}>
                    <BackIconSecton
                        onPress={() => navigation.goBack()}
                        title="List of Kid's"
                    />
                    <SvgXml xml={iamges[indexImage]} width={132} height={73} />
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
                        {/* {!isWomenList ? <Text style={{ fontFamily: FONT.Charlatan, fontSize: SIZES.extraLarge, textAlign: 'center', width: '100%', marginTop: 50, color: '#B71C1C' }}>No record found</Text> : <>{AdmitCard()}</>} */}
                        {filteredData.length === 0 ? <Text style={{ fontFamily: FONT.Charlatan, fontSize: SIZES.extraLarge, textAlign: 'center', width: '100%', marginTop: 50, color: '#B71C1C' }}>No record found</Text> : <>{AdmitCard()}</>}
                    </View>
                    {/* {filteredData.length === 0 ? <Text>Cool</Text> : <Text>Not cool</Text>} */}
                </ScrollView>
            </View>
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
    cardSection: {
        flexDirection: 'row',
        flexWrap: "wrap",
        // justifyContent: 'space-between',
        width: windowWidth - 50,
        alignSelf: 'center'
    },
    boxContent: {
        width: '31%',
        marginVertical: 5,
        marginHorizontal: 10
    },
    sectionBtn: {
        width: '100%',
        minHeight: 120,
        borderRadius: 5,
        backgroundColor: "#FFFFFF",
        ...SHADOWS.light,
        marginBottom: 5,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        padding: 5
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
        lineHeight: 16,
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
    }
})