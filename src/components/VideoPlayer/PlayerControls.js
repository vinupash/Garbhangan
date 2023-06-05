import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SvgXml } from 'react-native-svg';
import VideoBackward from '../../../assets/images/VideoBackward';
import VideoForward from '../../../assets/images/VideoForward';
import VideoPause from '../../../assets/images/VideoPause';
import VideoPlay from '../../../assets/images/VideoPlay';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const PlayerControls = props => {
    const { playing, onPlay, onPause, skipForwards, skipBackwards } = props;

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity style={styles.touchable} onPress={skipBackwards}>
                <SvgXml xml={VideoBackward} width={windowWidth >= 1280 ? 60 : 30} height={windowWidth >= 1280 ? 60 : 30} />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.touchable}
                onPress={playing ? onPause : onPlay}>
                {playing ? (
                    <SvgXml xml={VideoPause} width={windowWidth >= 1280 ? 80 : 30} height={windowWidth >= 1280 ? 80 : 30} />
                ) : (
                    <SvgXml xml={VideoPlay} width={windowWidth >= 1280 ? 80 : 30} height={windowWidth >= 1280 ? 80 : 30} />
                )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.touchable} onPress={skipForwards}>
                <SvgXml xml={VideoForward} width={windowWidth >= 1280 ? 60 : 30} height={windowWidth >= 1280 ? 60 : 30} />
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
