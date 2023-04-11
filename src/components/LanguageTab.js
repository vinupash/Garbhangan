import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { SHADOWS, COLORS, FONT, SIZES } from '../constants'

const LanguageTab = ({ onPress, title }) => {
    return (
        <View style={styles.boxContent}>
            <TouchableOpacity
                style={styles.sectionBtn}
                onPress={onPress}
            >
                <View style={[styles.loginBtnInner]}>

                </View>
                <View style={{ height: 40, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.btnText]}>{title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default LanguageTab

const styles = StyleSheet.create({
    boxContent: {
        width: 220,
        height: 350,
    },
    loginBtnInner: {
        width: '100%',
        height: 300,
        borderRadius: 16,
        backgroundColor: COLORS.brand.primary,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.light
    },
    btnText: {
        fontFamily: FONT.Charlatan,
        fontSize: SIZES.mediumLarge,
        color: COLORS.brand.black
    },
    sectionBtn: {
        width: '100%',
        height: 350,
        borderRadius: 16,
        backgroundColor: "#FFFFFF",
        ...SHADOWS.light,
        marginBottom: 5,
    },
})