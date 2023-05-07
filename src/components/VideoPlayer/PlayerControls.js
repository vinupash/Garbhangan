import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import VideoBackward from '../../../assets/images/VideoBackward';
import VideoForward from '../../../assets/images/VideoForward';
import VideoPause from '../../../assets/images/VideoPause';
import VideoPlay from '../../../assets/images/VideoPlay';

const PlayerControls = props => {
    const { playing, onPlay, onPause, skipForwards, skipBackwards } = props;

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity style={styles.touchable} onPress={skipBackwards}>
                <SvgXml xml={VideoBackward} width={50} height={50} />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.touchable}
                onPress={playing ? onPause : onPlay}>
                {playing ? (
                    <SvgXml xml={VideoPause} width={50} height={50} />
                ) : (
                    <SvgXml xml={VideoPlay} width={50} height={50} />
                )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.touchable} onPress={skipForwards}>
                <SvgXml xml={VideoForward} width={50} height={50} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flex: 3,
    },
    touchable: {
        padding: 5,
    },
    touchableDisabled: {
        opacity: 0.3,
    },
});

export default PlayerControls;
