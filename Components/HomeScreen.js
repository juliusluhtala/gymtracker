import { Pressable, Text, View } from 'react-native';
import { styles } from "../Styles";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
        <View>
          <Text style={styles.titleText}>Choose Muscle Group</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={() => navigation.navigate('Chest')}>
            <Text style={styles.buttonText}>Chest</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => navigation.navigate('Back')}>
            <Text style={styles.buttonText}>Back</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => navigation.navigate('Legs')}>
            <Text style={styles.buttonText}>Legs</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => navigation.navigate('Abs&Arms')}>
            <Text style={styles.buttonText}>Abs&Arms</Text>
          </Pressable>
        </View>
      </View>
  );
}