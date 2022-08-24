import { useState, useEffect, useLayoutEffect } from "react";
import { supabase } from "../lib/supabase";
import { StyleSheet, View, Text, ScrollView, Image, ImageBackground, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { ApiError, Session } from "@supabase/supabase-js";
import CarouselBanner from '../common/CarouselBanner';
import OfferIcon from 'react-native-vector-icons/MaterialIcons';
import UiDivider from '../common/UiDivider';
export default function Account({ navigation }, { session }: { session: Session }) {
  const [userSession, setUserSession] = useState<any>(null)
  useEffect(() => {
    setUserSession(supabase.auth.session())
  }, []);
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
  const productList = [
    {
      id: 1,
      name: 'Paiting',
      image: require('../assets/paint.jpeg'),
      type: 'renovation',
      coming_soon: false,
    },
    {
      id: 2,
      name: 'Carpenter',
      image: require('../assets/carpenter.jpeg'),
      type: 'renovation',
      coming_soon: true,
    },
    {
      id: 3,
      name: 'Plumber',
      image: require('../assets/plumber.webp'),
      type: 'renovation',
      coming_soon: true,
    },
    {
      id: 4,
      name: 'Flooring',
      image: require('../assets/flooring.webp'),
      type: 'renovation',
      coming_soon: true,
    },
    {
      id: 5,
      name: 'Complete Package',
      image: require('../assets/complete-package.jpeg'),
      type: 'renovation',
      coming_soon: true,
    }
  ];

  const onCategoryClick = (type, coming_soon) => {
    if (!coming_soon) {
      navigation.navigate('PackageDetails', { productType: type })
      return;
    }

  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ height: 200, width: '100%' }}>
          <CarouselBanner data={data} autoPlay autoPlayDuration={3000} />
        </View>
        <UiDivider />
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', }}>
          <View style={styles.productMainConatiner}>
            {productList.map((item) => {
              return (
                <TouchableOpacity style={[styles.productContainer, { width: item.id > 3 ? '45%' : '30%' }]} key={item.id} onPressIn={() => onCategoryClick(item.type, item.coming_soon)}>
                  <Image source={item.image} style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
                    borderWidth: 3,
                    borderColor: '#FFFFFF',
                    overflow: "hidden",
                    opacity: item.coming_soon ? 0.3 : 1,
                  }} resizeMode='cover' />
                  <View style={styles.productTitleContainer}>
                    <Text style={[styles.productTitleName, { color: item.coming_soon ? '#000000' : "#651fff" }]}>{item.name}</Text>
                  </View>
                  {item.coming_soon && <View style={styles.comingSoonBadge}><Text style={{ color: '#000000', fontWeight: 'bold' }}>Coming soon</Text></View>}
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
  },
  comingSoonBadge: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  productTitleContainer: {
    position: 'absolute',
    display: 'flex',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  productTitleName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#651fff'
  },
  footerContainer: {
    marginTop: 20,
    marginBottom: 20,
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
    fontSize: 15,
    fontWeight: 'bold',
  }
});