import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { SHADOWS, COLORS, FONT, SIZES } from '../constants'
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const LanguageTab = ({ onPress, title }) => {
    return (
        <View style={styles.boxContent}>
            <TouchableOpacity
                activeOpacity={0.98}
                style={styles.sectionBtn}
                onPress={onPress}
            >
                <View style={[styles.loginBtnInner]}>

                </View>
                <View style={{
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center', backgroundColor: '#FFFFFF', borderBottomEndRadius: 20,
                    borderBottomLeftRadius: 20,
                }}>
                    <Text style={[styles.btnText]}>{title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default LanguageTab

const styles = StyleSheet.create({
    boxContent: {
        width: windowWidth >= 960 ? 220 : 190,
        height: windowWidth >= 960 ? 350 : 230,
    },
    loginBtnInner: {
        width: '100%',
        height: windowWidth >= 960 ? 310 : 200,
        borderRadius: 16,
        backgroundColor: COLORS.brand.primary,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.light
    },
    btnText: {
        fontFamily: FONT.Charlatan,
        fontSize: SIZES.medium,
        color: COLORS.brand.black,
    },
    sectionBtn: {
        width: '100%',
        height: windowWidth >= 960 ? 350 : 230,
        borderRadius: 16,
        backgroundColor: "#FFFFFF",
        ...SHADOWS.light,
        marginBottom: 5,
    },
})