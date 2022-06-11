import React from 'react'
import {ScrollView, View, Text} from 'react-native';
interface WebviewProps {
    route: any;
    navigation: any,
}
const ServiceDetails = ({route, navigation}: WebviewProps) => {
    const {packageDetails} = route.params;
    console.log(packageDetails);
    return (
        <ScrollView>
            
        </ScrollView>
    )
}

export default ServiceDetails
