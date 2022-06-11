import React from 'react';
import {Text, View, Dimensions, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';

export const SLIDER_WIDTH = Dimensions.get('window').width + 30;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
interface CarouselBannerProps {
    data: any;
    autoPlay?: boolean;
    autoPlayDuration?: number;
}
const renderItem = ({ item }) => {
    return (
        <View
            style={{
                borderRadius: 20,
                height: 200,
            }}>
            <Image source={item.url} style={{ width: '100%', height: '100%', borderRadius: 10,
    overflow: "hidden", }} resizeMode='cover' />
            <Text style={{ marginVertical: 10, fontSize: 20, fontWeight: 'bold' }}>
                {item.name}
            </Text>
        </View>
    )
}
const CarouselBanner = ({data, autoPlay = false, autoPlayDuration=2000}: CarouselBannerProps) => {
    return (
        <View style={{marginVertical: 10}}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        autoplay={autoPlay}
        layout={'default'} 
        autoplayInterval={autoPlayDuration}
        loop={true}
      />
    </View>
    )
}

export default CarouselBanner;

