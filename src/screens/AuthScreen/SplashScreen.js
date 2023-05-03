import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ImageBackground, StatusBar, SafeAreaView, Animated, ScrollView, Keyboard, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS, assets } from '../../constants'
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import FastImage from 'react-native-fast-image';
import welcomImage from './../../../assets/images/welcome_img.gif'

const SplashScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar
                barStyle='light-content'
                backgroundColor={COLORS.brand.primary}
            />
            <FastImage
                style={{ width: '100%', height: '100%' }}
                source={welcomImage}
                resizeMode={FastImage.resizeMode.cover}
            />
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({

})