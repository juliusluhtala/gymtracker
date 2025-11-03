import { useState } from 'react';
import { Text, View, Pressable, FlatList, Alert} from 'react-native';
import { styles } from "../Styles";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AbsAndArmsDay({dates, setDates}) {
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

  // Show date picker
  const showDatepicker = () => {
    setShow(true);
  };

  // Formatting date
  const formatDate = (d) => {
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  };

  console.log(dates); // CONSOLE LOG!!!!!!!!!!!!!!

  return (
    <View style={styles.container}>
      {show && (
        <View>
          <Text style={{fontSize: 25, }}>{formatDate(date)}</Text>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            onChange={onChange}
            display="spinner">
          </DateTimePicker>
          <Pressable style={styles.button} onPress={handleSave} >
            <Text style={styles.buttonText}>SAVE DATE</Text>
          </Pressable>
        </View>
      )}

      {!show && (
        <View>
          <Pressable style={styles.button} onPress={showDatepicker}>
              <Text style={styles.buttonText}>PICK DATE</Text>
          </Pressable> 
          <FlatList
            data={dates}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => (
              <Pressable 
                style={styles.button}
                onPress={() => navigation.navigate("DateDetails", { date: item })}>
                <Text style={styles.buttonText}>
                  {formatDate(item)}
                </Text>
              </Pressable>
            )}
          />
        </View>
      )}
    </View>
  );
}