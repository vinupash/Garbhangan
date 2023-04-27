import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { COLORS, SHADOWS, FONT, SIZES } from '../constants';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const VideoTab = ({
    data,
    onPress
}) => {

    return (
        <View style={styles.videoSection}>
            {data.map((item, i) => {
                return (
                    <View style={styles.boxContent} key={i}>
                        <TouchableOpacity
                            activeOpacity={0.98}
                            style={styles.sectionBtn}
                            onPress={onPress}
                        >
                            <View style={[styles.loginBtnInner]}>

                            </View>
                            <View style={{ height: 40, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.btnText]}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                );
            })}
        </View>
    )
}

export default VideoTab

const styles = StyleSheet.create({
    videoSection: {
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: 'space-between',
        width: windowWidth - 50,
        alignSelf: 'center'
    },
    boxContent: {
        width: '32%',
        marginVertical: 10,
    },
    loginBtnInner: {
        width: '100%',
        height: 250,
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
        height: 300,
        borderRadius: 16,
        backgroundColor: "#FFFFFF",
        ...SHADOWS.light,
        marginBottom: 5,
    },
})