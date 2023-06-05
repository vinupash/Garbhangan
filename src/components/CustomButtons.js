import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { COLORS, FONT, SHADOWS, SIZES } from '../constants'
import BackIcon from '../../assets/images/BackIcon'
import { SvgXml } from 'react-native-svg'
import ChildIcon from '../../assets/images/ChildIcon'
import BellIcon from '../../assets/images/BellIcon'
import WomenIcon from '../../assets/images/WomenIcon'
import LogoutIcon from '../../assets/images/LogoutIcon'
import AddIcon from '../../assets/images/AddIcon'
import EditIcon from '../../assets/images/EditIcon'
import StethoscopeIcon from '../../assets/images/StethoscopeIcon'
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export const BackIconSecton = ({ onPress, title }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', width: windowWidth >= 1280 ? 400 : 300 }}>
            <TouchableOpacity
                activeOpacity={0.98}
                style={styles.backIcon}
                onPress={onPress}
            >
                <SvgXml xml={BackIcon} height={windowWidth >= 1280 ? 30 : 20} width={windowWidth >= 1280 ? 30 : 20} />
            </TouchableOpacity>
            <Text style={[styles.titleText, { fontSize: windowWidth >= 1280 ? SIZES.xxl : SIZES.extraLarge }]}>{title}</Text>
        </View>
    )
}

export const StackSection = ({ onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.98}
            style={styles.backIcon}
            onPress={onPress}
        >
            <SvgXml xml={ChildIcon} height={windowWidth >= 1280 ? 40 : 25} width={windowWidth >= 1280 ? 40 : 25} />
        </TouchableOpacity>
    )
}

export const BellSection = ({ onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.98}
            style={styles.bellIcon}
            onPress={onPress}
        >
            <SvgXml xml={BellIcon} height={windowWidth >= 1280 ? 30 : 20} width={windowWidth >= 1280 ? 30 : 20} />
        </TouchableOpacity>
    )
}

export const WomenStackSection = ({ onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.98}
            style={{
                width: 60,
                height: 60,
                borderTopLeftRadius: 60 / 2,
                borderBottomLeftRadius: 60 / 2,
                ...SHADOWS.light,
                backgroundColor: '#FFFFFF',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            onPress={onPress}
        >
            <SvgXml xml={WomenIcon} height={windowWidth >= 1280 ? 40 : 20} width={windowWidth >= 1280 ? 40 : 20} />
        </TouchableOpacity>
    )
}

export const KidStackSection = ({ onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.98}
            style={{
                width: 60,
                height: 60,
                borderTopRightRadius: 60 / 2,
                borderBottomRightRadius: 60 / 2,
                ...SHADOWS.light,
                backgroundColor: '#FFFFFF',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            onPress={onPress}
        >
            <SvgXml xml={ChildIcon} height={windowWidth >= 1280 ? 40 : 20} width={windowWidth >= 1280 ? 40 : 20} />
        </TouchableOpacity>
    )
}

export const LogoutSection = ({ onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.98}
            style={styles.backIcon}
            onPress={onPress}
        >
            <SvgXml xml={LogoutIcon} height={windowWidth >= 1280 ? 30 : 20} width={windowWidth >= 1280 ? 30 : 20} />
        </TouchableOpacity>
    )
}

export const RegistrationSection = ({ onPress, title }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.98}
            style={styles.registrationBtn}
            onPress={onPress}
        >
            <Text style={{ fontFamily: FONT.Charlatan, fontSize: windowWidth >= 1280 ? 16 : 12, color: COLORS.brand.black }}>{title}</Text>
            <SvgXml xml={AddIcon} height={windowWidth >= 1280 ? 16 : 12} width={windowWidth >= 1280 ? 16 : 12} />
        </TouchableOpacity>
    )
}

export const UpdateProfile = ({ onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.98}
            style={[styles.registrationBtn, { marginRight: 10 }]}
            onPress={onPress}
        >
            <Text style={{ fontFamily: FONT.Charlatan, fontSize: windowWidth >= 1280 ? 16 : 12, color: COLORS.brand.black }}>Profile update</Text>
            <SvgXml xml={EditIcon} height={windowWidth >= 1280 ? 24 : 18} width={windowWidth >= 1280 ? 24 : 18} />
        </TouchableOpacity>
    )
}

export const DoctorCheckup = ({ onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.98}
            style={styles.backIcon}
            onPress={onPress}
        >
            <SvgXml xml={StethoscopeIcon} height={windowWidth >= 1280 ? 30 : 20} width={windowWidth >= 1280 ? 30 : 20} />
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    backIcon: {
        width: windowWidth >= 1280 ? 60 : 40,
        height: windowWidth >= 1280 ? 60 : 40,
        borderRadius: windowWidth >= 1280 ? 60 / 2 : 40 / 2,
        ...SHADOWS.light,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontFamily: FONT.Charlatan,
        fontSize: SIZES.xxl,
        color: "#FFFFFF",
        marginLeft: 20
    },
    bellIcon: {
        width: windowWidth >= 1280 ? 60 : 40,
        height: windowWidth >= 1280 ? 60 : 40,
        borderRadius: windowWidth >= 1280 ? 60 / 2 : 40 / 2,
        ...SHADOWS.light,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    registrationBtn: {
        width: windowWidth >= 1280 ? 200 : 160,
        height: windowWidth >= 1280 ? 60 : 40,
        borderRadius: windowWidth >= 1280 ? 60 : 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#EACAA6',
        ...SHADOWS.light
    },
})