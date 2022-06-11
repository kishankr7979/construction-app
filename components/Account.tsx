import { useState, useEffect, useLayoutEffect } from "react";
import { supabase } from "../lib/supabase";
import { StyleSheet, View, Text, ScrollView, Image, ImageBackground, TouchableOpacity } from "react-native";
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
  },[apiData?.length])
  useEffect(() => {
    (async () => {
      setLoading(true);
      await getServicePackageDetails();
      setLoading(false);
    })();
  }, [])

  const onPackageClick = (packageData: any) => {
    navigation.navigate('PackageDetails', {packageDetails: packageData});
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.subContainer}>
        {loading ? <Loader /> : (<>
          {servicePackage.map((item) => {
            return (
              <TouchableOpacity style={styles.cardContainer} onPress={() => onPackageClick(item)} key={item.id}>
                <ImageBackground style={styles.imageContainer} source={require('../assets/paint.jpeg')} resizeMode='cover' >
                {/* <Image source={require('../assets/paint.jpeg')} resizeMode="contain">
                </Image> */}
                </ImageBackground>
                <View style={styles.descriptionContainer}>
                  <Text style={styles.title}>Painting Package for {item.flatType}BHK</Text>
                  <Text style={styles.price}>Price: INR {item.price}</Text>
                  <Text style={styles.timeline}>Timeline: {item.timeline}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </>)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  subContainer: {
    marginTop: 20,
    width: '90%',
  },
  cardContainer: {
    display: 'flex',
    width: '100%',
    height: 500,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  fontContainer: {
    fontSize: 100,
  },
  imageContainer: {
    width: '100%',
    flex: 1,
  },
  descriptionContainer: {
    display: 'flex',
    width: '100%',
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