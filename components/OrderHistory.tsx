import React from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import OrderHistoryIcon from 'react-native-vector-icons/Feather';
const OrderHistory = ({navigation}) => {
    const navigateToHomePage = () => {
        navigation.navigate('Home');
    }
    return (
        <ScrollView contentContainerStyle={styles.parentContainer}>
                    <View style={styles.emptyStateContainer}>
                        <OrderHistoryIcon name='package' size={100} color='#651fff' />
                        <Text style={styles.textStyle}>You have not placed any order yet :(</Text>
                         <Text style={styles.subTextStyle} onPress={navigateToHomePage}>Place order</Text>
                    </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    parentContainer: {
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    emptyStateContainer: {
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    textStyle: {
        padding: 10,
        fontSize: 20,
        color: '#242526',
    },
    subTextStyle: {
        padding: 10,
        fontSize: 25,
        color: '#651fff',
        fontWeight: 'bold',
    }
})

export default OrderHistory
