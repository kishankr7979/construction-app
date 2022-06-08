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
  (async() => {
    await fetchApiData(userSession?.user?.id);
  })()
},[userSession?.user?.id !== undefined])
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
    <View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput placeholder='Email' value={session?.user?.email}/>
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          placeholder="Username"
          value={username || ""}
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          placeholder="Website"
          value={website || ""}
          onChangeText={(text) => setWebsite(text)}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={async() => {
          supabase.auth.signOut()
          }} />
      </View>
      <Button title='OnboardingForm' onPress={() => navigation.navigate('OnboardingFormOne')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});