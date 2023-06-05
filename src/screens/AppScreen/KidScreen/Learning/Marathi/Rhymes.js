// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, Dimensions, ScrollView, ImageBackground, Image } from 'react-native';
// import { SvgXml } from 'react-native-svg';
// import LanguageTab from '../../../../../components/LanguageTab';
// import BackIcon from '../../../../../../assets/images/BackIcon';

// import RadioButtonBoxValue from '../../../../../components/RadioButtonBoxValue';
// import LogoIcon from '../../../../../../assets/images/LogoIcon';
// import VideoTab from '../../../../../components/VideoTab';
// import { COLORS, assets } from '../../../../../constants';
// import { BackIconSecton } from '../../../../../components/CustomButtons';
// const windowHeight = Dimensions.get('window').height;
// const windowWidth = Dimensions.get('window').width;
// import BoardEng from '../../../../../../assets/images/Board-Eng.png'
// import BoardHin from '../../../../../../assets/images/Board-Hin.png'
// import BoardMar from '../../../../../../assets/images/Board-Mar.png'
// import VideoOfflineOnline from '../../../../../components/VideoOfflineOnline';

// const Rhymes = ({ navigation }) => {
//     const texts = ['Shikshan, Aaichya Savalitla...', 'शिक्षण, आईच्या सावलीतल...', 'सिख, मां की छाव में...'];
//     const iamges = [BoardEng, BoardHin, BoardMar];
//     const [index, setIndex] = useState(0);
//     const [indexImage, setIndexImage] = useState(0);
//     const [isVideoOfflineOnline, setVideoOfflineOnline] = useState(1);

//     const onSelectSwitch = value => {
//         setVideoOfflineOnline(value);
//     };

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setIndex((index + 1) % texts.length);
//         }, 5000);

//         return () => clearInterval(interval);
//     }, [index]);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setIndexImage((indexImage + 1) % iamges.length);
//         }, 5000);

//         return () => clearInterval(interval);
//     }, [indexImage]);

//     const options = [
//         {
//             key: 1,
//             title: 'Most High Pay',
//         },
//         {
//             key: 2,
//             title: 'Most Perfomance',
//         },
//         {
//             key: 3,
//             title: 'A - Z',
//         },
//         {
//             key: 4,
//             title: 'Z - A bc',
//         },
//     ];


//     const OfflineVideo = () => {
//         return (
//             <>
//                 <VideoTab
//                     data={options}
//                     onPress={() => navigation.navigate('VideoScreenKid',
//                         {
//                             videoDetails: {
//                                 id: 'jane',
//                                 firstName: 'Jane',
//                                 lastName: 'Done',
//                                 age: 25,
//                                 options: options
//                             },
//                         }
//                     )}
//                 />
//             </>
//         )
//     }

//     const OnlineVideo = () => {
//         return (
//             <>
//                 <VideoTab
//                     data={options}
//                     onPress={() => navigation.navigate('VideoScreenKid',
//                         {
//                             videoDetails: {
//                                 id: 'jane',
//                                 firstName: 'Jane',
//                                 lastName: 'Done',
//                                 age: 25,
//                                 options: options
//                             },
//                         }
//                     )}
//                 />
//             </>
//         )
//     }

//     return (
//         <SafeAreaView style={styles.container}>
//             <StatusBar
//                 barStyle='light-content'
//                 backgroundColor={COLORS.brand.primary}
//             />
//             <ImageBackground
//                 source={assets.ParkElement}
//                 style={{ width: windowWidth, height: '100%', resizeMode: 'cover', position: 'relative' }}
//             >
//                 <View style={{ flexDirection: 'column', justifyContent: 'space-between', height: '100%', alignItems: 'center' }}>
//                     <View style={styles.headerBox}>
//                         <BackIconSecton
//                             onPress={() => navigation.goBack()}
//                             title='Rhymes'
//                         />
//                         <Image source={iamges[indexImage]} style={{ width: windowWidth >= 1280 ? 350 : 174, alignSelf: 'center', height: windowWidth >= 1280 ? 170 : 80 }} />
//                         <View style={styles.menuBox}>
//                             {/* <Text style={styles.titleText}></Text> */}
//                             <VideoOfflineOnline
//                                 selectionMode={1}
//                                 onSelectSwitch={onSelectSwitch}
//                             />
//                         </View>
//                     </View>
//                     <ScrollView
//                         showsVerticalScrollIndicator={false}
//                         style={{ width: '100%', height: '100%' }}
//                     >

//                         {isVideoOfflineOnline == 1 && <OfflineVideo />}
//                         {isVideoOfflineOnline == 2 && <OnlineVideo />}

//                     </ScrollView>
//                 </View>
//             </ImageBackground>
//         </SafeAreaView>
//     )
// }

// export default Rhymes

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: COLORS.brand.background,
//     },
//     headerBox: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         width: windowWidth - 30,
//         alignSelf: 'center',
//         marginBottom: 10,
//         // height: 75,
//     },
//     menuBox: {
//         width: 360,
//         alignItems: 'flex-end',
//     },

// })

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, Dimensions, ScrollView, ImageBackground, Image } from 'react-native';
import { COLORS, SHADOWS, assets, FONT, SIZES } from '../../../../../constants';
import { BackIconSecton } from '../../../../../components/CustomButtons';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import BoardEng from '../../../../../../assets/images/Board-Eng.png'
import BoardHin from '../../../../../../assets/images/Board-Hin.png'
import BoardMar from '../../../../../../assets/images/Board-Mar.png'
import VideoOfflineOnline from '../../../../../components/VideoOfflineOnline';
import ChandobaChandoba from '../../../../../../assets/images/videos/Marathi/Rhymes/Chandoba-Chandoba.jpg'
import ChivChivChimani from '../../../../../../assets/images/videos/Marathi/Rhymes/Chiv-Chiv-chimani.jpg'
import LahanMaziBahuli from '../../../../../../assets/images/videos/Marathi/Rhymes/lahan-mazi-bahuli.jpg'
import MamachyaGvala from '../../../../../../assets/images/videos/Marathi/Rhymes/mamachya-gavala.jpg'
import NachReMora from '../../../../../../assets/images/videos/Marathi/Rhymes/Nach-Re-Mora.jpg'
import YereYerePausa from '../../../../../../assets/images/videos/Marathi/Rhymes/Yere-Yere-Pausa.jpg'

const Rhymes = ({ navigation }) => {
    const texts = ['Shikshan, Aaichya Savalitla...', 'शिक्षण, आईच्या सावलीतल...', 'सिख, मां की छाव में...'];
    const iamges = [BoardEng, BoardHin, BoardMar];
    const [index, setIndex] = useState(0);
    const [indexImage, setIndexImage] = useState(0);
    const [isVideoOfflineOnline, setVideoOfflineOnline] = useState(1);

    const onSelectSwitch = value => {
        setVideoOfflineOnline(value);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((index + 1) % texts.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [index]);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndexImage((indexImage + 1) % iamges.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [indexImage]);

    const options = [
        {
            key: 1,
            title: 'चांदोबा चांदोबा',
            poster: ChandobaChandoba,
            video: 1
        },
        {
            key: 2,
            title: 'चिव चिव चिमणी',
            poster: ChivChivChimani,
            video: 2
        },
        {
            key: 3,
            title: 'लहान माझी बाहुली',
            poster: LahanMaziBahuli,
            video: 3
        },
        {
            key: 4,
            title: 'मामाच्या गावाला',
            poster: MamachyaGvala,
            video: 4
        },
        {
            key: 5,
            title: 'नच रे मोरा',
            poster: NachReMora,
            video: 5
        },
        {
            key: 6,
            title: 'येरे येरे पाउसा',
            poster: YereYerePausa,
            video: 6
        }
    ];

    const OfflineVideoData = () => {
        return options.map((OfflineVideoInfo, i) => {
            return (
                <View style={styles.boxContent} key={i}>
                    <TouchableOpacity
                        activeOpacity={0.98}
                        style={styles.sectionBtn}
                        onPress={() => navigation.navigate('MarathiLearningStack', {
                            screen: 'VideoScreenMarathiRhyme',
                            params: { video: OfflineVideoInfo.video },
                        })}
                    >
                        <View style={[styles.loginBtnInner]}>
                            <Image
                                source={OfflineVideoInfo.poster}
                                style={{
                                    width: '100%',
                                    height: 250,
                                    borderRadius: 16,
                                }}
                            />
                        </View>
                        <View style={{ height: 40, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.btnText]}>{OfflineVideoInfo.title}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        })
    }

    const OfflineVideo = () => {
        return (
            <>
                <View style={styles.videoSection}>
                    {OfflineVideoData()}
                </View>
            </>
        )
    }

    const OnlineVideo = () => {
        return (
            <>
                <Text>Online video</Text>
            </>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='light-content'
                backgroundColor={COLORS.brand.primary}
            />
            <ImageBackground
                source={assets.ParkElement}
                style={{ width: windowWidth, height: '100%', resizeMode: 'cover', position: 'relative' }}
            >
                <View style={{ flexDirection: 'column', justifyContent: 'space-between', height: '100%', alignItems: 'center' }}>
                    <View style={styles.headerBox}>
                        <BackIconSecton
                            onPress={() => navigation.goBack()}
                            title='यमक'
                        />
                        <Image source={iamges[indexImage]} style={{ width: windowWidth >= 1280 ? 350 : 174, alignSelf: 'center', height: windowWidth >= 1280 ? 170 : 80 }} />
                        <View style={styles.menuBox}>
                            {/* <Text style={styles.titleText}></Text> */}
                            <VideoOfflineOnline
                                selectionMode={1}
                                onSelectSwitch={onSelectSwitch}
                            />
                        </View>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ width: '100%', height: '100%' }}
                    >

                        {isVideoOfflineOnline == 1 && <OfflineVideo />}
                        {isVideoOfflineOnline == 2 && <OnlineVideo />}

                    </ScrollView>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Rhymes

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.brand.background,
    },
    headerBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: windowWidth - 30,
        alignSelf: 'center',
        marginBottom: 5,
        // height: 75,
    },
    menuBox: {
        width: 360,
        alignItems: 'flex-end',
    },
    videoSection: {
        flexDirection: 'row',
        flexWrap: "wrap",
        // justifyContent: 'space-between',
        width: windowWidth - 50,
        alignSelf: 'center'
    },
    boxContent: {
        width: '33.33%',
        // marginVertical: 10,
        padding: 8
    },
    loginBtnInner: {
        width: '100%',
        height: 250,
        borderRadius: 16,
        backgroundColor: COLORS.brand.primary,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.light
    },
    btnText: {
        fontFamily: FONT.Charlatan,
        fontSize: SIZES.medium,
        color: COLORS.brand.black
    },
    sectionBtn: {
        width: '100%',
        height: 300,
        borderRadius: 16,
        backgroundColor: "#FFFFFF",
        ...SHADOWS.light,
        // marginBottom: 5,
    },
})