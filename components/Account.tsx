import { useState, useEffect, useLayoutEffect } from "react";
import { supabase } from "../lib/supabase";
import { StyleSheet, View, Text, ScrollView, Image, ImageBackground, TouchableOpacity, Animated } from "react-native";
import { ApiError, Session } from "@supabase/supabase-js";
import { TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from "../common/Loader";
import CarouselBanner from '../common/CarouselBanner';
import OfferIcon from 'react-native-vector-icons/MaterialIcons';
import UiDivider from '../common/UiDivider';
export default function Account({ navigation }, { session }: { session: Session }) {
  // const [loading, setLoading] = useState(false);
  // const [apiData, setApiData] = useState<any>();
  const [userSession, setUserSession] = useState<any>(null)
  // const [servicePackage, setServicePackage] = useState<any>([]);
  // const fetchApiData = async (userId) => {
  //   const { data, error } = await supabase
  //     .from('user-db')
  //     .select()
  //     .match({ uuid: userId })
  //   if (data) {
  //     setApiData(data);
  //   }
  //   if (error) {
  //     console.log(error);
  //   }
  // }
  // const getServicePackageDetails = async () => {
  //   const { data, error } = await supabase
  //     .from('service-detail')
  //     .select()
  //   if (data) {
  //     setServicePackage(data?.[0]?.service_details?.packages);
  //   }
  //   else if (error) {
  //     console.log(error);
  //   }
  // }
  useEffect(() => {
    setUserSession(supabase.auth.session())
  }, []);
  // useEffect(() => {
  //   if (userSession?.user?.id !== undefined) {
  //     (async () => {
  //       await fetchApiData(userSession?.user?.id);
  //       AsyncStorage.setItem('userId', userSession?.user?.id)
  //     })()
  //   }
  // }, [userSession?.user?.id])
  // useEffect(() => {
  //   (async () => {
  //     setLoading(true);
  //     await getServicePackageDetails();
  //     setLoading(false);
  //   })();
  // }, [])

  const onPackageClick = (packageData: any) => {
    navigation.navigate('PackageDetails', { packageDetails: packageData });
  }
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
  const onProductClick = (type)=>{
    navigation.navigate('PackageDetails',{productType:type})
  }

  const productList = [
    {
      id: 1,
      name: 'Paiting',
      image: require('../assets/paint.jpeg'),
      type: 'renovation',
    },
    {
      id: 2,
      name: 'Carpenter',
      image: require('../assets/carpenter.jpeg'),
      type: 'renovation',
    },
    {
      id: 3,
      name: 'Plumber',
      image: require('../assets/plumber.webp'),
      type: 'renovation',
    },
    {
      id: 4,
      name: 'Flooring',
      image: require('../assets/flooring.webp'),
      type: 'renovation',
    },
    {
      id: 5,
      name: 'Complete Package',
      image: require('../assets/complete-package.jpeg'),
      type: 'renovation',
    }
  ];
  return (
    <ScrollView>
      <View style={styles.container}>
        <CarouselBanner data={data} autoPlay autoPlayDuration={3000} />
        <UiDivider />
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', }}>
          <View style={styles.productMainConatiner}>
            {productList.map((item) => {
              return (
                <TouchableOpacity style={[styles.productContainer, { width: item.id > 3 ? '45%' : '30%' }]} key={item.id} onPress={()=>onProductClick(item.name)}>
                  <Image source={item.image} style={{
                    width: '100%', height: '100%', borderRadius: 10,
                    overflow: "hidden",
                  }} resizeMode='cover' />
                  <View style={styles.productTitleContainer}>
                  <Text style={[styles.productTitleName, {color: item.id === 1 || item.id === 4 ? '#242526' : '#FFFFFF'}]}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <UiDivider />
          <View style={styles.footerContainer}>
            <OfferIcon name='local-offer' size={20} color='#651fff' />
              <Text style={styles.footerTitle}>Early members can save up to 10% with us</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  // subContainer: {
  //   marginTop: 20,
  //   width: '90%',
  // },
  // cardContainer: {
  //   display: 'flex',
  //   width: '100%',
  //   height: 500,
  //   flexDirection: 'column',
  //   backgroundColor: '#FFFFFF',
  //   padding: 20,
  //   borderRadius: 10,
  //   marginBottom: 10,
  //   borderWidth: 2,
  //   borderColor: '#2196F3',
  // },
  // fontContainer: {
  //   fontSize: 100,
  // },
  // imageContainer: {
  //   width: '100%',
  //   flex: 1,
  // },
  // descriptionContainer: {
  //   display: 'flex',
  //   width: '100%',
  //   flexDirection: 'column',
  //   marginLeft: 10,
  // },
  // title: {
  //   fontSize: 20,
  //   color: '#2196F3',
  //   fontWeight: 'bold',
  // },
  // price: {
  //   fontSize: 15,
  //   color: 'green',
  //   fontWeight: 'bold',
  // },
  // timeline: {
  //   fontSize: 15,
  //   color: 'grey',
  //   fontWeight: 'bold',
  // },
  productMainConatiner: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
    marginTop: 10,
  },
  productContainer: {
    position: 'relative',
    display: 'flex',
    height: 200,
    width: '30%',
    margin: 5,
    boderRadius: 5,
  },
  productTitleContainer: {
    position: 'absolute',
    display: 'flex',
    bottom: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  productTitleName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerContainer: {
    marginTop: 20,
    width: '90%',
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    transition: 'border-width 0.6s linear',
  },
  footerTitle: {
    color: '#651fff',
    fontSize: 12,
    fontWeight: 'bold',
  }
});