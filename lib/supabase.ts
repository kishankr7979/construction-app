import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js'

const YOUR_REACT_NATIVE_SUPABASE_URL = 'https://gikvmgffezunqzhhdayd.supabase.co'
const YOUR_REACT_NATIVE_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdpa3ZtZ2ZmZXp1bnF6aGhkYXlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQ1NDE1NzQsImV4cCI6MTk3MDExNzU3NH0.--OCI-6wdNPrxvURVJjveWaYg3J39HD92A5sAjTnak0'
const supabaseUrl = YOUR_REACT_NATIVE_SUPABASE_URL
const supabaseAnonKey = YOUR_REACT_NATIVE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage: AsyncStorage as any,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
});