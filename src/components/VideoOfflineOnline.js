import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { COLORS, SHADOWS } from '../constants/theme';
import { SvgXml } from 'react-native-svg';
import WifiOff from '../../assets/images/WifiOff';
import WifiOn from '../../assets/images/WifiOn';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function VideoOfflineOnline({
    selectionMode,
    option1,
    option2,
    onSelectSwitch,
}) {
    const [getSelectionMode, setSelectionMode] = useState(selectionMode);

    const updateSwitchData = value => {
        setSelectionMode(value);
        onSelectSwitch(value);
    };

    return (
        <View style={{
            alignItems: 'center',
            flexDirection: 'row',
        }}>
            <TouchableOpacity
                activeOpacity={0.98}
                style={{
                    width: windowWidth >= 1280 ? 60 : 50,
                    height: windowWidth >= 1280 ? 60 : 50,
                    borderTopLeftRadius: windowWidth >= 1280 ? 60 / 2 : 50 / 2,
                    borderBottomLeftRadius: windowWidth >= 1280 ? 60 / 2 : 50 / 2,
                    ...SHADOWS.light,
                    backgroundColor: getSelectionMode == 1 ? "#F5DDC1" : '#FFF7EF',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onPress={() => updateSwitchData(1)}
            >
                <SvgXml xml={WifiOff} height={40} width={40} />
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.98}
                style={{
                    width: windowWidth >= 1280 ? 60 : 50,
                    height: windowWidth >= 1280 ? 60 : 50,
                    borderTopRightRadius: windowWidth >= 1280 ? 60 / 2 : 50 / 2,
                    borderBottomRightRadius: windowWidth >= 1280 ? 60 / 2 : 50 / 2,
                    ...SHADOWS.light,
                    backgroundColor: getSelectionMode == 2 ? "#F5DDC1" : '#FFF7EF',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onPress={() => updateSwitchData(2)}
            >
                <SvgXml xml={WifiOn} height={40} width={40} />
            </TouchableOpacity>
        </View>
    );
}