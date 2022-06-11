import 'react-native-url-polyfill/auto'
import { useState, useEffect, useLayoutEffect } from 'react'
import HomeIcon from 'react-native-vector-icons/AntDesign';
import OffIcon from 'react-native-vector-icons/FontAwesome';
import { Button, Alert } from 'react-native';
import { supabase } from '../lib/supabase'
import Auth from '../components/Auth'
import Account from '../components/Account'
import { View } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ServiceDetails from '../components/ServiceDetails';
import Loader from '../common/Loader';
import Onboarding from '../components/Onboarding';
import Profile from '../components/Profile';
import Webview from '../components/Webview';
import OrderIcon from 'react-native-vector-icons/MaterialCommunityIcons';
export default function AppNavigation() {
  const Stack = createNativeStackNavigator();
  const Tabs = createBottomTabNavigator();
  const [session, setSession] = useState<Session | null>(null)
  const [userDetails, setUserDetails] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  useLayoutEffect(() => {
    setLoading(true);
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    setLoading(false);
  }, [])
  const logoutAlert = (navigation) =>
    Alert.alert(
      "Logout",
      "are you sure?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Logout", onPress: () => logout(navigation) }
      ]
    );
  const logout = (navigation) => {
    // navigation.navigate('Profile');
    // supabase.auth.signOut()
  }
  const BottomTabs = () => {
    return (
      <Tabs.Navigator screenOptions={{ headerShown: false }} initialRouteName='Home'>
        <Tabs.Screen name='Home' component={Account}   options={{ tabBarShowLabel: false, tabBarIcon: ({ focused }) => (<HomeIcon name='home' color={focused ? '#651fff' : '#242526'} size={30} />), }} />
        <Tabs.Screen name='Profile' component={Profile} options={{ tabBarShowLabel: false,tabBarIcon: ({ focused }) => (<OrderIcon name='card-account-details-outline' color={focused ? '#651fff' : '#242526'} size={30} />), }} />
      </Tabs.Navigator>
    );
  }
  return (
    <NavigationContainer>
      {!loading && session && session.user && (
        <>
          {console.log('session exist')}
          <Stack.Navigator initialRouteName='MainNavigationScreen'>
            <Stack.Screen name='MainNavigationScreen' component={BottomTabs} 
             options={({ navigation }) => ({
              headerShown: true, headerTitleAlign: 'center' ,headerTitle: 'ContrucTech',
              headerTintColor: '#651fff',
              headerRight: () => (
                <OffIcon name='user-circle' color='#651fff' size={30} onPress={() => navigation.navigate('Profile')}/>
              ),
            })} />
            <Stack.Screen name='Onboarding' component={Onboarding} options={{ headerShown: false }} />
            <Stack.Screen name='Webview' options={{ headerShown: true, headerTitle: 'Edit Profile', headerTintColor: '#2196F3', headerShadowVisible: true, headerStyle: { backgroundColor: '#FFFFFF' } }}>{props => <Webview {...props} />}</Stack.Screen>
            <Stack.Screen name='PackageDetails' options={{ headerShown: true, headerTitle: 'Package', headerTintColor: '#2196F3', headerShadowVisible: true, headerStyle: { backgroundColor: '#FFFFFF' } }}>{props => <ServiceDetails {...props} />}</Stack.Screen>
          </Stack.Navigator>
        </>
      )}
      {loading && !session && (
        <>
          {console.log('loading')}
          <Loader />
        </>
      )}
      {!session && (
        <>
          {console.log('no session')}
          <Stack.Navigator initialRouteName='LoginScreen'>
            {/* <Stack.Screen name='OnboardingProducts' component={OnboardingProducts} options={{headerShown: false}} /> */}
            <Stack.Screen name='LoginScreen' component={Auth} options={{ headerShown: false }} />
            <Stack.Screen name='NoSessionWebview' options={{ headerShown: false }}>{props => <Webview {...props} />}</Stack.Screen>
            {/* <Stack.Screen name='Package' component={OnboardingFormTwo} options={{headerShown: false}} /> */}

          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  )
}