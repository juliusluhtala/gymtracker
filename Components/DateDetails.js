import { Text, View, Pressable, FlatList, Alert, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { styles } from "../Styles";
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';

export default function DateDetails({ route, exercisesByScreen, updateExercises }) {
  const { date, screenName } = route.params;

  console.log("ROUTE PARAMS:", route.params);
  console.log("SCREEN NAME:", screenName, "DATE:", date);

  const dateKey = date.toISOString().split("T")[0];
  const storedExercises = exercisesByScreen?.[screenName]?.[dateKey] || [];
  const [exercises, setExercises] = useState(storedExercises);

  // Save whenever exercises change
  useEffect(() => {
    updateExercises(screenName, dateKey, exercises);
  }, [exercises]);

  const [show, setShow] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [weight, setWeight] = useState("");

  // Preset exercises
  const exerciseGroups = {
    Chest: ["Chest Press", "Bench Press", "Incline Bench Press", "Pec Fly"],
    Back: ["Lat Pulldown", "Cable Row", "Lower Back", "Fly"],
    Legs: ["Squat", "Leg Press", "Leg Extension", "Leg Curl", "Calf Raise"],
    "Abs&Arms": ["Bicep Curl", "Hammer Curl", "Tricep Pushdown", "Ab crunch", "Leg raises"]
  };

  const exerciseList = screenName ? exerciseGroups[screenName] : [];

  // Save exercise
  const addExercise = () => {
    if (!weight) return;

    const newEntry = {
      exercise: selectedExercise,
      weight: Number(weight)
    };

    setExercises(prev => [...prev, newEntry]);
    setWeight("");
    setSelectedExercise("");
    setShow(false);
  };

  // Delete exercise
  const deleteExercise = (exerciseObj) => {
    Alert.alert(
      "Delete Exercise",
      "Are you sure you want to delete the exercise?",
      [
        {text: "Cancel", style: "cancel"},
        {text: "Delete", style: "destructive",
          onPress: () => {
            const updated = exercises.filter(
              (e) =>
                !(e.exercise === exerciseObj.exercise &&
                  e.weight === exerciseObj.weight)
            );
            setExercises(updated);
          }
        }
      ]
    );
  };

  console.log(exercises);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}>
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
                  {exerciseList.map((ex) => (
                    <Picker.Item key={ex} label={ex} value={ex} />
                  ))}
                </Picker>
                <Text style={styles.pickerText}>Weight(kg)</Text>
                <TextInput style={styles.textInput}
                  keyboardType="numeric"
                  value={weight}
                  onChangeText={setWeight} />
                <Pressable style={styles.saveButton} onPress={addExercise}>
                  <Text style={styles.listText}>SAVE</Text>
                </Pressable>
                <Pressable style={styles.cancelButton} onPress={() => { setShow(false); setWeight(""); setSelectedExercise(exerciseList[0] || ""); }}>
                  <Text style={styles.cancelButtonText}>CANCEL</Text>
                </Pressable>
              </View>
            )}
            {!show && (
              <View>
                <Pressable style={styles.addButton} onPress={() => setShow(true)}>
                  <Text style={styles.addButtonText}>ADD EXERCISE</Text>
                </Pressable>
                <FlatList
                  data={exercises}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View>
                      <Pressable style={styles.listButton}>
                        <Text style={styles.listText}>
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