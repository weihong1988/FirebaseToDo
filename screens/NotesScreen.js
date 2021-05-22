import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native';

export default function NotesScreen({ navigation, route }) {
  const [titleValue, onChangeTitle] = React.useState(route.params.item.title);
  const [detailsValue, onChangeDetails] = React.useState(route.params.item.details);

  var oldTitle = route.params.item.title
  var oldDetails = route.params.item.details
  var oldItem = route.params.item
  var buttonText;

  if (titleValue == oldTitle && detailsValue == oldDetails)
    buttonText = "Dismiss"
  else
    buttonText = "Update"

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30 }}>View / Edit Task</Text>

      <TextInput
        style={styles.input}
        onChangeText={onChangeTitle}
        value={titleValue}
      />

      <TextInput
        style={[styles.input, {height: 100}]}
        onChangeText={onChangeDetails}
        value={detailsValue}
        numberOfLines={4}
        multiline={true}
      />

      <TouchableOpacity style={styles.button} onPress={() => {
        if (!(titleValue == oldTitle && detailsValue == oldDetails)) {
          oldItem.title = titleValue
          oldItem.details = detailsValue

          navigation.navigate("Notes App", {updateItem: oldItem})
        }
        else
          navigation.goBack()
      }}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: "lightyellow",
  },
  input: {
    height: 40,
    width: '80%',
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 50,
    marginRight: 50,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  }
});
