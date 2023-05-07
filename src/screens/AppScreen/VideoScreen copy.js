import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
import { COLORS, FONT, SHADOWS, SIZES, assets } from '../../constants';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import Video from 'react-native-video';
import { SvgXml } from 'react-native-svg';
import FullScreenOpenIcon from '../../../assets/images/FullScreenOpenIcon';
import PlayerControls from '../../components/VideoPlayer/PlayerControls';
import ProgressBar from '../../components/VideoPlayer/ProgressBar';
import FullScreenCloseIcon from '../../../assets/images/FullScreenCloseIcon';
import MuteIcon from '../../../assets/images/MuteIcon';
import UnmuteIcon from '../../../assets/images/UnmuteIcon';
import BackIcon from '../../../assets/images/BackIcon';
import BackWhiteIcon from '../../../assets/images/BackWhiteIcon';
import { useIsFocused } from '@react-navigation/native';
import VideoListData from '../../components/VideoListData';

const VideoScreen = ({ navigation, route }) => {
    // console.log(route.params.videoDetails);
    const [isVisible, setIsVisible] = useState(false);
    const videoRef = React.createRef();
    const [isVideoList, setVideoList] = useState([]);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [play, setPlay] = useState(true);
    const [showControl, setShowControl] = useState(true);
    const [isMute, setMute] = useState(false);
    const isFocused = useIsFocused()
    const [isVideoLink, setVideoLink] = useState('');
    const [selectedTitle, setSelectedTitle] = useState('');
    // console.log('isVideoList', isVideoList);

    useEffect(() => {
        setVideoList(route.params.videoDetails.options)
    }, [isFocused])

    const options = [
        {
            key: 1,
            title: 'Most High Pay',
        },
        {
            key: 2,
            title: 'Most Perfomance',
        },
        {
            key: 3,
            title: 'A - Z',
        },
        {
            key: 4,
            title: 'Z - A bc',
        },
        {
            key: 5,
            title: 'Most High Pay',
        },
        {
            key: 6,
            title: 'Most Perfomance',
        },
        {
            key: 7,
            title: 'A - Z',
        },
        {
            key: 8,
            title: 'Z - A bc',
        },
    ];

    const handleFullscreen = () => {
        setIsVisible(!isVisible);
    }

    const handleMute = () => {
        setMute(!isMute)
    };

    const handlePlayPause = () => {
        if (play) {
            setPlay(false);
            setShowControl(true);
            return;
        }
        setTimeout(() => setShowControl(false), 2000);
        setPlay(true);
    };

    const handlePlay = () => {
        setTimeout(() => setShowControl(false), 500);
        setPlay(true);
    };

    const skipBackward = () => {
        videoRef.current.seek(currentTime - 15);
        setCurrentTime(currentTime - 15);
    };

    const skipForward = () => {
        videoRef.current.seek(currentTime + 15);
        setCurrentTime(currentTime + 15);
    };

    const handleControls = () => {
        if (showControl) {
            setShowControl(false);
        } else {
            setShowControl(true);
        }
    };

    const onLoadEnd = data => {
        setDuration(data.duration);
        setCurrentTime(data.currentTime);
    };

    const onProgress = data => {
        setCurrentTime(data.currentTime);
    };

    const onSeek = data => {
        videoRef.current.seek(data.seekTime);
        setCurrentTime(data.seekTime);
    };

    const onEnd = () => {
        setPlay(false);
        videoRef.current.seek(0);
    };

    // const VideoListData = ({ }) => {
    //     return options.map((VideoInfoData, i) => {
    //         return (
    //             <View style={styles.boxContent} key={i}>
    //                 <TouchableOpacity
    //                     activeOpacity={0.98}
    //                     style={styles.sectionBtn}
    //                 >
    //                     <View style={[styles.loginBtnInner]}>

    //                     </View>
    //                     <View style={{ height: 30, justifyContent: 'center', alignItems: 'center' }}>
    //                         <Text style={[styles.btnText]}>{VideoInfoData.title}</Text>
    //                     </View>
    //                 </TouchableOpacity>
    //             </View>
    //         )
    //     })
    // }

    const data = [
        { title: 'Title 1', content: 'Content 1' },
        { title: 'Title 2', content: 'Content 2' },
        { title: 'Title 3', content: 'Content 3' },
        { title: 'Title 1', content: 'Content 1' },
        { title: 'Title 2', content: 'Content 2' },
        { title: 'Title 3', content: 'Content 3' },
        { title: 'Title 1', content: 'Content 1' },
        { title: 'Title 2', content: 'Content 2' },
        { title: 'Title 3', content: 'Content 3' },
    ];

    const handleTitlePress = (title) => {
        console.log('Title Pressed:', title);
        setSelectedTitle(title);
    };

    const handleAnotherFunction = (title) => {
        console.log('Another Function Pressed:', title);
        // Perform another function with the title value
    };

    // console.log(selectedTitle);

    return (
        <View style={styles.container}>
            <View style={[styles.videoSection, { height: isVisible ? windowHeight - 180 : windowHeight, }]}>
                <TouchableOpacity onPress={handleControls}>
                    <>
                        <Video
                            ref={videoRef}
                            source={{
                                uri:
                                    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                            }}
                            style={[styles.video, { height: isVisible ? windowHeight - 180 : windowHeight }]}
                            controls={false}
                            resizeMode={'contain'}
                            onLoad={onLoadEnd}
                            onProgress={onProgress}
                            onEnd={onEnd}
                            paused={!play}
                            muted={isMute}
                        />

                        {showControl && (
                            <View style={styles.controlOverlay}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: windowWidth - 30, marginTop: 10, alignSelf: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        onPress={() => navigation.goBack()}
                                    >
                                        <SvgXml xml={BackWhiteIcon} width={40} height={40} />
                                    </TouchableOpacity>

                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity
                                            onPress={handleMute}
                                            style={{ marginRight: 20 }}
                                        >
                                            <SvgXml xml={!isMute ? UnmuteIcon : MuteIcon} width={60} height={60} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={handleFullscreen}
                                        >
                                            <SvgXml xml={isVisible ? FullScreenOpenIcon : FullScreenCloseIcon} width={50} height={50} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <PlayerControls
                                    onPlay={handlePlay}
                                    onPause={handlePlayPause}
                                    playing={play}
                                    skipBackwards={skipBackward}
                                    skipForwards={skipForward}
                                />

                                <ProgressBar
                                    currentTime={currentTime}
                                    duration={duration > 0 ? duration : 0}
                                    onSlideStart={handlePlayPause}
                                    onSlideComplete={handlePlayPause}
                                    onSlideCapture={onSeek}
                                />
                            </View>
                        )}
                    </>
                </TouchableOpacity>
            </View>

            {
                isVisible && <ImageBackground
                    source={assets.ParkElement} style={[styles.videoScrollSection]}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{ width: '100%', height: '100%' }}
                    >
                        {/* <VideoListData
                            data={options}
                        /> */}
                        <View style={{ flexDirection: 'row' }}>
                            {data.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => handleTitlePress(item.title)}
                                    onLongPress={() => handleAnotherFunction(item.title)}
                                    activeOpacity={0.98}
                                    style={styles.sectionBtn}
                                >
                                    {/* <Text>{item.title}</Text> */}
                                    <View style={[styles.loginBtnInner]}>

                                    </View>
                                    <View style={{ height: 30, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.btnText]}>{item.title}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                            {/* {selectedTitle ? (
                                <Text>You selected: {selectedTitle}</Text>
                            ) : null} */}
                        </View>
                    </ScrollView>
                </ImageBackground>
            }

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
        // height: windowHeight - 180,
        width: '100%',
        // backgroundColor: 'red'
    },
    videoScrollSection: {
        height: 180,
        width: '100%',
        backgroundColor: COLORS.brand.background,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover',
    },
    video: {
        backgroundColor: 'black',
        alignItems: 'center'
    },
    controlOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#000000c4',
        justifyContent: 'space-between',
        height: '100%',
        width: '100%'
    },
    videoSection: {
        width: windowWidth - 50,
        alignSelf: 'center'
    },
    boxContent: {
        width: 180,
        height: 140,
        marginHorizontal: 10,
        marginTop: 8,
        borderRadius: 10,
        ...SHADOWS.light,
        backgroundColor: '#FFFFFF'
    },
    loginBtnInner: {
        width: 180,
        height: 110,
        borderRadius: 10,
        backgroundColor: COLORS.brand.primary
    },
    btnText: {
        fontFamily: FONT.Charlatan,
        fontSize: SIZES.small,
        color: COLORS.brand.black
    },
    sectionBtn: {
        backgroundColor: '#FFFFFF',
        width: 180,
        height: 140,
        borderRadius: 10,
        marginHorizontal: 5,
        marginTop: 8,
        ...SHADOWS.light
    }
})