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
        <Stack.Screen name="Gym Tracker" component={HomeScreen} />
        <Stack.Screen name="Chest">
          {(props) => (
            <ChestDay {...props} 
            dates={datesByScreen.ChestDay} 
            setDates={(newDates) => updateDates("ChestDay", newDates)} />)}
        </Stack.Screen> 
        <Stack.Screen name="Back" component={BackDay} />
        <Stack.Screen name="Legs" component={LegDay} />
        <Stack.Screen name="Abs&Arms" component={AbsAndArmsDay} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}