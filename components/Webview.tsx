import { WebView } from 'react-native-webview';

interface WebviewProps {
    route: any;
}
const Webview = ({route}: WebviewProps) => {
    const {url} = route.params;
    return (
        <WebView source={{ uri: url }} />
    )
}

export default Webview
