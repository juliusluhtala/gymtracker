import { useState } from 'react';
import { Text, View, Pressable} from 'react-native';
import { styles } from "../Styles";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ChestDay() {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [dates, setDates] = useState([]);

  const onChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSave = () => {
    setDates([date, ...dates]);
    setShow(false);
  }

  const showDatepicker = () => {
    setShow(true);
  };

  const formatDate = (d) => {
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  };

  console.log(dates);

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
        <Pressable style={styles.button} onPress={showDatepicker}>
            <Text style={styles.buttonText}>PICK DATE</Text>
      </Pressable> 
      )}
    </View>
  );
}