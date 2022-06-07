import { View, Text, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { supabase } from "../lib/supabase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiError, Session } from "@supabase/supabase-js";
const Home = ({navigation},{ session }: { session: Session }) => {
    const [userDetails, setUserDetails] = useState<any>();
    const [parsedData, setParsedData] = useState();
    const getDataFromAsyncStorage = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('authenticatedUser');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        }
        catch (e) {
            console.log(e);
        }
    }
    const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [avatar_url, setAvatarUrl] = useState("");

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

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

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string;
    website: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      if (!user) throw new Error("No user on the session!");

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase
        .from("profiles")
        .upsert(updates, { returning: "minimal" });

      if (error) {
        throw error;
      }
    } catch (error) {
      Alert.alert((error as ApiError).message);
    } finally {
      setLoading(false);
    }
  }
    useEffect(() => {
        (async () => {
            setUserDetails(await getDataFromAsyncStorage());
        })();
    }, [])
    return (
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}><Text>hi {userDetails?.id}</Text></View>
    );

}
export default Home;