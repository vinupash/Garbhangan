import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native'
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import Video from 'react-native-video';
const VideoPlayer = () => {
    // console.log(windowHeight - 180);
    return (
        <View>
            <Video
                // ref={videoRef}
                source={{
                    uri:
                        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                }}
            // style={fullscreen ? styles.fullscreenVideo : styles.video}
            // controls={false}
            // resizeMode={'contain'}
            // onLoad={onLoadEnd}
            // onProgress={onProgress}
            // onEnd={onEnd}
            // paused={!play}
            // muted={true}
            />

        </View>
    )
}

export default VideoPlayer

const styles = StyleSheet.create({})