import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import { SHADOWS, FONT, SIZES, COLORS } from '../constants';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const ScreenTab = ({ onPress, title, source }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.98}
            onPress={onPress}
            style={styles.cardBox}
        >
            <View style={styles.innerCardBox}>
                <Image source={source}
                    style={{
                        width: '100%',
                        height: windowWidth >= 1280 ? 400 : 210,
                        borderRadius: 16,
                    }}
                />
            </View>
            <View style={{
                height: 50,
                justifyContent: 'center',
                alignItems: 'center', backgroundColor: '#FFFFFF', borderBottomEndRadius: 20,
                borderBottomLeftRadius: 20,
            }}>
                <Text style={styles.cardBoxTitle}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ScreenTab

const styles = StyleSheet.create({
    cardBox: {
        // width: 220,
        // height: 350,
        width: windowWidth >= 1280 ? 300 : 190,
        height: windowWidth >= 1280 ? 450 : 230,
        backgroundColor: '#FFFFFF',
        marginVertical: 8,
        marginHorizontal: 10,
        borderRadius: 20,
        ...SHADOWS.light
    },
    innerCardBox: {
        width: '100%',
        height: windowWidth >= 1280 ? 400 : 200,
        borderRadius: 20,
        backgroundColor: COLORS.brand.primary,
        ...SHADOWS.light,
        marginBottom: 5,
    },
    cardBoxTitle: {
        fontFamily: FONT.Charlatan,
        fontSize: windowWidth >= 1280 ? SIZES.large : SIZES.medium,
        color: COLORS.brand.black,
    }
})