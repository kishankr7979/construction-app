import React from 'react'
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

interface LoaderProps {
    color?: string;
    size?: 'small' | 'large' | undefined | number;
    position?: 'relative' | 'absolute';
    top?: string;
    left?: string;
};

const Loader = ({color = '#2196F3', size='large', position='relative', top='50%', left='50%'}: LoaderProps) => {
    return (
        <View style={[styles.container, {position: position, top: top, left: left}]}>
            <ActivityIndicator size={size} color={color}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    }
})
export default Loader

