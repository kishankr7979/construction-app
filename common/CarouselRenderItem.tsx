import React from 'react'
import { View, Text, Image } from 'react-native';
const CarouselRenderItem = ({ item }) => {
    return (
        <View
            style={{
                borderWidth: 1,
                padding: 20,
                borderRadius: 20,
                alignItems: 'center',
                backgroundColor: 'white',
            }}>
            <Image source={{ uri: item.url }} style={{ width: 200, height: 200 }} />
            <Text style={{ marginVertical: 10, fontSize: 20, fontWeight: 'bold' }}>
                {item.name}
            </Text>
        </View>
    )
}

export default CarouselRenderItem
