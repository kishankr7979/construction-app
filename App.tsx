import AppNavigation from './config/AppNavigation'
import { useNetInfo } from "@react-native-community/netinfo";
import NoInternetIcon from 'react-native-vector-icons/MaterialIcons';
import { View, Text } from 'react-native';
import {AuthContextProvider, useAuthUser} from './state/AuthContext';

export default function App() {
  const user = useAuthUser;
  return (
    <AuthContextProvider>
      <AppNavigation/>
      </AuthContextProvider>
  )
}