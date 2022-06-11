import { WebView } from 'react-native-webview';

interface WebviewProps {
    route: any;
    navigation: any,
}
const Webview = ({route, navigation}: WebviewProps) => {
    const {url, afterWebviewClose} = route.params;
    const onMessage = (message) => {
        if(message === 'closeWebview'){
        navigation.navigate(afterWebviewClose);
        }
    }
    return (
        <WebView source={{ uri: url }} onMessage={onMessage}/>
    )
}

export default Webview
