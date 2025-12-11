import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { RequestProvider } from '../context/RequestContext';

export default function RootLayout() {
  return (
    <RequestProvider>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#10b981',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="onboarding" 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="role-selection" 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="(customer)" 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="(technician)" 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="request" 
          options={{ 
            headerShown: false // Hide default header to use custom one
          }} 
        />
        <Stack.Screen 
          name="calculator" 
          options={{ 
            headerShown: false // Hide default header to use custom one
          }} 
        />
        <Stack.Screen 
          name="track/[id]" 
          options={{ title: 'تتبع الطلب' }} 
        />
        <Stack.Screen 
          name="profile" 
          options={{ title: 'الملف الشخصي' }} 
        />
        <Stack.Screen 
          name="login" 
          options={{ 
            title: 'تسجيل الدخول',
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="signup" 
          options={{ 
            title: 'إنشاء حساب',
            headerShown: false 
          }} 
        />
      </Stack>
    </RequestProvider>
  );
}
