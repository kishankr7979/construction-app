import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Auth from '../components/Auth'
import Account from '../components/Account'
import { View } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export default function AppNavigation() {
    const Stack = createNativeStackNavigator();
    const [session, setSession] = useState<Session | null>(null)
  
    useEffect(() => {
      setSession(supabase.auth.session())
  
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
    }, [])
  
    return (
      <NavigationContainer>

        {session && session.user ? (
            <Stack.Navigator>
                <Stack.Screen name='HomeScreen' component={Account} options={{headerShown: true}} />
            </Stack.Navigator>
        // <Account key={session.user.id} session={session} />
        ) : (
            <Stack.Navigator>
                <Stack.Screen name='LoginScreen' component={Auth} options={{headerShown: true}} />
        </Stack.Navigator>
        )}
      </NavigationContainer>
    )
  }