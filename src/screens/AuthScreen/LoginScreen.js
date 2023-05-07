import React, { useState, useRef, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ImageBackground, StatusBar, SafeAreaView, Animated, ScrollView, Keyboard, ActivityIndicator } from 'react-native';
import { COLORS, FONT, SHADOWS, SIZES, assets } from '../../constants';
import HeaderContent from '../../components/HeaderContent';
import { Input } from '../../components/CustomInput';
import { SvgXml } from 'react-native-svg';
import ForwardArrow from '../../../assets/images/ForwardArrow';
import { AuthContext } from '../../context/AuthContext';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const LoginScreen = ({ navigation }) => {
    const [isLoading, setLoading] = useState(false)
    const { UserLoginFun } = useContext(AuthContext)
    const [isUserId, setUserId] = useState('');
    const [isPassword, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;

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

    const submitData = async () => {
        if (!isUserId) {
            handleErrorMsg();
            setErrorMessage('Please enter valid user id')
            return;
        }
        if (!isPassword) {
            handleErrorMsg();
            setErrorMessage('Please enter valid password')
            return;
        }
        setLoading(true)
        const response = await UserLoginFun(isUserId, isPassword);
        setLoading(false)
        console.log('response Login--->', response);
        if (response.isError == true) {
            handleErrorMsg()
            setErrorMessage(response.message)
        } else {
            console.log(response.isError);
        }
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
            <ImageBackground
                source={assets.BackgroundLanguage}
                style={{ width: windowWidth, height: '100%', resizeMode: 'cover', position: 'relative' }}
            >
                <View style={{ marginTop: 5, marginBottom: 10 }}>
                    <HeaderContent
                        onPress={navigation.goBack}
                    />
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.pageTitle}>Log In</Text>
                    <View style={styles.btnBox}>
                        <Input
                            label='ID Number'
                            placeholder='Enter Login ID'
                            value={isUserId}
                            setValue={setUserId}
                            autoCapitalize='none'
                        />

                        <View style={{ marginTop: 20 }}>
                            <Input
                                label='Password'
                                placeholder='Enter Password'
                                value={isPassword}
                                setValue={setPassword}
                                autoCapitalize='none'
                                secureTextEntry={true}
                            />
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            marginTop: 10,
                            marginBottom: 5
                        }}>
                            <TouchableOpacity
                                activeOpacity={0.98}
                                style={styles.backIcon}
                                onPress={submitData}
                            >
                                {isLoading ? <ActivityIndicator size="large" color="#FFFFFF" /> : <SvgXml xml={ForwardArrow} height={30} width={30} />}
                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>
                {/* {!isKeyboardVisible
                    ?
                    <TouchableOpacity

                        style={styles.backIcon}
                        onPress={submitData}
                    >
                        <SvgXml xml={ForwardArrow} height={30} width={30} />
                    </TouchableOpacity>
                    :
                    null
                } */}

            </ImageBackground>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: COLORS.brand.background
    },
    pageTitle: {
        fontSize: SIZES.mediumLarge,
        fontFamily: FONT.MartelSansSemiBold,
        color: COLORS.brand.black,
        textAlign: 'center'
    },
    btnBox: {
        width: '70%',
        alignSelf: 'center',
        marginTop: 20
    },
    backIcon: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        ...SHADOWS.light,
        backgroundColor: COLORS.brand.primary,
        justifyContent: 'center',
        alignItems: 'center',
        // position: 'absolute',
        // bottom: 20,
        // right: 20
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
})