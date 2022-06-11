import { useState, useEffect, useLayoutEffect } from "react";
import { supabase } from "../lib/supabase";
import { StyleSheet, View, Alert } from "react-native";
import { Button, Input } from "react-native-elements";
import { ApiError, Session } from "@supabase/supabase-js";
import {TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Account({navigation},{ session }: { session: Session }) {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [avatar_url, setAvatarUrl] = useState("");
  const [apiData, setApiData] = useState<any>();
  const [userSession, setUserSession] = useState<any>(null)
  useEffect(() => {
    if (session){ 
      getProfile()
    };
  }, []);
  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      if (!user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      Alert.alert((error as ApiError).message);
    } finally {
      setLoading(false);
    }
  }
const fetchApiData = async(userId) => {
  const { data, error } = await supabase
  .from('user-db')
  .select()
  .match({uuid: userId})
  if(data){
    setApiData(data);
  }
  if(error){
    console.log(error);
  }
}
useEffect(() => {
  setUserSession(supabase.auth.session())
}, []);
useEffect(() => {
  if(userSession?.user?.id !== undefined){
  (async() => {
    await fetchApiData(userSession?.user?.id);
    AsyncStorage.setItem('userId', userSession?.user?.id)
  })()
}
},[userSession?.user?.id])
useEffect(() => {
  if(apiData?.length === 0){
    console.log('new user');
    navigation.navigate('Onboarding')
  }
  else{
    console.log('existing user');
  }
})
console.log(apiData);
  return (
      <View style={styles.container}>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  backgroundColor: '#000000',
  },
});