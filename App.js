import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChestDay from './Components/ChestDay'
import BackDay from './Components/BackDay'
import LegDay from './Components/LegDay'
import AbsAndArmsDay from './Components/AbsAndArmsDay'
import HomeScreen from './Components/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [datesByScreen, setDatesbyScreen] = useState({
    ChestDay: [], 
    BackDay: [], 
    LegDay: [], 
    AbsAndArmsDay: []
  });

  const updateDates = (screen, newDates) => {
    setDatesbyScreen((prev) => ({
      ...prev,
      [screen]: newDates,
    }));
  };

  return (
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}