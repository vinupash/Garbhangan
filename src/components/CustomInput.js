import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { COLORS, FONT, SIZES } from '../constants'

export const Input = ({
    props,
    name,
    maxLength,
    placeholder,
    value,
    setValue,
    keyboardType,
    secureTextEntry = false,
    placeholderTextColor,
    autoCapitalize,
    label
}) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ width: '30%' }}>
                <Text style={{ fontFamily: FONT.MartelSansSemiBold, fontSize: SIZES.large, color: COLORS.brand.black, textAlign: 'right' }}>{label}:</Text>
            </View>
            <View style={{
                width: '68%',
                height: 50,
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                paddingHorizontal: 20,
            }}>
                <TextInput
                    style={styles.inputStyle}
                    placeholder={placeholder}
                    placeholderTextColor='#727c95'
                    onChangeText={(text) => setValue(text)}
                    value={value}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                    autoCapitalize={autoCapitalize}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputStyle: {
        fontFamily: FONT.MartelSansSemiBold,
        fontSize: SIZES.medium,
        color: COLORS.brand.black,
        flex: 1,
    },
})