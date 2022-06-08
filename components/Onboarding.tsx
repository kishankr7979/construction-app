import React, { useState, useEffect } from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import OnboardingFormOne from '../components/OnboardingFormOne';
import OnboardingProducts from '../components/OnboardingProducts';
import Package from '../components/Package';
interface OnboardingProps {
    email: any;
    password: any;
    navigation: any;
}
const Onboarding = ({email, password, navigation}: OnboardingProps) => {
    const [stepper, setStepper] = useState(1);
    return (
        <View>
            {stepper === 1 ?
                <OnboardingProducts setStep={setStepper}/>
                : stepper === 2 ? <OnboardingFormOne setStep={setStepper}/> : <Package email={email} password={password} navigation={navigation} />}
        </View>
    )
}

const styles = StyleSheet.create({
    mainConatiner: {
        flex: 1,
    }
})

export default Onboarding
