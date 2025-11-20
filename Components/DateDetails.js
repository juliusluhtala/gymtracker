import { Text, View, Pressable, FlatList, Alert, TextInput, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { styles } from "../Styles";
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

export default function DateDetails({ navigation }) {

  const [show, setShow] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState("Bench Press");
  const [weight, setWeight] = useState("");
  const [exercises, setExercises] = useState([]);

  // Preset exercises
  const chestExercises = [
    "Chest Press",
    "Bench Press Barbell",
    "Bench Press Machine",
    "Bench Press Smith",
    "Bench Press Dumbbell",
    "Incline Bench Press Barbell",
    "Incline Bench Press Machine",
    "Incline Bench Press Smith",
    "Incline Bench Press Dumbbell",
    "Pec Fly"
  ];

  // Save exercise
  const addExercise = () => {
    const newEntry = {
      exercise: selectedExercise,
      weight: Number(weight)
    };
    setExercises(prev => [...prev, newEntry]);
    setWeight("");
    setShow(false);
  };

  // Delete exercise
  const deleteExercise = (exerciseObj) => {
    Alert.alert(
      "Delete Exercise",
      "Are you sure you want to delete the exercise?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete", style: "destructive",
          onPress: () => {
            setExercises((prev) =>
              prev.filter((e) => !(e.exercise === exerciseObj.exercise && e.weight === exerciseObj.weight)));
          },
        },
      ]
    );
  }

  console.log(exercises);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}>
      <FlatList
        data={exercises}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <View>
            {show && (
              <View style={styles.picker}>
                <Text style={styles.pickerText}>Exercise</Text>
                <Picker
                  selectedValue={selectedExercise}
                  onValueChange={(itemValue) => setSelectedExercise(itemValue)}>
                  {chestExercises.map((ex) => (
                    <Picker.Item key={ex} label={ex} value={ex} />
                  ))}
                </Picker>
                <Text style={styles.pickerText}>Weight(kg)</Text>
                <TextInput style={styles.textInput}
                  keyboardType="numeric"
                  value={weight}
                  onChangeText={setWeight} />
                <Pressable style={styles.saveButton} onPress={addExercise}>
                  <Text style={styles.dateListText}>SAVE</Text>
                </Pressable>
              </View>
            )}
            {!show && (
              <View>
                <Pressable style={styles.addButton} onPress={() => setShow(true)}>
                  <Text style={styles.dateListText}>ADD EXERCISE</Text>
                </Pressable>
                <FlatList
                  data={exercises}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View>
                      <Pressable style={styles.listButton}>
                        <Text style={styles.exerciseListText}>
                          {item.exercise}
                        </Text>
                        <Text style={{fontSize: 20}}>{item.weight}kg</Text>
                        <Pressable style={styles.deleteButton} onPress={() => deleteExercise(item)}>
                          <Text style={styles.deleteText}>X</Text>
                        </Pressable>
                      </Pressable>
                    </View>
                  )}
                />
              </View>
            )}
          </View>
        }
        keyboardShouldPersistTaps="handled"
      />
    </KeyboardAvoidingView>
  );
}