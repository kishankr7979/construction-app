import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Button, ImageBackground, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from "../lib/supabase";
interface OnboardingFormOne {
  setStep: (id) => void;
}
const OnboardingFormOne = ({setStep}: OnboardingFormOne) => {
  let [formData, setFormData] = useState({
    name: '',
    phone: '',
    occupation: '',
    address: '',
  })

  const formFields: any = [
    {
      id: 1,
      fieldName: 'name',
      placeholder: 'Name',
      isMandatory: true,
      value: formData.name,
      onchange: (val) => setFormData({ ...formData, name: val })
    },
    {
      id: 2,
      fieldName: 'phone',
      placeholder: 'Phone',
      isMandatory: true,
      value: formData.phone,
      onchange: (val) => setFormData({ ...formData, phone: val })
    },
    {
      id: 3,
      fieldName: 'occupation',
      placeholder: 'Occupation',
      isMandatory: true,
      value: formData.occupation,
      onchange: (val) => setFormData({ ...formData, occupation: val })
    },
    {
      id: 4,
      fieldName: 'address',
      placeholder: 'Address',
      isMandatory: true,
      value: formData.address,
      onchange: (val) => setFormData({ ...formData, address: val })
    }
  ]

  const [submitButtonState, setSubmitButtonState] = useState(false);
  const [userDetails, setUserDetails] = useState<any>();
  const getDataFromAsyncStorage = async() => {
    try{
        const jsonValue = await AsyncStorage.getItem('authenticatedUser');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    }
    catch(e){
        console.log(e);
    }
}
useEffect(() => {
    (async () => {
        setUserDetails(await getDataFromAsyncStorage());
      })();
},[])

  useEffect(() => {
    if (formData.name.length > 0 && formData.address.length > 0 && formData.occupation.length > 0 && formData.phone.length > 0) {
      setSubmitButtonState(true);
    }
    else {
      setSubmitButtonState(false);
    }
  }, [formData])
  const sendFormData = async () => {
    console.log(formData);
    const { data, error } = await supabase
    .from('user-db')
    .insert([

      { created_at: new Date(), name: formData.name, phone: formData.phone, address: formData.address, occupation: formData.occupation, uuid:  userDetails.id},
    ])
    console.log(data);
    if(error){
     console.log(error);
    }
    // setStep(3);
  }
  return (
    <ImageBackground source={require('../assets/hammer.jpeg')} style={[styles.container]}>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          {
            formFields.map((items) => {
              return (
                <View key={items.id}>
                  {items.isMandatory && <Text style={styles.mandatory} >*</Text>}
                  <TextInput style={styles.TextInputStyleClass} placeholder={items.placeholder}
                    value={items.value} onChangeText={(val) => items.onchange(val)} placeholderTextColor="black" keyboardType={items.id === 2 ? 'number-pad' : 'default'} />
                </View>
              )
            })
          }
        </View>
        <View style={styles.buttonContainer}>
          <Button title='NEXT' onPress={sendFormData} disabled={!submitButtonState} color='#2196F3' />
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
  },

  formContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    borderRadius: 20,
    height: 500,
    backgroundColor: '#FFFFFF',
    borderColor: '#2196F3',
    borderWidth: 5,
    boxShadow: 10,
    opacity: 0.8,
  },
  inputContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
  },
  TextInputStyleClass: {
    textAlign: 'center',
    height: 50,
    width: 250,
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    margin: 10,
    fontWeight: 'bold',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  mandatory: {
    color: 'red',
  }

})

export default OnboardingFormOne
