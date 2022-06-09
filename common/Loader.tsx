import React from 'react'
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

interface LoaderProps {
    color?: string;
    size?: 'small' | 'large' | undefined;
};

const Loader = ({color = '#2196F3', size='large'}: LoaderProps) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={size}  color={color}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    }
})
export default Loader

