import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
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

export const BackIconSecton = ({ onPress, title }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', width: 360 }}>
            <TouchableOpacity
                activeOpacity={0.98}
                style={styles.backIcon}
                onPress={onPress}
            >
                <SvgXml xml={BackIcon} height={25} width={25} />
            </TouchableOpacity>
            <Text style={styles.titleText}>{title}</Text>
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
            <SvgXml xml={ChildIcon} height={40} width={40} />
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
            <SvgXml xml={BellIcon} height={25} width={25} />
        </TouchableOpacity>
    )
}

export const WomenStackSection = ({ onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.98}
            style={{
                width: 50,
                height: 50,
                borderTopLeftRadius: 50 / 2,
                borderBottomLeftRadius: 50 / 2,
                ...SHADOWS.light,
                backgroundColor: '#FFFFFF',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            onPress={onPress}
        >
            <SvgXml xml={WomenIcon} height={40} width={40} />
        </TouchableOpacity>
    )
}

export const KidStackSection = ({ onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.98}
            style={{
                width: 50,
                height: 50,
                borderTopRightRadius: 50 / 2,
                borderBottomRightRadius: 50 / 2,
                ...SHADOWS.light,
                backgroundColor: '#FFFFFF',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            onPress={onPress}
        >
            <SvgXml xml={ChildIcon} height={40} width={40} />
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
            <SvgXml xml={LogoutIcon} height={30} width={30} />
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
            <Text style={{ fontFamily: FONT.Charlatan, fontSize: 16, color: COLORS.brand.black }}>{title}</Text>
            <SvgXml xml={AddIcon} height={16} width={16} />
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
            <Text style={{ fontFamily: FONT.Charlatan, fontSize: 16, color: COLORS.brand.black }}>Profile update</Text>
            <SvgXml xml={EditIcon} height={24} width={24} />
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
            <SvgXml xml={StethoscopeIcon} height={30} width={30} />
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    backIcon: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
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
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        ...SHADOWS.light,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    registrationBtn: {
        width: 180,
        height: 50,
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#EACAA6',
        ...SHADOWS.light
    },
})