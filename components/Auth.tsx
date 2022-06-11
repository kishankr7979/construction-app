import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, View, TextInput, Button, Text } from 'react-native';
import { supabase } from '../lib/supabase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserIcon from 'react-native-vector-icons/FontAwesome';
import Onboarding from '../components/Onboarding';
import Dialog from 'react-native-dialog';
//import Prompt from 'react-native-prompt';
export default function Auth({navigation}) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false);
  const [submitButtonState, setSubmitButtonState] = useState(false);
  const [promptVisibility, setPromptVisibility] = useState({
    isVisible: false,
    message: '',
  });
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
  })
  async function signInWithEmail() {
    try{
      const { user, error } = await supabase.auth.signIn({
        email: authData.email,
        password: authData.password,
      })
      const storeValue = JSON.stringify(user);
      await AsyncStorage.setItem('authenticatedUser', storeValue);
      if (error) {
        Alert.alert(error.message) 
        return
      }
    }
    catch(e){
      console.log(e);
    }
  }
  async function signUpWithEmail() {
    setLoading(true)
    const { user, error } = await supabase.auth.signUp({
      email: authData.email,
      password: authData.password,
    })
    const storeValue = JSON.stringify(user);
    await AsyncStorage.setItem('authenticatedUser', storeValue);
    if (error) Alert.alert(error.message)
    if(user) Alert.alert('Please confirm your email and then sign In');
    setLoading(false)
  }
  const onSubmit = async() => {
    if(showSignUp){
      // const passData = JSON.stringify(authData);
      // await AsyncStorage.setItem('authData', passData);
      // setStep(2);
     await signUpWithEmail();
    }
    else {
      await signInWithEmail();
    }
     // showSignUp ? await signUpWithEmail() : await signInWithEmail();
  }

  const signUpState = () => {
    setShowSignUp(!showSignUp);
    setAuthData({...authData, email: ''});
    setAuthData({...authData, password: ''});
  }
  useEffect(() => {
    if(authData.email.length < 5 || authData.password.length < 4){
      setSubmitButtonState(true);
    }
    else{
      setSubmitButtonState(false);
    }
  },[authData.email, authData.password])
  const forgotPassword = () => {
    console.log('triggered');
    setPromptVisibility({...promptVisibility, isVisible: true, message: ''});
  //  Alert.prompt('title', 'subtitle', text => console.log(text));
  }
  const closePrompt = async() => {
    if(promptVisibility.message === ''){
      return;
    }
    console.log(typeof promptVisibility.message)
    setPromptVisibility({...promptVisibility, isVisible: false});
    const { data, error } = await supabase.auth.api
    .resetPasswordForEmail(promptVisibility.message);
    console.log(data);
    if(error){
      console.log(error);
    }
  }
  const submitPrompt = (value) => {
    setPromptVisibility({...promptVisibility, isVisible: false, message: value});
  }
  return (
    <>
    <View style={styles.container}>
        <View style={styles.titleContainer}>
        <Text style={styles.title}>CONSTRUCTECH</Text>
      </View>
      <View style={styles.loginContainer}>
        <View style={{ position: 'absolute', top: 50, }}>
          <UserIcon name='user-circle' size={50} />
        </View>
        <TextInput
          onChangeText={(text) => setAuthData({...authData, email: text})}
          value={authData.email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
          style={styles.inputArea}
        />
        <View style={styles.Spacer} />
        <TextInput
          onChangeText={(text) => setAuthData({...authData, password: text})}
          value={authData.password}
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
      <View>
        {!showSignUp && <><Text onPress={forgotPassword} style={{ color: '#2196F3', fontWeight: 'bold' }}>Forgot Password</Text>
        <Dialog.Container visible={promptVisibility.isVisible}>
          <Dialog.Title>Forgot password</Dialog.Title>
          <Dialog.Input value={promptVisibility.message} onChangeText={(text) => setPromptVisibility({...promptVisibility, message: text})}></Dialog.Input>
          <Dialog.Button label={<Text>send</Text>} onPress={closePrompt}></Dialog.Button>
        </Dialog.Container>
  
        </>}
      </View>
      </View>
    </>
  );
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