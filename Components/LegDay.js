import { useState } from 'react';
import { Text, View, Pressable, FlatList, Alert } from 'react-native';
import { styles } from "../Styles";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function LegDay({ dates, setDates, navigation }) {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  // Change current date to new date
  const onChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  // Saving dates
  const handleSave = () => {
    const exists = dates.some(
      (d) => d.toDateString() === date.toDateString()
    );
    if (!exists) {
      setDates([date, ...dates]);
      setShow(false);
    } else {
      Alert.alert("Date already exists");
    }
  }

  // Delete date
  const deleteDate = (selectedDate) => {
    Alert.alert(
      "Delete Date",
      "Are you sure you want to delete the date?",
      [
        {text: "Cancel", style: "cancel"},
        {text: "Delete", style: "destructive",
          onPress: () => {
            const newDates = dates.filter(
              (d) => d.toDateString() !== selectedDate.toDateString()
            );
            setDates(newDates);
          },
        },
      ]
    );
  }

  // Formatting date
  const formatDate = (d) => {
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <FlatList
      data={dates}
      keyExtractor={(item) => item.toString()}
      ListHeaderComponent={
        <View style={styles.dateContainer}>
          {show && (
            <View>
              <Text style={styles.datePickerText}>{formatDate(date)}</Text>
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                onChange={onChange}
                display="spinner">
              </DateTimePicker>
              <Pressable style={styles.saveButton} onPress={handleSave} >
                <Text style={styles.listText}>SAVE</Text>
              </Pressable>
              <Pressable style={styles.cancelButton} onPress={() => setShow(false)}>
                <Text style={styles.cancelButtonText}>CANCEL</Text>
              </Pressable>
            </View>
          )}
          {!show && (
            <View>
              <Pressable style={styles.addButton} onPress={() => setShow(true)}>
                <Text style={styles.addButtonText}>ADD DATE</Text>
              </Pressable>
              <FlatList
                data={dates}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item }) => (
                  <View style={styles.dateList}>
                    <Pressable
                      style={styles.listButton}
                      onPress={() => navigation.navigate('DateDetails', {
                        date: item,
                        screenName: "Legs"})}>
                      <Text style={styles.listText}>
                        {formatDate(item)}
                      </Text>
                      <Pressable style={styles.deleteButton} onPress={() => deleteDate(item)}>
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
    />
  );
}