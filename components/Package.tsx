import React,  {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity,ImageBackground, Button} from 'react-native';
import { CheckBox } from 'react-native-elements'
import PackageIcon from 'react-native-vector-icons/Feather';
import ServicesIcon from 'react-native-vector-icons/MaterialIcons'
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
const OnboardingFormTwo = () => {
    const [selectCategory, setSelectedCategory] = useState();
    const [paiting, setPaiting] = useState(false);
    const [flooring, setFlooring] = useState(false);
    const [furnishing, setFurnishing] = useState(false);
    const [plumber, setPlumber] = useState(false);
    // const [services, setServices] = useState({
    //     Painting: false,
    //     Flooring: false,
    //     Furnishing: false,
    //     Plumber: false,
    // });
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

    // const Services: ServicesType[] = [
    //     {
    //         id: 1,
    //         serviceId: 'serv-1',
    //         serviceName: 'Painting',
    //         status: true,
    //         value:services.Painting,
    //         onchange: (val) => setServices({...services, Painting: val}),
    //     },
    //     {
    //         id: 2,
    //         serviceId: 'serv-2',
    //         serviceName: 'Flooring',
    //         status: true,
    //         value:services.Flooring,
    //         onchange: (val) => setServices({...services, Flooring: val}),
    //     },
    //     {
    //         id: 3,
    //         serviceId: 'serv-3',
    //         serviceName: 'Furnishing',
    //         status: true,
    //         value:services.Furnishing,
    //         onchange: (val) => setServices({...services, Furnishing: val}),
    //     },
    //     {
    //         id: 4,
    //         serviceId: 'serv-4',
    //         serviceName: 'Plumber',
    //         status: true,
    //         value:services.Plumber,
    //         onchange: (val) => setServices({...services, Plumber: val}),
    //     },
    // ]
    const selectProduct = (id, status) => {
        if(status === false) return;
        setSelectedCategory(id);
    }
    return (
            <ImageBackground  source={require('../assets/new-construction.jpeg')} style={[styles.container]}>
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