import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1ff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  dateContainer: {
    flex: 1,
    backgroundColor: '#f1f1f1ff',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 80,
    marginTop: 40,
    marginHorizontal: "auto"
  },
  mapButton: {
    backgroundColor: '#3fff5fff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 30,
    width: 70,
    marginHorizontal: "auto",
    alignItems: 'center'
  },
  mapButtonText: {
    fontSize:20,
    fontWeight: 'bold',
    color: '#3f3f3fff',
  },
  closeMapButton: {
    marginTop: 20,
    marginBottom: 20,
    width: 90,
    marginHorizontal: "auto",
    alignItems: 'center'
  },
  saveButton: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: "auto"
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 130,
    marginHorizontal: "auto"
  },
  cancelButtonText: {
    fontSize:30,
    fontWeight: 'bold',
    color: '#ff0000ff',
    paddingTop: 10
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3f8cffff',
    width: 350,
    borderRadius: 5,
    paddingVertical: 10,
    marginBottom: 50,
    marginHorizontal: "auto"
  },
  addButton: {
    alignItems: 'center',
    width: 300,
    marginHorizontal: "auto",
    marginVertical: 20,
    backgroundColor: '#3f8cffff'
  },
  addButtonText: {
    fontSize:35,
    fontWeight: 'bold',
    color: '#ffffffff',
  },
  listButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: "auto",
    marginVertical: 20
  },
  listText: {
    fontSize:30,
    fontWeight: 'bold',
    color: '#000000ff'
  },
  exerciseListText: {
    fontSize:30,
    fontWeight: 'bold',
    color: '#000000ff'
  },
  deleteText: {
    fontSize:30,
    color: '#ff0000ff'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize:30,
    color: '#ffffffff'
  },
  deleteButton: {
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 10
  },
  dateList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  picker: {
    paddingTop: 50
  },
  pickerText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  datePickerText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: "50%"
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    marginVertical: 12,
    marginHorizontal: "auto",
    borderRadius: 10,
    width: 100,
    backgroundColor: "white",
    fontSize: 18,
    textAlign: "center",
  }  
});