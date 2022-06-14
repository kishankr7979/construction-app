import 'react-native-url-polyfill/auto'
import { useState, useContext } from 'react'
import HomeIcon from 'react-native-vector-icons/AntDesign';
import OffIcon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Auth from '../components/Auth'
import Account from '../components/Account'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ServiceDetails from '../components/ServiceDetails';
import Loader from '../common/Loader';
import Onboarding from '../components/Onboarding';
import Profile from '../components/Profile';
import Webview from '../components/Webview';
import OrderIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAuthUser} from '../state/AuthContext';
import SplashScreen from '../components/SplashScreen';
import OrderHistory from '../components/OrderHistory';
import PaintPackageDetails from '../components/PaintPackageDetails';
export default function AppNavigation() {
  const Stack = createNativeStackNavigator();
  const Tabs = createBottomTabNavigator();
  const [session, setSession] = useState<any>(undefined)
  // const [userDetails, setUserDetails] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const user = useAuthUser();
  const BottomTabs = () => {
    return (
      <Tabs.Navigator screenOptions={{ headerShown: false, tabBarStyle: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        backgroundColor: '#651fff',
      } }} initialRouteName='Home'>
        <Tabs.Screen name='Home' component={Account}  options={{ tabBarShowLabel: false, tabBarIcon: ({ focused }) => (<HomeIcon name='home' color={focused ? '#FFFFFF' : '#242526'} size={30} />), }} />
        <Tabs.Screen name='Orders' component={OrderHistory} options={{ tabBarShowLabel: false,tabBarIcon: ({ focused }) => (<OrderIcon name='card-account-details-outline' color={focused ? '#FFFFFF' : '#242526'} size={30} />), }} />
      </Tabs.Navigator>
    );
  }
  return (
    <NavigationContainer>
      {user && (
        <>
          {console.log('session exist')}
          <Stack.Navigator initialRouteName='MainNavigationScreen'>
            <Stack.Screen name='MainNavigationScreen' component={BottomTabs} 
             options={({ navigation }) => ({
              headerShown: true, 
              headerTitleAlign: 'center',
              headerTitle: 'ContrucTech',
              headerTintColor: '#651fff',
              headerRight: () => (
                <OffIcon name='user-circle' color='#651fff' size={30} onPress={() => navigation.navigate('Profile')}/>
              ),
            })} />
            <Stack.Screen name='Onboarding' component={Onboarding} options={{ headerShown: false }} />
            <Stack.Screen name='Profile' component={Profile} options={{ headerShown: true }} />
            <Stack.Screen name='Webview' options={{ headerShown: true, headerTitle: 'Edit Profile', headerTintColor: '#2196F3', headerShadowVisible: true, headerStyle: { backgroundColor: '#FFFFFF' } }}>{props => <Webview {...props} />}</Stack.Screen>
            <Stack.Screen name='PackageDetails' options={{ headerShown: true, headerTitle: 'Package', headerTintColor: '#2196F3', headerShadowVisible: true, headerStyle: { backgroundColor: '#FFFFFF' } }}>{props => <ServiceDetails {...props} />}</Stack.Screen>
            <Stack.Screen name='PaintPackageDetails' options={{ headerShown: true, headerTitle: 'Paint Package', headerTintColor: '#2196F3', headerShadowVisible: true, headerStyle: { backgroundColor: '#FFFFFF' } }}>{props => <PaintPackageDetails {...props} />}</Stack.Screen>
          </Stack.Navigator>
        </>
      )}
      {user === undefined && (
        <>
          {console.log('loading')}
          <SplashScreen />
        </>
      )}
      {user === null && (
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