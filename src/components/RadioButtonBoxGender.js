import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { COLORS, SHADOWS, FONT, SIZES } from '../constants';

const RadioButtonBoxGender = ({
    data,
    onSelect
}) => {

    const [userOption, setUserOption] = useState(null);
    const selectHandler = (value) => {
        onSelect(value);
        setUserOption(value);
    };

    return (
        <View style={styles.selectSection}>
            {data.map((item, i) => {
                return (
                    <TouchableOpacity
                        key={i}
                        onPress={() => selectHandler(item.value)}
                        style={
                            item.value === userOption ? styles.selected : styles.unselected
                        }
                    >
                        <Text style={item.value === userOption ? styles.selectValueTitle : styles.unselectValueTitle}>{item.value}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    )
}

export default RadioButtonBoxGender

const styles = StyleSheet.create({
    unselected: {
        width: '32%',
        minHeight: 50,
        // height: 110,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        paddingHorizontal: 10,
        paddingVertical: 16,
        borderRadius: 10,
        ...SHADOWS.light,
        marginRight: 8,
        // borderWidth: 1,
        // borderColor: COLORS.neutrals.pearl,
        backgroundColor: '#FFFFFF'
    },
    selected: {
        width: '32%',
        minHeight: 50,
        // height: 110,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        paddingHorizontal: 10,
        paddingVertical: 16,
        borderRadius: 10,
        ...SHADOWS.light,
        marginRight: 8,
        // borderWidth: 1,
        // borderColor: COLORS.brand.secondary,
        backgroundColor: COLORS.brand.primary
    },
    selectValueBox: {
        width: '32%',
        minHeight: 50,
        // height: 110,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        paddingHorizontal: 10,
        paddingVertical: 16,
        borderRadius: 10,
        ...SHADOWS.light,
        marginRight: 8,
        borderWidth: 1,
        // borderColor: COLORS.neutrals.pearl,
        // backgroundColor: COLORS.neutrals.coconut
    },
    selectValueTitle: {
        fontSize: SIZES.font,
        letterSpacing: 0.2,
        fontFamily: FONT.MartelSansBold,
        color: '#FFFFFF',
        textAlign: 'center',
        lineHeight: 24
    },
    unselectValueTitle: {
        fontSize: SIZES.font,
        letterSpacing: 0.2,
        fontFamily: FONT.MartelSansBold,
        color: '#000000',
        textAlign: 'center',
        lineHeight: 24
    },
    selectSection: {
        flexDirection: 'row',
        flexWrap: "wrap",
        // justifyContent: 'space-between',
    },
})