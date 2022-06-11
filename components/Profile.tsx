import { View, Text, StyleSheet, ScrollView, Linking, TouchableWithoutFeedback} from 'react-native';
import React, { useEffect, useState } from 'react'
import { supabase } from "../lib/supabase";
import Loader from '../common/Loader';
import CheckIcon from 'react-native-vector-icons/Entypo'
import UserIcon from 'react-native-vector-icons/FontAwesome';
import { WebView } from 'react-native-webview';
const Profile = ({navigation}) => {
    const [userSession, setUserSession] = useState<any>();
    const [userDetails, setUserDetails] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [serviceDetails, setServiceDetails] = useState<any>();
    const fetchUserSession = async () => {
        const user = supabase.auth.user();
        setUserSession(user);
    }
    const getUserDetails = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('user-db')
            .select()
            .match({ uuid: userSession?.id })
        setUserDetails(data);
        if (error) {
            console.log(error);
        }
        setLoading(false);
    }
    const getServicesDetails = async () => {
        const { data, error } = await supabase
            .from('services-db')
            .select()
            .match({ uuid: userSession?.id })
        setServiceDetails(data);
        if (error) {
            console.log(error);
        }
    }
    const openWebview = () => {
        console.log('triggered');
        navigation.navigate('Webview', {url: `https://constructech-webview.netlify.app/update-form?id=${userSession?.id}`, afterWebviewClose: 'Profile'});
    }
    useEffect(() => {
        Promise.all([fetchUserSession(), getUserDetails(), getServicesDetails()])
    }, [userSession?.id !== undefined, userDetails !== undefined, userDetails !== null, serviceDetails !== undefined, serviceDetails !== null])
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            Promise.all([fetchUserSession(), getUserDetails(), getServicesDetails()])
        });
        return unsubscribe;
      }, [navigation]);

    return (
        <ScrollView >
            <View style={styles.container}>
                    {!loading && <View style={styles.avatarContainer}>
                    <UserIcon name='user' size={30} color='#2196F3' />
                </View>}
            <View style={styles.userDetailsContainer}>
                {loading ? (<Loader />) : (<>
                <View style={styles.editContainer}>
                <UserIcon name='edit' size={30} color='#2196F3' onPress={openWebview}/>
                </View>
                    <View style={styles.userDetails}>
                        <Text style={styles.detailTitle}>Name:</Text>
                        <Text style={styles.detailsDescription}>{userDetails?.[0]?.name}</Text>
                    </View>
                    <View style={styles.userDetails} >
                        <Text style={styles.detailTitle}>Phone:</Text>
                        <Text style={styles.detailsDescription}>{userDetails?.[0]?.phone}</Text>
                    </View>
                    <View style={styles.userDetails}>
                        <Text style={styles.detailTitle}>Occupation:</Text>
                        <Text style={styles.detailsDescription}>{userDetails?.[0]?.occupation}</Text>
                    </View>
                    <View style={styles.userDetails}>
                        <Text style={styles.detailTitle}>Address:</Text>
                        <Text style={styles.detailsDescription}>{userDetails?.[0]?.address}</Text>
                    </View>
                    <View style={styles.userDetails}>
                        <Text style={styles.detailTitle}>Email:</Text>
                        <Text style={styles.detailsDescription}>{userSession?.email}</Text>
                    </View>
                </>)}
            </View>
            <View style={styles.userDetailsContainer}>
                {loading ? <Loader /> : (
                    <>
                     <Text style={{fontSize: 30,}}>Services</Text>
                     {serviceDetails?.[0].package && (
                         <View style={styles.userDetails}>
                             <Text style={styles.detailTitle}>Complete Package: </Text>
                             <CheckIcon name='check' size={30} />
                         </View>
                     )}
                     {!serviceDetails?.[0]?.package && (
                         <>
                             <View style={styles.userDetails}>
                                 <Text style={styles.detailTitle}>
                                     Flooring
                              </Text>
                                 {serviceDetails?.[0]?.custom_services?.flooring ? <CheckIcon name='check' size={30} color='#2196F3'/> : <CheckIcon name='cross' size={30} color='red'/>}
     
                             </View>
                             <View style={styles.userDetails}>
                                 <Text style={styles.detailTitle}>
                                     Furnishing
                              </Text>
                                 {serviceDetails?.[0]?.custom_services?.furnishing ? <CheckIcon name='check' size={30} color='#2196F3'/> : <CheckIcon name='cross' size={30} color='red'/>}
     
                             </View>
                             <View style={styles.userDetails}>
                                 <Text style={styles.detailTitle}>
                                     Painting
                              </Text>
                                 {serviceDetails?.[0]?.custom_services?.painting ? <CheckIcon name='check' size={30} color='#2196F3'/> : <CheckIcon name='cross' size={30} color='red'/>}
     
                             </View>
                             <View style={styles.userDetails}>
                                 <Text style={styles.detailTitle}>
                                     Plumber
                              </Text>
                                 {serviceDetails?.[0]?.custom_services?.plumber ? <CheckIcon name='check' size={30} color='#2196F3'/> : <CheckIcon name='cross' size={30} color='red'/>}
     
                             </View>
                         </>
                     )}
                     </>
                )}
            </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: '#000000',
    },
    userDetailsContainer: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
        width: '90%',
        backgroundColor: '#FFFFFF',
        marginBottom: 20,
        paddingTop: 20,
    },
    avatarContainer: {
        height: 80, width: 80, borderWidth: 2, borderColor: '#2196F3', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 80, position: 'relative', top: 35, zIndex: 2,backgroundColor: '#FFFFFF',
    },
    userDetails: {
        display: 'flex',
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-between',
        gap: 10,
        alignItems: 'center',
        // margin: 10,
        padding: 10,
    },
    detailTitle: {
        color: '#000000',
        fontSize: 20,
    },
    detailsDescription: {
        color: '#2196F3',
        fontSize: 20,
        marginLeft: 20,
        marginRight: 10,
    },
    editContainer: {
        position: 'absolute',
        top: 5,
        right: 5,
    }
})
export default Profile
