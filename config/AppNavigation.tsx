import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Auth from '../components/Auth'
import Account from '../components/Account'
import { View } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../components/Home';
import OnboardingFormOne from '../components/OnboardingFormOne'
export default function AppNavigation() {
    const Stack = createNativeStackNavigator();
    const [session, setSession] = useState<Session | null>(null)
    const [userDetails, setUserDetails] = useState<any>();
    const [parsedData, setParsedData] = useState();
    const getDataFromAsyncStorage = async() => {
        try{
            const jsonValue = await AsyncStorage.getItem('authenticatedUser');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        }
        catch(e){
            console.log(e);
        }
    }
    useEffect(() => {
        (async () => {
            setUserDetails(await getDataFromAsyncStorage());
          })();
    },[])
    useEffect(() => {
      setSession(supabase.auth.session())
  
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
    }, [])
  
    return (
      <NavigationContainer>
        {session && session.user ? (
            <Stack.Navigator initialRouteName='AccountScreen'>
              <Stack.Screen name='AccountScreen' component={Account} options={{headerShown: false}} />
            </Stack.Navigator>
        // <Account key={session.user.id} session={session} />
        ) : (
            <Stack.Navigator initialRouteName='OnboardingScreen'>
                <Stack.Screen name='LoginScreen' component={Auth} options={{headerShown: false}} />
                <Stack.Screen name='OnboardingScreen' component={OnboardingFormOne} options={{headerShown: false}} />
        </Stack.Navigator>
        )}
      </NavigationContainer>
    )
  }