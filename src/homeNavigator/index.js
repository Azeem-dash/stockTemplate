import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeNavigation from './HomeNavigation';
import HomeIcon from 'react-native-vector-icons/AntDesign';
import NftIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import Icon from '../../src/components/Icons'
import {
  BLACK,
  LIGHT_WHITE,
  LIGHT_YELLOW,
  MUSTED,
  SUN_YELLOW,
} from '../constants/Colors';
import nftNavigator from './nftNavigator';

const Tab = createBottomTabNavigator();

const TabButton = props => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({
        0: {scale: 0.5, rotate: '0deg'},
        1: {scale: 1.5, rotate: '360deg'},
      });
    } else {
      viewRef.current.animate({
        0: {scale: 1.5, rotate: '360deg'},
        1: {scale: 1, rotate: '0deg'},
      });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <Icon
          type={item.type}
          name={focused ? item.activeIcon : item.inActiveIcon}
          color={focused ? MUSTED : SUN_YELLOW}
        />
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default function TabNavigation() {
  const TabArr = [
    {
      route: 'Home',
      label: 'Home',
      type: HomeIcon,
      inActiveIcon: 'home',
      activeIcon: 'home',
      component: HomeNavigation,
    },
    {
      route: 'Nfts',
      label: 'Nfts',
      type: NftIcon,
      activeIcon: 'image-multiple-outline',
      inActiveIcon: 'image-multiple-outline',
      component: nftNavigator,
    },
  ];

  return (
    <Tab.Navigator
      // screenOptions={{
      //   headerShown: false,
      //   tabBarStyle: {
      //     //  backgroundColor:MUSTED,
      //     // borderTopColor:'transparent',
      //     // justifyContent:"center",

      //     height: 60,
      //     position: 'absolute',
      //     bottom: 16,
      //     right: 16,
      //     left: 16,
      //     borderRadius: 10,
      //   },
      // }}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 16,
        },
      }}>
      {/* <Tab.Screen name="Home" component={DrawerNavigation} /> */}
      {/* <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: e => {
            return <HomeIcon name="home" size={30} color={BLACK} />;
          },
          // tabBarLabel: '',
          // tabBarActiveBackgroundColor: LIGHT_YELLOW,
          // tabBarInactiveBackgroundColor: MUSTED,
          // headerBackgroundContainerStyle:{alignSelf:'center'}
          // headerBackgroundContainerStyle:{
          //   borderRadius:100,
          //   position:'absolutes'
          // }
        }}
        name="Home"
        component={HomeNavigation}
      /> */}

      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}

      {/* <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: e => {
            return (
              <NftIcon name="image-multiple-outline" size={30} color={BLACK} />
            );
          },
          tabBarButton: props => <TabButton {...props} item={item} />,
          // tabBarLabel: '',
          // tabBarActiveBackgroundColor: LIGHT_YELLOW,
          // tabBarInactiveBackgroundColor: MUSTED,
          // headerBackgroundContainerStyle:{
          //   borderRadius:100,
          //   position:'absolutes'
          // }
        }}
        name="Nft"
        component={nftNavigator}
      /> */}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
