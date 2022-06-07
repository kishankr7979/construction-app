import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, View, TextInput, Button, Text } from 'react-native'
import { supabase } from '../lib/supabase'
// import { Icon } from ''
import UserIcon from 'react-native-vector-icons/FontAwesome';
export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false);
  async function signInWithEmail() {
    setLoading(true)
    const { user, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  const onSubmit = async() => {
      showSignUp ? await signUpWithEmail() : await signInWithEmail();
  }

  const signUpState = () => {
    console.log('clicked')
    setShowSignUp(!showSignUp);
  }
  async function signUpWithEmail() {
    setLoading(true)
    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) console.log(error.message)
    setLoading(false)
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>CONSTRUCTECH</Text>
      </View>
      <View style={styles.loginContainer}>
        <View style={{ position: 'absolute', top: showSignUp ? 30 : 50, }}>
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
          <Button title={showSignUp ? 'SIGN UP' : 'SIGN IN'} disabled={loading} onPress={onSubmit} />
        </View>
      </View>
      <View>
       <Text style={{ color: '#FFFFFF' }}>{!showSignUp ? 'Not having account?' : 'Already having account?'}<Text style={{ color: '#2196F3', fontWeight: 'bold' }} onPress={signUpState}>{!showSignUp ? 'Sign Up' : 'Sign In'}</Text></Text>
      </View>
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
    backgroundColor: 'black',
  },
  titleContainer: {
    position: 'relative',
    top: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 50,
  },
  loginContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
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