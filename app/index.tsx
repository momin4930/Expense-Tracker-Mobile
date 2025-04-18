
// // app/index.tsx
// import { useEffect } from 'react';
// import { useRouter } from 'expo-router';

// export default function Index() {
//   const router = useRouter();

//   useEffect(() => {
//     router.replace('/screens/Homescreen'); // Redirect instantly to /home
//   }, []);

//   return null; // Optional: show a splash loader if you want
// }


import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import ExpenseListScreen from '../app/screens/ExpenseListScreen';
import HomeScreen from '../app/screens/Homescreen';  // Assume you have a HomeScreen

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationIndependentTree>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Hide the header if you have a custom one
          // gestureEnabled: true,  // Enable swipe gestures for back navigation
          // animation:'slide_from_bottom'  // Enable animations for the screen transitions
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </NavigationIndependentTree>
  );
}

export default App;
