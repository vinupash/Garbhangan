import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ImageBackground, StatusBar, SafeAreaView } from 'react-native';
import { COLORS, FONT, SHADOWS, SIZES, assets } from '../../constants';
import HeaderContent from '../../components/HeaderContent';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const LanguageScreen = ({ navigation }) => {

    const BtnLanguage = ({
        onPress,
        title
    }) => {
        return (
            <TouchableOpacity
                style={styles.loginBtn}
                onPress={onPress}
            >
                <View style={[styles.loginBtnInner]}>
                    <Text style={styles.btnText}>{title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='light-content'
                backgroundColor={COLORS.brand.primary}
            />
            <ImageBackground
                source={assets.BackgroundLanguage}
                style={{ width: windowWidth, height: '100%', resizeMode: 'cover' }}
            >
                <View style={{ marginTop: 20, marginBottom: 30 }}>
                    <HeaderContent
                        onPress={navigation.goBack}
                    />
                </View>
                <Text style={styles.pageTitle}>Select a Language</Text>
                <View style={styles.btnBox}>
                    <View style={{ width: '30%' }}>
                        <BtnLanguage
                            onPress={() => navigation.navigate('LoginScreen')}
                            title='English'
                        />
                    </View>
                    <View style={{ width: '30%' }}>
                        <BtnLanguage
                            onPress={() => navigation.navigate('LoginScreen')}
                            title='मराठी'
                        />
                    </View>
                    <View style={{ width: '30%' }}>
                        <BtnLanguage
                            onPress={() => navigation.navigate('LoginScreen')}
                            title='हिंदी'
                        />
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default LanguageScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.brand.background
    },
    pageTitle: {
        fontSize: SIZES.xl,
        fontFamily: FONT.MartelSansSemiBold,
        color: COLORS.brand.black,
        textAlign: 'center'
    },
    btnBox: {
        width: windowWidth - 50,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 60
    },
    loginBtn: {
        width: '100%',
        height: 160,
        borderRadius: 16,
        backgroundColor: '#102251',
        ...SHADOWS.light,
        marginBottom: 5
    },
    btnText: {
        fontFamily: FONT.MartelSansBold,
        fontSize: 64,
        color: '#102251'
    },
    loginBtnInner: {
        width: '100%',
        height: 150,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
})