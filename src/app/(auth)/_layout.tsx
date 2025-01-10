import { useAuth } from '@/providers/AuthProvider';
import {  Redirect, Stack } from 'expo-router';

export default function AuthLayout() {
  const  { session } = useAuth();

  if (session) {
    // console.warn("User is logged in auth:", session.user);
    return <Redirect href={'/'} />;
  }

  return <Stack />;
}