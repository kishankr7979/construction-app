import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, View, TextInput, Button, Text } from 'react-native';
import { supabase } from '../lib/supabase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserIcon from 'react-native-vector-icons/FontAwesome';
import Onboarding from '../components/Onboarding';
export default function Auth({navigation}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false);
  const [submitButtonState, setSubmitButtonState] = useState(false);
  async function signInWithEmail() {
    setLoading(true)
    try{
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      })
      const storeValue = JSON.stringify(user);
      await AsyncStorage.setItem('authenticatedUser', storeValue);
      if (error) {
        Alert.alert(error.message) 
        return
      }
      navigation.navigate('WelcomeScreen');
    }
    catch(e){
      console.log(e);
    }
   
    setLoading(false)
  }

  const onSubmit = async() => {
    if(showSignUp){
      setStep(2);
    }
    else {
      await signInWithEmail();
    }
     // showSignUp ? await signUpWithEmail() : await signInWithEmail();
  }

  const signUpState = () => {
    setShowSignUp(!showSignUp);
    setEmail('');
    setPassword('');
  }
  async function signUpWithEmail() {
    setLoading(true)
    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })
    console.log(user);
    if (error) Alert.alert(error.message)
    setLoading(false)
  }
  useEffect(() => {
    if(email.length < 5 || password.length < 4){
      setSubmitButtonState(true);
    }
    else{
      setSubmitButtonState(false);
    }
  },[email, password])
  return (
    <>
    {step === 1 ? (<View style={styles.container}>
        <View style={styles.titleContainer}>
        <Text style={styles.title}>CONSTRUCTECH</Text>
      </View>
      <View style={styles.loginContainer}>
        <View style={{ position: 'absolute', top: 50, }}>
          <UserIcon name='user-circle' size={50} />
        </View>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
          style={styles.inputArea}
        />
        <View style={styles.Spacer} />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
          style={styles.inputArea}
        />
        <View style={styles.buttonContainer}>
          <Button title={showSignUp ? 'SIGN UP' : 'SIGN IN'} disabled={submitButtonState} onPress={onSubmit} />
        </View>
      </View>
      <View>
       <Text style={{ color: '#FFFFFF' }}>{!showSignUp ? 'Not having account?' : 'Already having account?'}<Text style={{ color: '#2196F3', fontWeight: 'bold' }} onPress={signUpState}>{!showSignUp ? 'Sign Up' : 'Sign In'}</Text></Text>
      </View>
      </View>) : (<View><Onboarding /><Button title="Back" onPress={() => setStep(1)} /></View>)}
    </>
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
  titleContainer: {
    position: 'relative',
    top: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 45,
  },
  loginContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    borderRadius: 20,
    height: 400,
    backgroundColor: '#FFFFFF',
    borderColor: '#2196F3',
    borderWidth: 5,
    boxShadow: 10,
  },
  inputArea: {
    borderWidth: 1,
    borderColor: '#2196F3',
    width: '80%',
    height: 50,
    borderRadius: 10,
    textAlign: 'center',
  },
  Spacer: {
    marginTop: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  }
})