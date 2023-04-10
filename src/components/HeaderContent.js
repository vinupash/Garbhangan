import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { SvgXml } from 'react-native-svg';
import LogoIcon from '../../assets/images/LogoIcon';
import BackIcon from '../../assets/images/BackIcon';
import { SHADOWS } from '../constants';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const HeaderContent = ({ onPress }) => {
    return (
        <View style={styles.headerBox}>
            <TouchableOpacity
                style={styles.backIcon}
                onPress={onPress}
            >
                <SvgXml xml={BackIcon} height={30} width={30} />
            </TouchableOpacity>
            <SvgXml xml={LogoIcon} width={142} height={83} />
            <View style={{ width: 60, height: 60 }}></View>
        </View>
    )
}

export default HeaderContent

const styles = StyleSheet.create({
    headerBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: windowWidth - 50,
        alignSelf: 'center',
    },
    backIcon: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        ...SHADOWS.light,
        backgroundColor: '#FFF7EF',
        justifyContent: 'center',
        alignItems: 'center'
    }
})