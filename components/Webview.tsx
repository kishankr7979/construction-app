import { WebView } from 'react-native-webview';
import Loader from '../common/Loader';
interface WebviewProps {
    route: any;
    navigation: any,
}
const Webview = ({route, navigation}: WebviewProps) => {
    const loadingState = () => {
        return (
            <Loader />
        );
    }
    const {url, afterWebviewClose} = route.params;
    const onMessage = (message) => {
        console.log(message.nativeEvent.data);
        if(message.nativeEvent.data === 'closeWebview'){
        navigation.navigate(afterWebviewClose);
        }
    }
    return (
        <WebView source={{ uri: url }} onMessage={onMessage} renderLoading={loadingState}/>
    )
}

export default Webview
