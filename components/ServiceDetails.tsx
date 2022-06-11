import React from 'react'
import {ScrollView,StyleSheet, View, Text,Image, ImageBackground} from 'react-native';
import RupeeIcon from 'react-native-vector-icons/FontAwesome';
import { color } from 'react-native-elements/dist/helpers';
interface WebviewProps {
    route: any;
    navigation: any,
}
const ServiceDetails = ({route, navigation}: WebviewProps) => {
    const {packageDetails} = route.params;
    console.log(packageDetails);
    return (
        <>
            <View style={styles.container}>
            <View  style={styles.subContainer}>
                <View style={styles.descContainer}>
                <ImageBackground source={require('../assets/paint.jpeg')} resizeMode='stretch' style={{width: '100%', height: '100%', borderRadius: 15, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.text}>{packageDetails.flatType}BHK</Text>
                    <View style={styles.iconImg}>
                        <RupeeIcon name='rupee' size={25} color="red"/>
                        <Text style={styles.subText}>:{packageDetails.price}</Text>
                        </View>
                    <Text style={styles.subText}>TimeSpan:{packageDetails.timeline}</Text>
                    </ImageBackground> 
                </View>              
            </View>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                 <View style={styles.scrollContents}>
            <Text style={{fontSize: 40}}>hi</Text>
                <Text style={{fontSize: 40}}>hi</Text>
                <Text style={{fontSize: 40}}>hi</Text>
                <Text style={{fontSize: 40}}>hi</Text>
                <Text style={{fontSize: 40}}>hi</Text>
                <Text style={{fontSize: 40}}>hi</Text>
                <Text style={{fontSize: 40}}>hi</Text>
                <Text style={{fontSize: 40}}>hi</Text>
                <Text style={{fontSize: 40}}>hi</Text>
                <Text style={{fontSize: 40}}>hi</Text>
                <Text style={{fontSize: 40}}>hi</Text>
                </View>
                {/* <View style={styles.scrollContents}> */}
                {/* <Text style={{fontSize: 40}}>hi</Text>
                <Text style={{fontSize: 40}}>hi</Text>
                <Text style={{fontSize: 40}}>hi</Text>
                <Text style={{fontSize: 40}}>hi</Text>
                <Text style={{fontSize: 40}}>hi</Text>
                <Text style={{fontSize: 40}}>hi</Text>
                <Text style={{fontSize: 40}}>hi</Text>
                <Text style={{fontSize: 40}}>hi</Text>
                <Text style={{fontSize: 40}}>hi</Text>
                <Text style={{fontSize: 40}}>hi</Text>
                <Text style={{fontSize: 40}}>hi</Text>
                <Text style={{fontSize: 40}}>hi</Text>
                <Text style={{fontSize: 40}}>hi</Text> */}
                {/* </View> */}
            </ScrollView>
        </>
        
    )
}

const styles = StyleSheet.create({
    container:{
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    },
    subContainer: {
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        width: '100%',
        backgroundColor: 'grey',
        height: 400,
        borderBottomRightRadius:25,
        borderBottomLeftRadius:25,
        borderColor: '#2196F3',
        borderWidth: 2,
    },
    descContainer:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FFFFFF',
        width: '90%',
        height:'80%',
        borderRadius:20,
    },
    text:{
        fontSize:30,
        fontWeight:'bold',
        color:'black'
    },
    subText:{
        fontSize:20,
        color:'black',
        fontWeight:'bold'
        },
    iconImg:{
        display:'flex',
        flexDirection:'row'
    },
    scrollContainer: {
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',

    },
    scrollContents: {
        marginTop: 20,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#2196F3',
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        width: '90%',
    }
})

export default ServiceDetails
