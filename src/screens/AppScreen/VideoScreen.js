import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import Video from 'react-native-video';

const VideoScreen = ({ navigation, route }) => {
    console.log(route.params.videoDetails);
    // console.log(windowHeight);
    return (
        <View style={styles.container}>
            <View style={styles.videoSection}>
                {/* <VideoPlayer /> */}
                <Video
                    // ref={videoRef}
                    source={{
                        uri:
                            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                    }}
                    style={styles.video}
                // controls={false}
                // resizeMode={'contain'}
                // onLoad={onLoadEnd}
                // onProgress={onProgress}
                // onEnd={onEnd}
                // paused={!play}
                // muted={true}
                />
            </View>
            <View style={styles.videoScrollSection}>
                <Text>VideoScreen</Text>
            </View>
        </View>
    )
}

export default VideoScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.brand.black,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    videoSection: {
        height: windowHeight - 180,
        width: '100%',
        // backgroundColor: 'red'
    },
    videoScrollSection: {
        height: 180,
        width: '100%',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        backgroundColor: COLORS.brand.background
    },
    video: {
        height: windowHeight - 180,
        width: windowWidth - 100,
        backgroundColor: 'black',
    },
})