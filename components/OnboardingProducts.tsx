import React,  {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity,ImageBackground, Button} from 'react-native';
import NewConstructionIcon from 'react-native-vector-icons/Ionicons';
import RenovationIcon from 'react-native-vector-icons/MaterialCommunityIcons'
type ProductType = {
    id: number,
    productId: string,
    icon: JSX.Element | JSX.Element[]
    productName: string,
    status: boolean,
}
interface OnboardingProductsProps {
    setStep: () => void;
}
const OnboardingProducts = ({setStep}: OnboardingProductsProps) => {
    const [selectCategory, setSelectedCategory] = useState(1);
    const listOfProducts: ProductType[] = [
        {
            id: 1,
            productId: 'con-1',
            productName: 'Renovation',
            icon: <RenovationIcon name='home-edit' size={50} color='#2196F3'/>,
            status: true,
        },
        {
            id: 2,
            productId: 'con-2',
            productName: 'New Construction',
            icon: <NewConstructionIcon name='md-construct-sharp' size={50} />,
            status: false,
        }
    ]
    const selectProduct = (id, status) => {
        if(status === false) return;
        setSelectedCategory(id);
    }
    const sendCategory = () => {
        setStep();
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
                <View style={styles.buttonContainer}>
                <Button title='NEXT' onPress={sendCategory}/>
                </View>
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
        justifyContent: 'center', 
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 15,
        height: 200,
        width: 200,
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
    }
   
});

export default OnboardingProducts
