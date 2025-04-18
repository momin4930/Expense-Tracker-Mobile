# 💸 Expense Tracker App

An elegantly designed **React Native** app to help you track your expenses, analyze spending patterns, and stay in control of your finances — all in one place!

---

## 🚀 Features

### ✅ Add & Manage Expenses
- Add expenses with a **title**, **amount**, **category**, and **date**.
- Data is stored **locally** using `AsyncStorage` to persist between sessions.

### 📊 Visualize Expenses with Charts
- Interactive **line chart** that displays a **monthly breakdown** of your spending.
- Uses `react-native-chart-kit` for smooth, responsive graphing.
- Graph updates **dynamically** based on selected filters.

### 🔍 Filter Your Expenses
- Filter by:
  - **Category** (Food, Transport, Entertainment, Utilities, Others)
  - **Date** (Year-Month format)
- Filters update both the **graph** and **expense list** in real-time.

### 🧾 Detailed Expense List View
- Expenses are displayed in **stylish cards** showing title and amount.
- Organized with a modern **dark UI** for easy reading and focus.

### 🧠 Persistent Storage
- Built-in **AsyncStorage** ensures all your data remains safe even after closing the app.

### 🧭 Seamless Navigation
- Smooth screen transitions with `React Navigation`.
- Includes **custom back buttons** for better UX control.

### 🌙 Dark Mode UI
- Entire app uses a clean, neon-accented **dark theme** for modern aesthetics and user comfort.

---

## 📸 Screenshots

### Homescreen
<img height="950" alt="ETM" src="https://github.com/user-attachments/assets/9ad7614d-7cdc-4c94-ad41-4e992a187dcd" />

### Add Expenses 
<img height="950" alt="ETM" src="https://github.com/user-attachments/assets/6be45d6c-9d35-44d6-9dd7-5db5af637900" />

### Visualize Expenses
<img height="950" alt="ETM" src="https://github.com/user-attachments/assets/fefebeb7-a36d-4f8c-a79c-75ea84fe63ba" />

---

## 🛠️ Tech Stack

- **React Native** (Expo)
- **TypeScript**
- **AsyncStorage** for data persistence
- **react-native-chart-kit** for data visualization
- **react-navigation** for screen transitions
- **@react-native-picker/picker** for filter selection

---

## 📦 Installation

```bash
git clone https://github.com/your-username/expense-tracker-app.git
cd expense-tracker-app
npm install
npx expo start
npm install @react-native-async-storage/async-storage
npm install @expo/vector-icons
npm install @react-native-picker/picker
npm install react-native-modal-datetime-picker
npm install react-native-chart-kit
npm install @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
npm install -g expo-cli
