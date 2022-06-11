import React from 'react'
import {ScrollView,StyleSheet, View, Text,Image, ImageBackground, TouchableOpacityBase} from 'react-native';
import RupeeIcon from 'react-native-vector-icons/FontAwesome';
import Info from 'react-native-vector-icons/FontAwesome';
import { color } from 'react-native-elements/dist/helpers';
// import Popover from 'react-native-popover-view';
interface WebviewProps {
    route: any;
    navigation: any,
    
}
const ServiceDetails = ({route, navigation}: WebviewProps) => {
    const {packageDetails} = route.params;
    console.log(packageDetails);
    return (
       
            <View style={styles.container}>
             <View  style={styles.subContainer}>
                <View style={styles.descContainer}>               
                        <Image source={require('../assets/paint.jpeg')} style={{
                        borderRadius: 10,width:150,height:140,
                        overflow: "hidden",
                        }} resizeMode='cover' />
                        <View style={{borderBottomColor: 'grey', backgroundColor: 'grey',borderBottomWidth: 1,width:'100%'}} ></View>
                        <View style={{marginTop:5}}></View>                   
                </View>              
            </View>
            <ScrollView >
                <View style={styles.card}>
                    <View style={styles.subCard}>
                    <Image source={require('../assets/paint.jpeg')} style={{
                     borderRadius: 10,width:150,height:140,
                    overflow: "hidden",
                  }} resizeMode='cover' />
                    </View>
                    <View style={styles.cardInfo}>
                        <View style={styles.cardInfoDetails}>
                            <Text style={{fontSize:16,opacity:0.7,letterSpacing:1, color:'white'}}>Standard Painting{'\n'}</Text>
                            <Text style={{fontSize:14,opacity:0.6,letterSpacing:1,color:'white'}}>Speedy way to get your walls fixed and painted</Text>
                        </View>
                    </View>
                </View>
                <View style={{borderBottomColor: 'grey', backgroundColor: 'grey',borderBottomWidth: 1,width:'100%'}} ></View>
                <View style={styles.card}>
                    <View style={styles.subCard}>
                    <Image source={require('../assets/paint.jpeg')} style={{
                     borderRadius: 10,width:150,height:140,
                    overflow: "hidden",
                  }} resizeMode='cover' />
                    </View>
                    <View style={styles.cardInfo}>
                        <View style={styles.cardInfoDetails}>
                            <Text style={{fontSize:16,opacity:0.7,letterSpacing:1, color:'white'}}>Home Cover{'\n'}</Text>
                            <Text style={{fontSize:14,opacity:0.6,letterSpacing:1,color:'white'}}>Get your home protected by our special covers</Text>
                        </View>
                    </View>
                </View>
                <View style={{borderBottomColor: 'grey', backgroundColor: 'grey',borderBottomWidth: 1,width:'100%'}} ></View>
                <View style={styles.card}>
                    <View style={styles.subCard}>
                    <Image source={require('../assets/paint.jpeg')} style={{
                     borderRadius: 10,width:150,height:140,
                    overflow: "hidden",
                  }} resizeMode='cover' />
                    </View>
                    <View style={styles.cardInfo}>
                        <View style={styles.cardInfoDetails}>
                        <Text style={{fontSize:16,opacity:0.7,letterSpacing:1, color:'white'}}>Premium Way{'\n'}</Text>
                            <Text style={{fontSize:14,opacity:0.6,letterSpacing:1,color:'white'}}>Get the most out of our service</Text>
                        </View>
                    </View>
                </View>
                <View style={{borderBottomColor: 'grey', backgroundColor: 'grey',borderBottomWidth: 1,width:'100%'}} ></View>
                <View style={styles.card}>
                    <View style={styles.subCard}>
                    <Image source={require('../assets/paint.jpeg')} style={{
                     borderRadius: 10,width:150,height:140,
                    overflow: "hidden",
                  }} resizeMode='cover' />
                    </View>
                    <View style={styles.cardInfo}>
                        <View style={styles.cardInfoDetails}>                           
                        <Text style={{fontSize:16,opacity:0.7,letterSpacing:1, color:'white'}}>Custom{'\n'}</Text>
                            <Text style={{fontSize:14,opacity:0.6,letterSpacing:1,color:'white'}}>No matter how big your paradise is, we're here to make it even more beautiful</Text>
                        </View>
                    </View>
                </View>
                <View style={{borderBottomColor: 'grey', backgroundColor: 'grey',borderBottomWidth: 1,width:'100%'}} ></View>
            </ScrollView>
            </View>
       
        
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
        // backgroundColor: '#242526',
        height: 250,
        borderBottomRightRadius:25,
        borderBottomLeftRadius:25,
        borderWidth: 3,
        borderColor:"#FFFFFF"
    },
    descContainer:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FFFFFF',
        borderColor:'#FFFFFF',
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
    },
    card:{
    // backgroundColor:'#fff',
    borderRadius:10,
    boxShadow:'0 10px 10px rgba(0, 0, 0, 0.2)',
    display:'flex',
    flexDirection:'row',
    maxWidth:'100%',
    margin:20,
    overflow:'hidden',
    width:350,
    backgroundColor:'#2A265F'
    },
    subCard:{
        // backgroundColor:'#2A265F',
        // color:'white',
        // padding:30,
        maxWidth:150,
    },
    cardInfo:{
        padding:10,
        position:'relative',
        width:'100%'
    },
    cardInfoDetails:{
        position:'absolute',
        top:20,
        right:170,
        textAlign:'right',
        width:150
    },
})

export default ServiceDetails
