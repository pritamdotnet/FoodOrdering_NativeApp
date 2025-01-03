import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = 'https://sbmhntczahvqihmfcuoo.supabase.co';
const supabaseAnonKey = 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNibWhudGN6YWh2cWlobWZjdW9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4ODAzMzcsImV4cCI6MjA1MTQ1NjMzN30.D1eS6_gbvg37hUs0ovnku9enqjCGDwIf2Z0WjgTXdUc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});