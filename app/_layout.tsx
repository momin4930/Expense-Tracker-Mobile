import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
  return (
    <>
      <StatusBar style="light" hidden={true} />  {/* Hides the status bar */}
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0d0d0d',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShown:false,
          animation:"slide_from_bottom",
          animationDuration:10,
          gestureEnabled:true
        }}
        
      />
      
    </>
  );
}
