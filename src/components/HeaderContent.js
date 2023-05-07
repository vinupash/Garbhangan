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
                <SvgXml xml={BackIcon} height={30} width={30} />
            </TouchableOpacity>
            {/* <SvgXml xml={LogoIcon} width={142} height={83} /> */}
            <Image source={iamges[indexImage]} style={{ width: 260, height: 120 }} />
            {/* <Image source={iamges[indexImage]} style={{ width: 320, height: 150 }} /> */}
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
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    }
})