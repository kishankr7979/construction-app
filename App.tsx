
import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
//import firebase from './firebase';
export default function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const sendVerification = () => {}
  // const sendVerification = () => {
  //   const phoneProvider = new firebase.auth.PhoneAuthProvider();
  //   phoneProvider
  //     .verifyPhoneNumber(phoneNumber)
  //     .then(setVerificationId);
  // };
  const confirmCode = () => { };

  return (
    <View style={styles.container}>
    <TextInput
      placeholder="Phone Number"
      onChangeText={setPhoneNumber}
      keyboardType="phone-pad"
    />
    <TouchableOpacity onPress={sendVerification}>
      <Text>Send Verification</Text>
    </TouchableOpacity>
    {/* Verification Code Input */}
    <TextInput
      placeholder="Confirmation Code"
      onChangeText={setCode}
      keyboardType="number-pad"
    />
    <TouchableOpacity onPress={confirmCode}>
      <Text>Send Verification</Text>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
