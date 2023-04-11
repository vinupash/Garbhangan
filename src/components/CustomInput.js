import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { COLORS, FONT, SHADOWS, SIZES } from '../constants'

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
                ...SHADOWS.light,
                marginRight: 5,
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

export const InputTextArea = ({
    props,
    name,
    maxLength,
    placeholder,
    value,
    setValue,
    keyboardType,
    editable,
    autoFocus,
    autoCapitalize,
    placeholderTextColor,
    multiline,
    numberOfLines,
    label
}) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ width: '30%' }}>
                <Text style={{ fontFamily: FONT.MartelSansSemiBold, fontSize: SIZES.large, color: COLORS.brand.black, textAlign: 'right' }}>{label}:</Text>
            </View>

            <TextInput
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                onChangeText={(text) => setValue(text)}
                value={value}
                keyboardType={keyboardType}
                maxLength={maxLength}
                editable={editable}
                autoFocus={autoFocus}
                autoCapitalize={autoCapitalize}
                multiline={multiline}
                numberOfLines={numberOfLines}
                style={{
                    fontFamily: FONT.MartelSansSemiBold,
                    fontSize: SIZES.medium,
                    color: COLORS.brand.black,
                    marginRight: 5,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 10,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    textAlign: 'left',
                    fontSize: SIZES.font,
                    borderRadius: 5,
                    fontSize: SIZES.medium,
                    textAlignVertical: 'top',
                    alignSelf: 'center',
                    ...SHADOWS.light,
                    width: '68%'
                }}
            />
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