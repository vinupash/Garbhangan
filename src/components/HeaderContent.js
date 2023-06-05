import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native'
import { SvgXml } from 'react-native-svg';
import LogoIcon from '../../assets/images/LogoIcon';
import BackIcon from '../../assets/images/BackIcon';
import { SHADOWS } from '../constants';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import BoardEng from '../../assets/images/Board-Eng.png'
import BoardHin from '../../assets/images/Board-Hin.png'
import BoardMar from '../../assets/images/Board-Mar.png'

const HeaderContent = ({ onPress }) => {
    const iamges = [BoardEng, BoardHin, BoardMar];
    const [indexImage, setIndexImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndexImage((indexImage + 1) % iamges.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [indexImage]);

    return (
        <View style={styles.headerBox}>
            <TouchableOpacity
                activeOpacity={0.98}
                style={styles.backIcon}
                onPress={onPress}
            >
                <SvgXml xml={BackIcon} height={windowWidth >= 1280 ? 40 : 20} width={windowWidth >= 1280 ? 40 : 25} />
            </TouchableOpacity>
            {/* <SvgXml xml={LogoIcon} width={142} height={83} /> */}
            <Image source={iamges[indexImage]} style={{ width: windowWidth >= 1280 ? 360 : 174, alignSelf: 'center', height: windowWidth >= 1280 ? 170 : 80 }} />
            {/* <Image source={iamges[indexImage]} style={{ width: 320, height: 150 }} /> */}
            <View style={{ width: windowWidth >= 1280 ? 80 : 40, height: windowWidth >= 1280 ? 80 : 40 }}></View>
        </View>
    )
}

export default HeaderContent

const styles = StyleSheet.create({
    headerBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: windowWidth - 30,
        alignSelf: 'center',
        marginBottom: 10
    },
    backIcon: {
        width: windowWidth >= 1280 ? 80 : 40,
        height: windowWidth >= 1280 ? 80 : 40,
        borderRadius: windowWidth >= 1280 ? 80 / 2 : 40 / 2,
        ...SHADOWS.light,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    }
})