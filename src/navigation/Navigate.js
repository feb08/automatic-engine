 import * as React from 'react';
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import HomeScreen from '../screen/HomeScreen';
 import DetailScreen from '../screen/DetailScreen';
 import VeryDetailScreen from '../screen/VeryDetailScreen';
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 import Icon from 'react-native-vector-icons/MaterialIcons';
 import MyFavScreen from '../screen/MyFavScreen';
 import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
 import 'react-native-gesture-handler';
 import SeeAllScreen from '../screen/SeeAllScreen';
 import DrawerCustom from '../components/DrawerCustom';
 import ProfileScreen from '../screen/ProfileScreen';
 import NotesScreen from '../screen/NotesScreens';
 import SettingsScreen from '../screen/SettingsScreen';
 import SplashScreen from '../screen/SplashScreen';
 import Login from '../screen/BSwipeLogin';
 import Notification from '../screen/NotificationScreen';

 const Stack = createNativeStackNavigator();
 const Tab = createBottomTabNavigator();
 const Drawer = createDrawerNavigator();

 function Navigate() {
   return (
     <NavigationContainer>
       <Stack.Navigator initialRouteName='SplashScreen'>
         <Stack.Screen name='SplashScreen' component={SplashScreen} options={{ headerShown: false }}/>
         <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
         <Stack.Screen 
         name="HomeStack" 
         component={MyTabs}
         options={{ 
           headerShown: false
         }}/>
         <Stack.Screen 
         name="Detail" 
         component={DetailScreen}
         options={{
           title: 'Detail News',
           headerTitleAlign: 'center',
           headerTintColor: '#630606'
         }} />
         <Stack.Screen name="VeryDetail" component={VeryDetailScreen} />
         <Stack.Screen 
         name="SeeAllScreen" 
         component={SeeAllScreen}
         options={{
           title: ''
         }}/>
         <Stack.Screen
         name='Notification'
         component={Notification}/>
       </Stack.Navigator>
     </NavigationContainer>
   );
 }

 export function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: { backgroundColor: '#FFF', paddingBottom: 5 },
      tabBarInactiveTintColor: '#9E9394',
      tabBarActiveTintColor: '#FF3A44',
    }}>
      <Tab.Screen 
      name="HomeDrawer" 
      component={MyDrawer} 
      options={{ 
        headerShown: false,
        tabBarLabel: 'Homie',
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" color={color} size={size} />
        ),
        title: 'Home News',
        headerTitleAlign: 'center'
      }}/>
      <Tab.Screen 
      name="MyFav" 
      component={MyFavScreen}
      options={{
        tabBarLabel: 'Favorite',
        tabBarBadge: 8,
        tabBarIcon: ({ color, size }) => (
          <Icon name="favorite-border" color={color} size={size} />
        ), 
        title: 'Fav News',
        headerTitleAlign: 'center',
        headerTintColor: '#ED555D',
        headerStyle: {
          backgroundColor: '#FFF', 
        }
      }} />
    </Tab.Navigator>
  );
}

export function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={
      props => <DrawerCustom {...props}/>}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#FF3A44',
        drawerActiveTintColor: '#FFF',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          //fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
        }}>
      <Drawer.Screen 
      name="Homie" 
      component={HomeScreen}
      options={{
        // title: 'Home News',
        // headerTitleAlign: 'center'
        drawerIcon: ({color}) => (
          <Icon name='menu-book' color={color} size={22}/>
        )
      }} />
      <Drawer.Screen name='Profile' component={ProfileScreen} options={{
        drawerIcon: ({color}) => (
          <Icon name='person' color={color} size={22}/>
        )
      }}/>
      <Drawer.Screen name='Notes' component={NotesScreen} options={{
        drawerIcon: ({color}) => (
          <Icon name='description' color={color} size={22}/>
        )
      }}/>
      <Drawer.Screen name='Settings' component={SettingsScreen} options={{
        drawerIcon: ({color}) => (
          <Icon name='settings' color={color} size={22}/>
        )
      }}/>
    </Drawer.Navigator>
  );
}
 
 export default Navigate;