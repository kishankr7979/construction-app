import AppNavigation from './config/AppNavigation'
import { useNetInfo } from "@react-native-community/netinfo";
import NoInternetIcon from 'react-native-vector-icons/MaterialIcons';
import { View, Text } from 'react-native';
export default function App() {
  const netInfo = useNetInfo();
  console.log(netInfo);
  return (
    <>
      {netInfo.isInternetReachable ? <AppNavigation /> : (<View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
        <NoInternetIcon name='signal-cellular-connected-no-internet-4-bar' size={80} />
        <Text>No Internet Connection</Text>
      </View>)}
    </>
  )
}