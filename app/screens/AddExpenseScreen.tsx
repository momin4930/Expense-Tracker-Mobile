import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Expense } from '../../types/Expense';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native';

export default function AddExpenseScreen() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleAddExpense = async () => {
    if (!title || !amount || !date || !category) {
      setError('Please fill in all fields');
      return;
    }

    const newExpense: Expense = {
      id: Date.now().toString(),
      title,
      amount: parseFloat(amount),
      date,
      category,
    };

    try {
      const existingExpenses = await AsyncStorage.getItem('expenses');
      const expenses: Expense[] = existingExpenses ? JSON.parse(existingExpenses) : [];
      expenses.push(newExpense);
      await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
      Alert.alert('Success', 'Expense added successfully');
      router.push('/screens/Homescreen'); // Navigate back to Home screen
    } catch (error) {
      Alert.alert('Error', 'Could not add expense. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
    <View style={styles.container}>
      <Text style={styles.heading}>Add Expense</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        keyboardType="numeric"
        onChangeText={setAmount}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
        placeholderTextColor="#aaa"
      />

      <Text style={styles.categoryLabel}>Category</Text>
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="Food" value="Food" />
        <Picker.Item label="Transport" value="Transport" />
        <Picker.Item label="Entertainment" value="Entertainment" />
        <Picker.Item label="Utilities" value="Utilities" />
        <Picker.Item label="Others" value="Others" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleAddExpense}>
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    color: '#fff',
    fontSize: 16,
    backgroundColor: '#1e1e1e',
  },
  categoryLabel: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 10,
    color: '#fff',
    marginBottom: 20,
    backgroundColor: '#1e1e1e',
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#00ffc3',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    elevation: 5,
    shadowColor: '#00ffc3',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  buttonText: {
    color: '#121212',
    fontSize: 18,
    fontWeight: '600',
  },
});
