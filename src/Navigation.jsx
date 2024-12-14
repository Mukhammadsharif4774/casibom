import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTS} from './helpers/colors';
import CasibomHomeScreen from './pages/CasibomHomeScreen';
import CasibomCartScreen from './pages/CasibomCartScreen';
import CasibomCartSuccessScreen from './pages/CasibomCartSuccessScreen';
import CasibomReservationScreen from './pages/CasibomReservationScreen';
import CasibomReservationSuccessScreen from './pages/CasibomReserveSuccessScreen';
import CasibomContactsScreen from './pages/CasibomContactsScreen';
import CasibomEventsScreen from './pages/CasibomEventsScreen';
import CasibomEventDetailScreen from './pages/CasibomEventDetailScreen';
import CloseIcon from './assets/close_icon.png';
import CartIcon from './assets/cart_icon.png';
import Logo from './assets/loho.png';
import CasibomTranslationsScreen from './pages/CasibomTranslationsScreen';

const {width, height} = Dimensions.get('window');
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width,
          height,
          backgroundColor: COLORS.black,
        },
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      {drawerScreens.map(({name, component}) => (
        <Drawer.Screen key={name} name={name} component={component} />
      ))}
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  const navigation = useNavigation();

  const drawerItems = [
    {label: 'ГЛАВНАЯ', screen: 'CasibomHomeScreen'},
    {label: 'КОРЗИНА', screen: 'CasibomCartScreen'},
    {label: 'ТРАНСЛЯЦИИ', screen: 'CasibomTranslationsScreen'},
    {label: 'КОНТАКТЫ', screen: 'CasibomContactsScreen'},
    {label: 'РЕЗЕРВ СТОЛИКА', screen: 'CasibomReservationScreen'},
    {label: 'СОБЫТИЯ', screen: 'CasibomEventsScreen'},
  ];

  const navigateToScreen = screen => {
    navigation.navigate('DrawerNavigator', {screen});
  };

  return (
    <View style={styles.container}>
      <View style={styles.closeIconContainer}>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <Image source={CloseIcon} style={styles.closeIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>

      <View style={styles.mainContainer}>
        {drawerItems.map(({label, screen}) => (
          <TouchableOpacity
            key={screen}
            onPress={() => navigateToScreen(screen)}
            style={
              screen === 'CasibomHomeScreen'
                ? styles.drawerItemFirst
                : styles.drawerItem
            }>
            <Text
              style={
                screen === 'CasibomHomeScreen'
                  ? styles.itemTextFirst
                  : styles.itemText
              }>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={() => navigateToScreen('CasibomCartScreen')}>
        <Image source={CartIcon} style={styles.cartIcon} />
      </TouchableOpacity>
    </View>
  );
}

const drawerScreens = [
  {name: 'CasibomHomeScreen', component: CasibomHomeScreen},
  {name: 'CasibomCartScreen', component: CasibomCartScreen},
  {name: 'CasibomCartSuccessScreen', component: CasibomCartSuccessScreen},
  {name: 'CasibomReservationScreen', component: CasibomReservationScreen},
  {
    name: 'CasibomReservationSuccessScreen',
    component: CasibomReservationSuccessScreen,
  },
  {name: 'CasibomContactsScreen', component: CasibomContactsScreen},
  {name: 'CasibomEventsScreen', component: CasibomEventsScreen},
  {name: 'CasibomEventDetailScreen', component: CasibomEventDetailScreen},
  {name: 'CasibomTranslationsScreen', component: CasibomTranslationsScreen},
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60,
    height: height,
    width: width,
  },
  closeIconContainer: {
    position: 'absolute',
    left: 20,
    bottom: 40,
  },
  closeIcon: {
    width: 25,
    height: 25,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: COLORS.black,
    marginTop: 40,
  },
  logo: {
    width: width * 0.8,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  mainContainer: {
    marginTop: 40,
    alignItems: 'center',
    width: width,
  },
  drawerItemFirst: {
    justifyContent: 'center',
    width: '75%',
    marginTop: 15,
    backgroundColor: COLORS.main,
    paddingVertical: 10,
    borderRadius: 25,
  },
  drawerItem: {
    justifyContent: 'center',
    width: '75%',
    marginTop: 15,
    backgroundColor: COLORS.black,
    paddingVertical: 10,
    borderWidth: 4,
    borderColor: COLORS.main,
    borderRadius: 25,
  },
  itemText: {
    fontSize: 23,
    fontFamily: FONTS.black,
    color: COLORS.white,
    textAlign: 'center',
  },
  itemTextFirst: {
    fontSize: 23,
    fontFamily: FONTS.black,
    color: COLORS.white,
    textAlign: 'center',
  },
  cartIcon: {
    width: 60,
    height: 70,
    alignSelf: 'center',
    objectFit: 'contain',
    position: 'absolute',
    top: 100,
  },
});
