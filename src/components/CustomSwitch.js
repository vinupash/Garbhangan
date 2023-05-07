import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS, SHADOWS } from '../constants/theme';
import WomenIcon from '../../assets/images/WomenIcon';
import { SvgXml } from 'react-native-svg';
import ChildIcon from '../../assets/images/ChildIcon';

export default function CustomSwitch({
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
                    width: 50,
                    height: 50,
                    borderTopLeftRadius: 50 / 2,
                    borderBottomLeftRadius: 50 / 2,
                    ...SHADOWS.light,
                    backgroundColor: getSelectionMode == 1 ? "#F5DDC1" : '#FFF7EF',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onPress={() => updateSwitchData(1)}
            >
                <SvgXml xml={WomenIcon} height={40} width={40} />
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.98}
                style={{
                    width: 50,
                    height: 50,
                    borderTopRightRadius: 50 / 2,
                    borderBottomRightRadius: 50 / 2,
                    ...SHADOWS.light,
                    backgroundColor: getSelectionMode == 2 ? "#F5DDC1" : '#FFF7EF',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onPress={() => updateSwitchData(2)}
            >
                <SvgXml xml={ChildIcon} height={40} width={40} />
            </TouchableOpacity>
        </View>
    );
}