import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../app/screens/Homescreen';
import AddExpenseScreen from '../app/screens/AddExpenseScreen';
import ExpenseListScreen from '../app/screens/ExpenseListScreen';

export type RootStackParamList = {
  Home: undefined;
  AddExpense: undefined;
  ExpenseList: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
 <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
      <Stack.Screen name="ExpenseList" component={ExpenseListScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
