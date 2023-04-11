import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const GarbhaSanskarScreen = ({ navigation }) => {
    return (
        <View>
            <Text>GarbhaSanskarScreen</Text>
            <Text onPress={() => navigation.navigate('GarbhaSanskarStack', { screen: 'LanguageScreen' })}>Language</Text>
        </View>
    )
}

export default GarbhaSanskarScreen

const styles = StyleSheet.create({})