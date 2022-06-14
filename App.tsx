import AppNavigation from './config/AppNavigation'
import { useNetInfo } from "@react-native-community/netinfo";
import NoInternetIcon from 'react-native-vector-icons/MaterialIcons';
import { View, Text } from 'react-native';
import {AuthContextProvider, useAuthUser} from './state/AuthContext';
import {UserContextProvider, activeUser} from './state/UserContext';
export default function App() {
  const user = useAuthUser;
  return (
    <AuthContextProvider>
      <UserContextProvider>
      <AppNavigation/>
      </UserContextProvider>
    </AuthContextProvider>
  )
}