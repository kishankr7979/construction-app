import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import RupeeIcon from 'react-native-vector-icons/FontAwesome';
import Info from 'react-native-vector-icons/FontAwesome';
import { color } from 'react-native-elements/dist/helpers';
import UiDivider from '../common/UiDivider';
import CarouselBanner from '../common/CarouselBanner'
import { supabase } from '../lib/supabase';
import Loader from '../common/Loader'
// import Popover from 'react-native-popover-view';
interface WebviewProps {
    route: any;
    navigation: any,

}
const card = [
    {
        id: 1,
        heading: "Standard Painting",
        subHeading: "Speedy way to get your walls fixed and painted",
        url: require('../assets/paint.jpeg')
    },
    {
        id: 2,
        heading: "Home Cover",
        subHeading: "Get your home protected by our special covers",
        url: require('../assets/banner-paints.jpeg')
    },
    {
        id: 3,
        heading: "Premium Way",
        subHeading: "Get the most out of our service",
        url: require('../assets/paint2.jpg')
    },
    {
        id: 4,
        heading: "Custom",
        subHeading: "Get our services for your Plots",
        url: require('../assets/paint-premium.jpg')
    },
]
const ServiceDetails = ({ route, navigation }: WebviewProps) => {
    const [packageData, setPackageData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const getPackageData = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('service-detail')
            .select()
            .match({ service_id: 'paint-1' })
        setPackageData(data[0].service_details.packages);
        if (error) {
            console.log(error);
        }
        setLoading(false);
    }
    useEffect(() => {
        (async () => {
            await getPackageData();
        })()
    }, [])
    console.log(packageData);
    const { productType } = route.params;
    // console.log(productType);
    const data = [
        {
            id: 1,
            name: 'banner-1',
            url: require('../assets/promotionals.png'),
        },
        {
            id: 2,
            name: 'banner-2',
            url: require('../assets/banner-paints.jpeg'),
        },
        {
            id: 3,
            name: 'banner-3',
            url: require('../assets/delhi-ncr.webp'),
        },
    ];
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <View style={styles.descContainer}>
                    <CarouselBanner data={data} autoPlay autoPlayDuration={3000} />
                </View>
            </View>
            <UiDivider />
            <ScrollView>
                {packageData === undefined && <Loader />}
                {packageData !== undefined && packageData?.map((item) => {
                    return (
                        <TouchableOpacity style={styles.card} key={item.id} onPress={() => navigation.navigate('PaintPackageDetails', {selectedPackage: item})}>
                            <View style={styles.subCard}>
                                <Image source={{uri: item.imageUrl}} style={{ borderRadius: 10, width: 150, height: 140, overflow: "hidden", }} resizeMode='cover' />
                            </View>
                            <View style={styles.cardInfo}>
                                <View style={styles.cardInfoDetails}>
                                    <Text style={{ fontSize: 16, letterSpacing: 1, color: '#242526', fontWeight: 'bold' }}>{`${item.flatType}BHK`}</Text>
                                    <Text style={{ fontSize: 14, letterSpacing: 1, color: '#242526', marginTop: 8, }}>{`Estimate Cost: Rs ${item.lowerPriceRange} - Rs ${item.upperPriceRange}`}</Text>
                                    <Text style={{ fontSize: 14, letterSpacing: 1, color: '#242526', marginTop: 8, }}>{`Estimate Time: ${item.timeline}`}</Text>
                                </View>
                            </View>
                            <UiDivider />
                        </TouchableOpacity>
                    );
                })}
                <Text>{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</Text>
            </ScrollView>
        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 200,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
    },
    descContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#FFFFFF',
        width: '90%',
        height: 150,
        // padding:10,
        borderRadius: 20,

    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black'
    },
    subText: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
    },
    iconImg: {
        display: 'flex',
        flexDirection: 'row'
    },
    scrollContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',

    },
    scrollContents: {
        marginTop: 20,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#2196F3',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#FFFFFF',
        width: '90%',
    },
    card: {
        // backgroundColor:'#fff',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        maxWidth: '100%',
        margin: 20,
        overflow: 'hidden',
        width: 350,
        borderColor: '#FFFFFF',
        borderWidth: 2
        // backgroundColor:'#FFFFFF'
    },
    subCard: {

        // color:'white',
        // padding:30,
        // borderWidth: 1,
        // borderColor: '#FFFFFF',

        maxWidth: 150,
    },
    cardInfo: {
        // backgroundColor:'#9b6dff',
        padding: 10,
        position: 'relative',
        width: '100%'
    },
    cardInfoDetails: {
        position: 'absolute',
        top: 20,
        right: 170,
        textAlign: 'right',
        width: 150
    },
    loaderStyles: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    }
})

export default ServiceDetails
