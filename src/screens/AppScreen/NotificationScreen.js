import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SvgXml } from 'react-native-svg';
import LogoIcon from '../../../assets/images/LogoIcon';
import BackIcon from '../../../assets/images/BackIcon';
import ChildIcon from '../../../assets/images/ChildIcon';
import { COLORS, SIZES, FONT, SHADOWS } from '../../constants';
import WomenIcon from '../../../assets/images/WomenIcon';
import Pointer from '../../../assets/images/Pointer';
import { BackIconSecton, KidStackSection, WomenStackSection } from '../../components/CustomButtons';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const NotificationScreen = ({ navigation }) => {
  const iamges = [LogoIcon, LogoIcon, LogoIcon];
  const [indexImage, setIndexImage] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndexImage((indexImage + 1) % iamges.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [indexImage]);

  // const WomenStackSection = ({ onPress }) => {
  //   return (
  //     <TouchableOpacity
  //       activeOpacity={0.98}
  //       style={{
  //         width: 50,
  //         height: 50,
  //         borderTopLeftRadius: 50 / 2,
  //         borderBottomLeftRadius: 50 / 2,
  //         ...SHADOWS.light,
  //         backgroundColor: '#FFF7EF',
  //         justifyContent: 'center',
  //         alignItems: 'center'
  //       }}
  //       onPress={onPress}
  //     >
  //       <SvgXml xml={WomenIcon} height={40} width={40} />
  //     </TouchableOpacity>
  //   )
  // }

  // const KidStackSection = ({ onPress }) => {
  //   return (
  //     <TouchableOpacity
  //       activeOpacity={0.98}
  //       style={{
  //         width: 50,
  //         height: 50,
  //         borderTopRightRadius: 50 / 2,
  //         borderBottomRightRadius: 50 / 2,
  //         ...SHADOWS.light,
  //         backgroundColor: '#FFF7EF',
  //         justifyContent: 'center',
  //         alignItems: 'center'
  //       }}
  //       onPress={onPress}
  //     >
  //       <SvgXml xml={ChildIcon} height={40} width={40} />
  //     </TouchableOpacity>
  //   )
  // }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle='light-content'
        backgroundColor={COLORS.brand.primary}
      />

      <View style={styles.headerBox}>
        <BackIconSecton
          onPress={() => navigation.goBack()}
          title='Notifications'
        />

        <SvgXml xml={iamges[indexImage]} width={132} height={73} />
        <View style={styles.menuBox}>
          <View style={{
            alignItems: 'center',
            flexDirection: 'row',
          }}>
            <WomenStackSection
              onPress={() => navigation.navigate('WomenNavigationsStack', { screen: 'WomenScreen' })}
            />
            <KidStackSection
              onPress={() => navigation.navigate('KidNavigationsStack', { screen: 'KidScreen' })}
            />
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.notificationBox}
      >

        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <SvgXml xml={Pointer} width={32} height={26} style={{ marginRight: 20 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: FONT.MartelSansSemiBold, fontSize: SIZES.large, color: COLORS.brand.black }}>Couldn't complete the ‘Learn’ section backup. Try again Couldn't complete the ‘Learn’ section backup. Try again Couldn't complete the ‘Learn’ section backup. Try again Couldn't complete the ‘Learn’ section backup. Try again</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <SvgXml xml={Pointer} width={32} height={26} style={{ marginRight: 20 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: FONT.MartelSansSemiBold, fontSize: SIZES.large, color: COLORS.brand.black }}>Couldn't complete the ‘Learn’ section backup. Try again Couldn't complete the ‘Learn’ section backup. Try again Couldn't complete the ‘Learn’ section backup. Try again Couldn't complete the ‘Learn’ section backup. Try again</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <SvgXml xml={Pointer} width={32} height={26} style={{ marginRight: 20 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: FONT.MartelSansSemiBold, fontSize: SIZES.large, color: COLORS.brand.black }}>Couldn't complete the ‘Learn’ section backup. Try again Couldn't complete the ‘Learn’ section backup. Try again Couldn't complete the ‘Learn’ section backup. Try again Couldn't complete the ‘Learn’ section backup. Try again</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <SvgXml xml={Pointer} width={32} height={26} style={{ marginRight: 20 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: FONT.MartelSansSemiBold, fontSize: SIZES.large, color: COLORS.brand.black }}>Couldn't complete the ‘Learn’ section backup. Try again Couldn't complete the ‘Learn’ section backup. Try again Couldn't complete the ‘Learn’ section backup. Try again Couldn't complete the ‘Learn’ section backup. Try again</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <SvgXml xml={Pointer} width={32} height={26} style={{ marginRight: 20 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: FONT.MartelSansSemiBold, fontSize: SIZES.large, color: COLORS.brand.black }}>Couldn't complete the ‘Learn’ section backup. Try again Couldn't complete the ‘Learn’ section backup. Try again Couldn't complete the ‘Learn’ section backup. Try again Couldn't complete the ‘Learn’ section backup. Try again</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <SvgXml xml={Pointer} width={32} height={26} style={{ marginRight: 20 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: FONT.MartelSansSemiBold, fontSize: SIZES.large, color: COLORS.brand.black }}>Couldn't complete the ‘Learn’ section backup. Try again Couldn't complete the ‘Learn’ section backup. Try again Couldn't complete the ‘Learn’ section backup. Try again Couldn't complete the ‘Learn’ section backup. Try again</Text>
          </View>
        </View>
        {/* <View style={styles.notificationBox}>

          
        </View> */}
      </ScrollView>
    </SafeAreaView>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.brand.background
  },
  headerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: windowWidth - 50,
    alignSelf: 'center',
    marginTop: 10,
    height: 75,
  },
  menuBox: {
    width: 360,
    alignItems: 'flex-end',
  },
  notificationBox: {
    width: windowWidth - 100,
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: '#FFF7EF',
    ...SHADOWS.light,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 20,
    flex: 1
  }
})