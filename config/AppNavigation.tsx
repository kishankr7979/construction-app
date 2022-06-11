import 'react-native-url-polyfill/auto'
import { useState, useEffect, useLayoutEffect } from 'react'
import HomeIcon from 'react-native-vector-icons/AntDesign';
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
  const createTwoButtonAlert = () =>
    Alert.alert(
      "Logout",
      "are you sure?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Logout", onPress: () => logout() }
      ]
    );
  const logout = () => {
    supabase.auth.signOut()
  }
  const BottomTabs = () => {
    return (
      <Tabs.Navigator screenOptions={{ headerShown: false }} initialRouteName='Home'>
        <Tabs.Screen name='Home' component={Account} options={{ tabBarIcon: ({ color }) => (<HomeIcon name='home' color='#2196F3' size={30} />), }} />
        <Tabs.Screen name='Profile' component={Profile} options={{ tabBarIcon: ({ color }) => (<HomeIcon name='user' color='#2196F3' size={30} />), }} />
      </Tabs.Navigator>
    );
  }
  return (
    <NavigationContainer>
      {!loading && session && session.user && (
        <>
          {console.log('session exist')}
          <Stack.Navigator initialRouteName='MainNavigationScreen'>
            <Stack.Screen name='MainNavigationScreen' component={BottomTabs} options={{
              headerShown: true, headerTitle: 'ConstrucTech', headerRight: () => (
                <Button
                  onPress={createTwoButtonAlert}
                  title="Logout"
                />), headerTintColor: '#2196F3', headerShadowVisible: true, headerStyle: { backgroundColor: '#FFFFFF' }
            }} />
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