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

  const [exercisesByScreen, setExercisesByScreen] = useState ({});

  // Load data from storage
  useEffect(() => {
    const loadAll = async () => {
      try {

        // Load dates
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

        // Load exercises
        const storedExercises = await AsyncStorage.getItem('EXERCISES_BY_SCREEN');
        if (storedExercises) {
          setExercisesByScreen(JSON.parse(storedExercises));
        }

      } catch (e) {
        console.error('Error loading data', e);
      }
    };

    loadAll();
  }, []);

  // Save dates
  useEffect(() => {
    AsyncStorage.setItem("DATES_BY_SCREEN", JSON.stringify(datesByScreen));
  }, [datesByScreen]);

  // Save exercises
    useEffect(() => {
    AsyncStorage.setItem("EXERCISES_BY_SCREEN", JSON.stringify(exercisesByScreen));
  }, [exercisesByScreen]);

  // Update dates for each screen
  const updateDates = (screen, newDates) => {
     setDatesByScreen((prev) => ({
       ...prev,
       [screen]: newDates,
    }));
  };

  // Update exercises for each screen
  const updateExercises = (screen, dateKey, exercises) => {
    setExercisesByScreen(prev => ({
      ...prev,
      [screen]: {
        ...(prev[screen] || {}),
        [dateKey]: exercises
      }
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
          <Stack.Screen name="DateDetails">
            {(props) => (
              <DateDetails
                {...props}
                exercisesByScreen={exercisesByScreen}
                updateExercises={updateExercises} />)}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}