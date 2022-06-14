import React from 'react'
import {View, Text} from 'react-native';
const PaintPackageDetails = ({route}) => {
    const {selectedPackage} = route.params;
    console.log(selectedPackage);
  return (
    <View><Text>hello from{selectedPackage.flatType}BHK </Text></View>
  )
}

export default PaintPackageDetails