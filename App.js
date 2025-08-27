import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChestDay from './Components/ChestDay'
import BackDay from './Components/BackDay'
import LegDay from './Components/LegDay'
import AbsAndArmsDay from './Components/AbsAndArmsDay'
import HomeScreen from './Components/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Gym Tracker" component={HomeScreen} />
        <Stack.Screen name="Chest" component={ChestDay} />
        <Stack.Screen name="Back" component={BackDay} />
        <Stack.Screen name="Legs" component={LegDay} />
        <Stack.Screen name="Abs&Arms" component={AbsAndArmsDay} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}