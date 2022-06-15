import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js'
import Constants from 'expo-constants';
export const supabaseConfig = Constants.manifest?.extra?.supabase;

export const supabase = createClient(supabaseConfig.url, supabaseConfig.publicKey, {
  localStorage: AsyncStorage as any,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
});