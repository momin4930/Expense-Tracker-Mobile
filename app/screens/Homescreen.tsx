import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Link, useFocusEffect } from 'expo-router';
import { Expense } from '../../types/Expense';

export default function HomeScreen() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>(null);

  // Move animation hooks outside of the conditional logic
  const animatedHeight = useRef(new Animated.Value(90)).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  const fetchExpenses = async () => {
    const data = await AsyncStorage.getItem('expenses');
    const parsed: Expense[] = data ? JSON.parse(data) : [];
    setExpenses(parsed);
    const totalAmount = parsed.reduce((acc, expense) => acc + expense.amount, 0);
    setTotal(totalAmount);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchExpenses();
    }, [])
  );

  const handleDelete = async (id: string) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this expense?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const updated = expenses.filter((expense) => expense.id !== id);
          setExpenses(updated);
          await AsyncStorage.setItem('expenses', JSON.stringify(updated));
          setSelectedExpenseId(null);
          fetchExpenses();
        },
      },
    ]);
  };

  const renderExpense = ({ item }: { item: Expense }) => {
    const isSelected = selectedExpenseId === item.id;

    const handleToggleSelect = () => {
      if (isSelected) {
        // Retract card
        setSelectedExpenseId(null);
        Animated.parallel([
          Animated.timing(animatedHeight, {
            toValue: 90,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(animatedOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }),
        ]).start();
      } else {
        // Expand card
        setSelectedExpenseId(item.id);
        Animated.parallel([
          Animated.timing(animatedHeight, {
            toValue: 140,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(animatedOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
          }),
        ]).start();
      }
    };

    return (
      <TouchableOpacity
        onLongPress={handleToggleSelect}
        onPress={handleToggleSelect}
        activeOpacity={0.8}
      >
        <Animated.View style={[styles.expenseCard, { height: animatedHeight }, isSelected && styles.selectedCard]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.expenseTitle}>{item.title}</Text>
            <Text style={styles.expenseDate}>{new Date(item.date).toDateString()}</Text>

            <Animated.View style={[styles.actionButtons, { opacity: animatedOpacity }]}>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteBtn}>
                <Ionicons name="trash-outline" size={18} color="#000" />
              </TouchableOpacity>
            </Animated.View>
          </View>
          <Text style={styles.expenseAmount}>Rs {item.amount.toFixed(2)}</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.heading}>Total Spent</Text>
        <Text style={styles.total}>Rs {total.toFixed(2)}</Text>

        <Text style={styles.subHeading}>Recent Expenses</Text>
        {expenses.length === 0 ? (
          <Text style={styles.noExpenses}>No expenses yet.</Text>
        ) : (
          expenses
            .slice()
            .reverse()
            .slice(0, 5)
            .map((item) => <View key={item.id}>{renderExpense({ item })}</View>)
        )}
      </Animated.ScrollView>

      <Link href="/screens/AddExpenseScreen" asChild>
        <TouchableOpacity style={styles.fab}>
          <Ionicons name="add" size={28} color="#000" />
        </TouchableOpacity>
      </Link>

      <Link href="/screens/ExpenseListScreen" asChild>
        <TouchableOpacity style={styles.fab2}>
          <Ionicons name="list-circle" size={28} color="#000" />
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  scrollContent: {
    paddingBottom: 120, // to make room for FABs
  },
  heading: {
    fontSize: 22,
    color: '#ffffffcc',
    fontWeight: '600',
    paddingTop: 50,
  },
  total: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#00ffc3',
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 18,
    color: '#ffffffaa',
    marginTop: 20,
    marginBottom: 10,
  },
  noExpenses: {
    color: '#888',
    textAlign: 'center',
    marginTop: 40,
  },
  expenseCard: {
    backgroundColor: '#1f1f1f',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  selectedCard: {
    borderWidth: 1,
    borderColor: '#00ffc3',
  },
  expenseTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  expenseDate: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 4,
  },
  expenseAmount: {
    fontSize: 16,
    color: '#00ffc3',
    fontWeight: '600',
  },
  fab: {
    backgroundColor: '#00ffc3',
    position: 'absolute',
    bottom: 30,
    right: 20,
    padding: 18,
    borderRadius: 50,
    elevation: 5,
    shadowColor: '#00ffc3',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  fab2: {
    backgroundColor: '#00ffc3',
    position: 'absolute',
    bottom: 30,
    left: 20,
    padding: 18,
    borderRadius: 50,
    elevation: 5,
    shadowColor: '#00ffc3',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  editBtn: {
    backgroundColor: '#00ffc3',
    padding: 6,
    borderRadius: 6,
  },
  deleteBtn: {
    backgroundColor: '#ff4d4d',
    padding: 6,
    borderRadius: 6,
  },
});
