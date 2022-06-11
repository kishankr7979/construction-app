import { useState, useEffect, useLayoutEffect } from "react";
import { supabase } from "../lib/supabase";
import { StyleSheet, View, Text, ScrollView, Image, ImageBackground } from "react-native";
import { ApiError, Session } from "@supabase/supabase-js";
import { TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from "../common/Loader";
export default function Account({ navigation }, { session }: { session: Session }) {
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState<any>();
  const [userSession, setUserSession] = useState<any>(null)
  const [servicePackage, setServicePackage] = useState<any>([]);
  const fetchApiData = async (userId) => {
    const { data, error } = await supabase
      .from('user-db')
      .select()
      .match({ uuid: userId })
    if (data) {
      setApiData(data);
    }
    if (error) {
      console.log(error);
    }
  }
  const getServicePackageDetails = async () => {
    const { data, error } = await supabase
      .from('service-detail')
      .select()
    if (data) {
      setServicePackage(data?.[0]?.service_details?.packages);
    }
    else if (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    setUserSession(supabase.auth.session())
  }, []);
  useEffect(() => {
    if (userSession?.user?.id !== undefined) {
      (async () => {
        await fetchApiData(userSession?.user?.id);
        AsyncStorage.setItem('userId', userSession?.user?.id)
      })()
    }
  }, [userSession?.user?.id])

  useEffect(() => {
    if (apiData?.length === 0) {
      navigation.navigate('Onboarding')
    }
  })
  useEffect(() => {
    (async () => {
      setLoading(true);
      await getServicePackageDetails();
      setLoading(false);
    })();
  }, [])
  console.log('hi');
  console.log(servicePackage);
  const card = (flatType, price, timeline) => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
                <Image source={require('../assets/paint.jpeg')} resizeMode="cover" style={{width: undefined, height: undefined, flex: 1, borderRadius: 5,}}>
                {/* <Image source={require('../assets/paint.jpeg')} resizeMode='contain' style= {{flex:1 , width: '100%', height: '100%'}} /> */}
                </Image>
                </View>
        <View style={styles.descriptionContainer}>
                  <Text style={styles.title}>Painting Package for {flatType}BHK</Text>
                  <Text style={styles.price}>Price: INR {price}</Text>
                  <Text style={styles.timeline}>Timeline: {timeline}</Text>
                </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView style={styles.subContainer}>
        {loading ? <Loader /> : (<>
          {servicePackage.map((item) => {
            return (
              <View style={styles.cardContainer}>
                <View style={styles.imageContainer}>
                <Image source={require('../assets/paint.jpeg')} resizeMode="cover" style={{width: undefined, height: undefined, flex: 1, borderRadius: 5,}}>
                {/* <Image source={require('../assets/paint.jpeg')} resizeMode='contain' style= {{flex:1 , width: '100%', height: '100%'}} /> */}
                </Image>
                </View>
                <View style={styles.descriptionContainer}>
                  <Text style={styles.title}>Painting Package for {item.flatType}BHK</Text>
                  <Text style={styles.price}>Price: INR {item.price}</Text>
                  <Text style={styles.timeline}>Timeline: {item.timeline}</Text>
                </View>
              </View>
            );
          })}
        </>)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#000000',
  },
  subContainer: {
    width: '90%',
    position: 'absolute',
    top: 20,
  },
  cardContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  imageContainer: {
    width: '30%',
  },
  descriptionContainer: {
    display: 'flex',
    width: '70%',
    flexDirection: 'column',
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    color: '#2196F3',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 15,
    color: 'green',
    fontWeight: 'bold',
  },
  timeline: {
    fontSize: 15,
    color: 'grey',
    fontWeight: 'bold',
  }
});