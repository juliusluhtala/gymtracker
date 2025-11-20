import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ChestDay from './Components/ChestDay'
import BackDay from './Components/BackDay'
import LegDay from './Components/LegDay'
import AbsAndArmsDay from './Components/AbsAndArmsDay'
import HomeScreen from './Components/HomeScreen'
import DateDetails from './Components/DateDetails'

const Stack = createNativeStackNavigator();

export default function App() {
  const [datesByScreen, setDatesByScreen] = useState({
    ChestDay: [], 
    BackDay: [], 
    LegDay: [], 
    AbsAndArmsDay: []
  });

  // Load data from storage
  useEffect(() => {
    const loadData = async () => {
      try {
        const stored = await AsyncStorage.getItem('DATES_BY_SCREEN');
        if (stored) {
          const parsed = JSON.parse(stored);

          // Convert string dates back to Date objects
          const restored = Object.fromEntries(
            Object.entries(parsed).map(([key, arr]) => [
              key,
              arr.map((d) => new Date(d)),
            ])
          );

          setDatesByScreen(restored);
        }
      } catch (e) {
        console.error('Error loading saved dates', e);
      }
    };

    loadData();
  }, []);

  // Save whenever data changes
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem(
          'DATES_BY_SCREEN',
          JSON.stringify(datesByScreen)
        );
      } catch (e) {
        console.error('Error saving dates', e);
      }
    };

    saveData();
  }, [datesByScreen]);

  // Update dates for each screen
  const updateDates = (screen, newDates) => {
     setDatesByScreen((prev) => ({
       ...prev,
       [screen]: newDates,
    }));
  };

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chest" >
            {(props) => (
              <ChestDay {...props} 
              dates={datesByScreen.ChestDay} 
              setDates={(newDates) => updateDates("ChestDay", newDates)} />)}
          </Stack.Screen> 
          <Stack.Screen name="Back">
            {(props) => (
              <BackDay {...props} 
              dates={datesByScreen.BackDay} 
              setDates={(newDates) => updateDates("BackDay", newDates)} />)}
          </Stack.Screen> 
          <Stack.Screen name="Legs">
            {(props) => (
              <LegDay {...props} 
              dates={datesByScreen.LegDay} 
              setDates={(newDates) => updateDates("LegDay", newDates)} />)}
            </Stack.Screen>
          <Stack.Screen name="Abs&Arms">
            {(props) => (
              <AbsAndArmsDay {...props} 
              dates={datesByScreen.AbsAndArmsDay} 
              setDates={(newDates) => updateDates("AbsAndArmsDay", newDates)} />)}
          </Stack.Screen>
          <Stack.Screen name="DateDetails" component={DateDetails}/> 
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}