import React,  {useState, useLayoutEffect, useEffect} from 'react'
import {View, Text, StyleSheet, TouchableOpacity,ImageBackground, Button, Alert} from 'react-native';
import { CheckBox } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import PackageIcon from 'react-native-vector-icons/Feather';
import ServicesIcon from 'react-native-vector-icons/MaterialIcons'
import { supabase } from '../lib/supabase'
type ProductType = {
    id: number,
    productId: string,
    icon: JSX.Element | JSX.Element[]
    productName: string,
    status: boolean,
}
type ServicesType = {
    id: number,
    serviceId: string,
    serviceName: string,
    status: boolean,
    value: boolean,
    onchange: (val: boolean) => void,
}

interface Properties {
    email: any;
    password: any;
    navigation: any;
}
const OnboardingFormTwo = ({email, password, navigation}: Properties) => {
    const [selectCategory, setSelectedCategory] = useState();
    const [paiting, setPaiting] = useState(false);
    const [flooring, setFlooring] = useState(false);
    const [furnishing, setFurnishing] = useState(false);
    const [plumber, setPlumber] = useState(false);
    const [userData, setUserData] = useState<any>();
    const [sessionData, setSessionData] = useState<any>();
    const getDataFromAsyncStorage = async() => {
        try{
            const jsonValue = await AsyncStorage.getItem('userData');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        }
        catch(e){
            console.log(e);
        }
    }
    useLayoutEffect(() => {
        (async () => {
            setUserData(await getDataFromAsyncStorage());
          })();
           console.log(userData);
    },[userData !== undefined])

    const createUser = async() => {
        const { user, error } = await supabase.auth.signUp({
            email: email?.email?.email,
            password: email?.email?.password,
          })
          console.log(user);
          if (error) Alert.alert(error.message)
    }
    console.log(email?.email?.password);
    const fetchSession = async() => {
        const res = await supabase.auth.session()
        setSessionData(res);
    }
    const sendUserDetails = async() => {
    const { data, error } = await supabase
    .from('user-db')
    .insert([
      { created_at: new Date(), name: userData.name, phone: userData.phone, address: userData.address, occupation: userData.occupation, uuid:  sessionData.user.id},
    ])
    console.log(data);
    if(error){
     console.log(error);
    }
    }

    const sendServicesData = async() => {
        const { data, error } = await supabase
        .from('services-db')
        .insert([
          { uuid:sessionData.user.id, created_at: new Date(), package: selectCategory === 1, custom_services: selectCategory === 2 ? {
            paiting: paiting,
            flooring: flooring,
            furnishing: furnishing,
            plumber: plumber,
          }: {}},
        ])
        console.log(data);
        if(error){
         console.log(error);
        }
    }
    useEffect(() => {
        fetchSession();
    }, [sessionData?.user?.id !== undefined]);
    const sendAllData = async() => {
        Promise.all([sendUserDetails(), sendServicesData()])
        navigation.navigate('MainNavigationScreen');
    }
    console.log(sessionData?.user?.id);
    const listOfProducts: ProductType[] = [
        {
            id: 1,
            productId: 'con-1',
            productName: 'Constructech Package',
            icon: <PackageIcon name='package' size={30} color='#2196F3'/>,
            status: true,
        },
        {
            id: 2,
            productId: 'con-2',
            productName: 'Individual Services',
            icon: <ServicesIcon name='miscellaneous-services' size={30} color='#2196F3'/>,
            status: true,
        }
    ]
    const selectProduct = (id, status) => {
        if(status === false) return;
        setSelectedCategory(id);
    }
    return (
            <ImageBackground  source={require('../assets/new-construction.png')} style={[styles.container]}>
            <View style={styles.productMainConatiner}>
                {listOfProducts.map((item) => {
                    return (
                        <TouchableOpacity style={[styles.productContainer, {borderColor: selectCategory === item.id ? '#2196F3' : 'black', borderWidth: selectCategory === item.id ? 5 : 2}]} key={item.id} onPress={() => selectProduct(item.id, item.status)}>
                            {item.status === false && <View style={styles.comingSoonBadge}><Text>Coming Soon</Text></View>}
                            {item.icon}
                            <Text style={styles.title}>{item.productName}</Text>
                        </TouchableOpacity>
                    );
                })}
                {selectCategory === 2 && 
                <View style={styles.checkboxContainer}>
                    <CheckBox title='Paiting' checked={paiting} onPress={() => setPaiting(!paiting)} style={{borderWidth: 5, borderColor: '#2196F3'}}/>
                    <CheckBox title='Flooring' checked={flooring} onPress={() => setFlooring(!flooring)} />
                    <CheckBox title='Furnishing' checked={furnishing} onPress={() => setFurnishing(!furnishing)} />
                    <CheckBox title='Plumber' checked={plumber} onPress={() => setPlumber(!plumber)} />

                </View>}
                <Button title='NEXT' onPress={sendAllData} />
            </View>
            </ImageBackground>
    )
}
 
const styles = StyleSheet.create({
    container: {
        height: '100%', 
        width: '100%', 
        // flex: 1,
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
    },
    productMainConatiner: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 20,
        // height: 500,
        borderRadius: 20,
        opacity: 0.6,
        width: '90%',
        backgroundColor: '#FFFFFF',
    },
    productContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 15,
        height: 100,
        padding: 20,
        minWidth: 300,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
    },
    comingSoonBadge: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    checkboxContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
    }
   
});

export default OnboardingFormTwo