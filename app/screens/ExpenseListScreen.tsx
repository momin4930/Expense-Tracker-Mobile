import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Expense } from '../../types/Expense'; // Your Expense type

export default function ExpenseListScreen() {
  const navigation = useNavigation();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDate, setSelectedDate] = useState('All');
  const [graphData, setGraphData] = useState<number[]>(Array(12).fill(0));
  const categories = ['All', 'Food', 'Transport', 'Entertainment', 'Utilities', 'Others'];
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await AsyncStorage.getItem('expenses');
        const parsed: Expense[] = data ? JSON.parse(data) : [];
        setExpenses(parsed);
        setFilteredExpenses(parsed);
        generateGraphData(parsed);
      } catch (error) {
        console.error('Error parsing stored expenses:', error);
        setExpenses([]);
        setFilteredExpenses([]);
        setGraphData(Array(12).fill(0));
      }
    };

    fetchExpenses();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = expenses;

      if (selectedCategory !== 'All') {
        filtered = filtered.filter((expense) => expense.category === selectedCategory);
      }

      if (selectedDate !== 'All') {
        filtered = filtered.filter((expense) => {
          const expenseDate = new Date(expense.date);
          const expenseYearMonth = `${expenseDate.getFullYear()}-${expenseDate.getMonth() + 1}`;
          return expenseYearMonth === selectedDate;
        });
      }

      setFilteredExpenses(filtered);
      generateGraphData(filtered);
    };

    applyFilters();
  }, [selectedCategory, selectedDate, expenses]);

  const generateGraphData = (filteredExpenses: Expense[]) => {
    const months = Array(12).fill(0);

    filteredExpenses.forEach((expense) => {
      const expenseDate = new Date(expense.date);
      const month = expenseDate.getMonth();
      months[month] += expense.amount;
    });

    setGraphData(months);
  };

  const getUniqueYearMonths = (): string[] => {
    const set = new Set<string>();
    expenses.forEach((expense) => {
      const d = new Date(expense.date);
      const yM = `${d.getFullYear()}-${d.getMonth() + 1}`;
      set.add(yM);
    });
    return Array.from(set);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Text style={styles.heading}>Expense Visualization</Text>

      {/* <Button title="Go Back" onPress={() => navigation.goBack()} /> */}

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Category</Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={styles.picker}
        >
          {categories.map((category, index) => (
            <Picker.Item label={category} value={category} key={index} />
          ))}
        </Picker>

        <Text style={styles.filterLabel}>Date (Year-Month)</Text>
        <Picker
          selectedValue={selectedDate}
          onValueChange={(itemValue) => setSelectedDate(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="All" value="All" />
          {getUniqueYearMonths().map((yearMonth, idx) => (
            <Picker.Item label={yearMonth} value={yearMonth} key={yearMonth + idx} />
          ))}
        </Picker>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Monthly Expense Breakdown</Text>
        <LineChart
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
              {
                data: graphData.length === 12 ? graphData : Array(12).fill(0),
                strokeWidth: 2,
                color: (opacity = 1) => `rgba(0, 255, 195, ${opacity})`,
              },
            ],
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#121212',
            backgroundGradientFrom: '#121212',
            backgroundGradientTo: '#121212',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
        />
      </View>

      <View style={styles.expensesContainer}>
        <Text style={styles.subHeading}>Filtered Expenses</Text>
        {filteredExpenses.length === 0 ? (
          <Text style={styles.noExpenses}>No expenses match your filters.</Text>
        ) : (
          filteredExpenses.map((expense) => (
            <View style={styles.expenseCard} key={expense.id}>
              <Text style={styles.expenseTitle}>{expense.title}</Text>
              <Text style={styles.expenseAmount}>Rs {expense.amount.toFixed(2)}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    backgroundColor: '#121212',
    padding: 20,
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    paddingTop: 30,
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    marginBottom: 20,
    color: '#808080',
  },
  chartContainer: {
    marginBottom: 30,
  },
  chartTitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  expensesContainer: {
    marginTop: 20,
  },
  subHeading: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  noExpenses: {
    color: '#888',
    textAlign: 'center',
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
  expenseTitle: {
    fontSize: 16,
    color: '#fff',
  },
  expenseAmount: {
    fontSize: 16,
    color: '#00ffc3',
  },
});
