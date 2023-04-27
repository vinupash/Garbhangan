import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { COLORS, SHADOWS, FONT, SIZES } from '../constants';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const AdmitCard = ({
    data,
    onPress
}) => {
    return (
        <View style={styles.cardSection}>
            {data.map((item, i) => {
                return (
                    <View style={styles.boxContent} key={i}>
                        <TouchableOpacity
                            activeOpacity={0.98}
                            style={styles.sectionBtn}
                            onPress={onPress}
                        >
                            <View style={[styles.profileSection]}>

                            </View>
                            <View style={{ flex: 1, marginLeft: 5, height: '100%' }}>
                                <Text style={[styles.labelText]}>Name:</Text>
                                <Text style={[styles.titleText]}>{item.name}</Text>
                                <Text style={[styles.labelText]}>Husband name:</Text>
                                <Text style={[styles.titleText]}>{item.husbandName}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ width: '49%' }}>
                                        <Text style={[styles.labelText]}>D.O.B:</Text>
                                        <Text style={[styles.titleText]}>{item.dob}</Text>
                                    </View>
                                    <View style={{ width: '49%' }}>
                                        <Text style={[styles.labelText]}>Pregnancy date:</Text>
                                        <Text style={[styles.titleText]}>{item.pregnancyDate}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ width: '49%' }}>
                                        <Text style={[styles.labelText]}>Weight(Kg)</Text>
                                        <Text style={[styles.titleText]}>{item.weight} kg</Text>
                                    </View>
                                    <View style={{ width: '49%' }}>
                                        <Text style={[styles.labelText]}>Height(CM)</Text>
                                        <Text style={[styles.titleText]}>{item.height} cm</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                );
            })}
        </View>
    )
}

export default AdmitCard

const styles = StyleSheet.create({
    cardSection: {
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
    sectionBtn: {
        width: '100%',
        minHeight: 120,
        borderRadius: 5,
        backgroundColor: "#FFFFFF",
        ...SHADOWS.light,
        marginBottom: 5,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        padding: 5
    },
    profileSection: {
        width: 80,
        height: 100,
        borderRadius: 5,
        backgroundColor: COLORS.brand.primary,
        ...SHADOWS.light
    },
    labelText: {
        fontFamily: FONT.MartelSansBold,
        fontSize: SIZES.base,
        color: COLORS.brand.black
    },
    titleText: {
        fontFamily: FONT.MartelSansRegular,
        fontSize: SIZES.small,
        lineHeight: 16,
        color: COLORS.brand.black
    }
})