import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { SvgXml } from 'react-native-svg';
import LogoIcon from '../../assets/images/LogoIcon';
import BackIcon from '../../assets/images/BackIcon';
import { SHADOWS, FONT, SIZES, COLORS } from '../constants';
import AddIcon from '../../assets/images/AddIcon';
import ChildIcon from '../../assets/images/ChildIcon';
import BellIcon from '../../assets/images/BellIcon';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const MenuComponents = ({ onPress }) => {
    const iamges = [LogoIcon, LogoIcon, LogoIcon];
    const [indexImage, setIndexImage] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setIndexImage((indexImage + 1) % iamges.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [indexImage]);

    return (
        <View style={styles.headerBox}>
            <View style={{ borderWidth: 1, flexDirection: 'row', alignItems: 'center', width: 360 }}>
                <TouchableOpacity
                    style={styles.backIcon}
                    onPress={onPress}
                >
                    <SvgXml xml={BackIcon} height={25} width={25} />
                </TouchableOpacity>
                <Text style={styles.titleText}>Wpmen</Text>
            </View>
            <SvgXml xml={iamges[indexImage]} width={132} height={73} />
            <View style={{ width: 360, alignItems: 'center', flexDirection: 'row', borderWidth: 1, justifyContent: 'space-between' }}>
                <TouchableOpacity
                    style={styles.bellIcon}
                    onPress={onPress}
                >
                    <SvgXml xml={BellIcon} height={25} width={25} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.registrationBtn}
                    onPress={onPress}
                >
                    <Text style={{ fontFamily: FONT.MartelSansSemiBold, fontSize: SIZES.large }}>New Registration</Text>
                    <SvgXml xml={AddIcon} height={20} width={20} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.backIcon}
                    onPress={onPress}
                >
                    <SvgXml xml={ChildIcon} height={40} width={40} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MenuComponents

const styles = StyleSheet.create({
    headerBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: windowWidth - 50,
        alignSelf: 'center',
    },
    backIcon: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        ...SHADOWS.light,
        backgroundColor: '#FFF7EF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bellIcon: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        ...SHADOWS.light,
        backgroundColor: '#FFF7EF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontFamily: FONT.Charlatan,
        fontSize: SIZES.extraLarge,
        color: COLORS.brand.black,
        marginLeft: 10
    },
    registrationBtn: {
        width: 230,
        borderWidth: 1,
        height: 50,
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#EACAA6',
        ...SHADOWS.light
    }
})