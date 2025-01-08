import { View, Text, Button } from 'react-native'
import React from 'react'
import { supabase } from '@/lib/supabase';

const ProfileScreen = () => {
    console.warn('Rendering ProfileScreen...');
  return (
    <View>
      <Text>Profile</Text>

      <Button 
        title='Sign out' 
        onPress={async () => {
            console.log('Signing out...');
            await supabase.auth.signOut();
            console.log('Signed out successfully.');
          }}
        />
    </View>
  );
};

export default ProfileScreen;