import React, { useState, useEffect } from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import OnboardingFormOne from '../components/OnboardingFormOne';
import OnboardingProducts from '../components/OnboardingProducts';
const Onboarding = () => {
    const [stepper, setStepper] = useState(1);
    // const goToNextStep = () => {
    //     setStepper(1);
    // }
    return (
        <View>
            {stepper === 1 ?
                <OnboardingProducts setStep={setStepper}/>
                : <OnboardingFormOne />}
        </View>
    )
}

const styles = StyleSheet.create({
    mainConatiner: {
        flex: 1,
    }
})

export default Onboarding
