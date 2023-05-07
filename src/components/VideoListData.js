import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { COLORS, SHADOWS, FONT, SIZES } from '../constants';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const VideoListData = ({
    data,
    onPress,
    onLongPress
}) => {

    return (
        <>
            {data.map((item, i) => {
                return (
                    <TouchableOpacity style={styles.boxContent} key={i}>
                        <TouchableOpacity
                            activeOpacity={0.98}
                            style={styles.sectionBtn}
                            onPress={onPress}
                            onLongPress={onLongPress}
                        >
                            <View style={[styles.loginBtnInner]}>

                            </View>
                            <View style={{ height: 30, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.btnText]}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    </TouchableOpacity>
                );
            })}
        </>
    )
}

export default VideoListData

const styles = StyleSheet.create({
    boxContent: {
        width: 180,
        height: 140,
        marginHorizontal: 10,
        marginTop: 8,
        borderRadius: 10,
        ...SHADOWS.light,
        backgroundColor: '#FFFFFF'
    },
    loginBtnInner: {
        width: 180,
        height: 110,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: COLORS.brand.primary
    },
    btnText: {
        fontFamily: FONT.Charlatan,
        fontSize: SIZES.small,
        color: COLORS.brand.black
    },
})