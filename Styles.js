import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 80
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 100
  },
  buttonContainer: {
    width: '80%'
  },
  saveButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    marginHorizontal: "auto"
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3f8cffff',
    borderRadius: 5,
    paddingVertical: 10,
    marginBottom: 50,
  },
  addButton: {
    alignItems: 'center',
    width: 300,
    marginHorizontal: "auto",
    marginVertical: 20,
    textDecorationLine: 'underline'
  },
  listButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: "auto",
    marginHorizontal: "auto",
    marginVertical: 20
  },
  dateListText: {
    fontSize:30,
    fontWeight: 'bold',
    color: '#000000ff'
  },
  exerciseListText: {
    fontSize:25,
    fontWeight: 'bold',
    color: '#000000ff'
  },
  deleteText: {
    fontSize:30,
    fontWeight: 'bold',
    color: '#ff0000ff'
  },
  buttonText: {
    fontSize:30,
    color: '#ffffffff'
  },
  deleteButton: {
    alignItems: 'center',
    marginVertical: 1,
    marginHorizontal: 1
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