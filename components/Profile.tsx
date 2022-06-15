import { View, Text, StyleSheet, ScrollView, Linking, TouchableWithoutFeedback, Button, Alert } from 'react-native';
import React, { useEffect, useState } from 'react'
import { supabase } from "../lib/supabase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import UiDivider from '../common/UiDivider';
import NextIcon from 'react-native-vector-icons/MaterialIcons';
import { useAuthUser } from '../state/AuthContext';
const Profile = ({ navigation }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [serviceDetails, setServiceDetails] = useState<any>();
    const [userDetails, setUserDetails] = useState<any>();
    const getDataFromAsyncStorage = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        }
        catch (e) {
            console.log(e);
        }
    }
    const user = useAuthUser();
    const getUserDetails = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('user-db')
            .select()
            .match({ uuid: user?.id })
        setUserDetails(data);
        if (error) {
            console.log(error);
        }
        setLoading(false);
    }
    const openWebview = () => {
        const userExist = userDetails?.[0]?.name !== undefined;
        console.log(userExist);
        console.log('triggered');
        navigation.navigate('Webview', { url: `https://constructech-webview.netlify.app/update-profile?id=${user?.id}&userExist=${userExist}`, afterWebviewClose: 'Profile' });
    }
    useEffect(() => {
        getUserDetails();
    }, [user?.id !== undefined])
    console.log(userDetails);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getUserDetails();
        });
        return unsubscribe;
    }, [navigation]);
    const logoutAlert = () =>
        Alert.alert(
            "Logout",
            "are you sure?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Logout", onPress: () => logout() }
            ]
        );
    const logout = () => {
        supabase.auth.signOut()
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.userContainer}>
                <Text style={styles.userName}>Hi, {userDetails?.[0]?.name ? userDetails?.[0]?.name : 'User'}</Text>

                <Button title={userDetails?.[0]?.name ? 'Edit Details' : 'Add Details'} color='#651fff' onPress={openWebview} />
            </View>
            <UiDivider />
            <View style={styles.supportContainer}>
                <Text style={[styles.userName, { fontSize: 15, }]}>Help and Support</Text>
                <NextIcon name='navigate-next' size={30} color='#651fff' />
            </View>
            <UiDivider />
            <View style={styles.supportContainer}>
                <Text style={[styles.userName, { fontSize: 15, }]}>Privacy Policy</Text>
                <NextIcon name='navigate-next' size={30} color='#651fff' />
            </View>
            <UiDivider />
            <View style={styles.supportContainer}>
                <Text style={[styles.userName, { fontSize: 15, }]}>Log Out</Text>
                <NextIcon name='logout' size={30} color='red' onPress={logoutAlert} />
            </View>
            <UiDivider />
            <View style={[styles.versionContainer]}>
                <Text style={{ color: '#242526', }}>version: Beta 0.1.0</Text>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        // backgroundColor: '#000000',
        height: '100%',
        position: 'relative',
    },
    userContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 20,
    },
    userName: {
        fontSize: 25,
        color: '#651fff',
    },
    supportContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        padding: 20,
    },
    versionContainer: {
        position: 'absolute',
        bottom: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
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
        height: 80, width: 80, borderWidth: 2, borderColor: '#2196F3', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 80, position: 'relative', top: 35, zIndex: 2, backgroundColor: '#FFFFFF',
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
