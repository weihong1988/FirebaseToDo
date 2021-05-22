import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import firebase from "../database/firebaseDB"

const db = firebase.firestore().collection("todos");

export default function NotesStack({ navigation, route }) {
  // Setup Notes object
  const [NotesArray, setNotesArray] = useState([]);

  // Draw the custom headers on the top header bar
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('AddScreen')}>
          <MaterialCommunityIcons name="note-plus-outline" size={36} color="black" style={{marginRight: 20,}} />
        </TouchableOpacity>
      ),
    });
  });

  // Load up firebase database on start.
  // The snapshot keeps everything synced -- no need to refresh it later!
  useEffect(() => {
    const unsubscribe = db.orderBy("done", "asc").orderBy("timestamp", "desc").onSnapshot((collection) => {
      const updatedNotes = collection.docs.map((doc) => {
        // create our own object that pulls the ID into a property

        const noteObject = {
          ...doc.data(),
          id: doc.id,
        };

        console.log(noteObject);
        return noteObject;
      });

      setNotesArray(updatedNotes);
    });

    return () => {
      unsubscribe();
    }
  }, []);

  function deleteNote(id) {
    db.doc(id).delete();
  }

  function markNoteRead(id, isRead) {
    if (isRead)
      db.doc(id).update({ done: false });
    else
      db.doc(id).update({ done: true });
  } 

  function UpdateNoteScreen(item) {
    navigation.navigate("Note Detail", {item})
  }

  useEffect(() => {
    if (route.params?.title) {
      const newNote = {
        done: false,
        title: route.params.title,
        details: route.params.details,

        timestamp: Date.parse(new Date()),
      };

      db.add(newNote);
    }
  }, [route.params?.title]);

  useEffect(() => {
    if (route.params?.updateItem) {
      db.doc(route.params.updateItem.id).update({ 
        title: route.params.updateItem.title, 
        details: route.params.updateItem.details 
      });
    }
  }, [route.params?.updateItem]);

  // Renderer for FlatList
  function renderItem({ item }) {
    let iconName;

    if (item.done)
      iconName = "close-circle-outline";
    else
      iconName = "check-circle-outline";

    return (
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: "lightyellow",
        padding: 10,
        width: '100%',
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        }}>

        <TouchableOpacity onPress={() => UpdateNoteScreen(item)}>
          <Text style={item.done ? [styles.titleText, styles.titleTextDone] : [styles.titleText, styles.titleTextOngoing]}>{item.title}</Text>
        </TouchableOpacity>
        
        <View style={{flexDirection: "row",}}>
          <TouchableOpacity onPress={() => markNoteRead(item.id, item.done)}>
            <MaterialCommunityIcons style={{marginLeft: 20, marginRight: 10,}} name={iconName} size={30} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => deleteNote(item.id)}>
            <MaterialCommunityIcons style={{marginLeft: 10, marginRight: 20,}} name="trash-can" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList style={styles.list} data={NotesArray} renderItem={renderItem} keyExtractor={(item, index) => item.id} />
    </View>
   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    width: "100%",
  }, 
  titleText: {
    marginLeft: 20,
    fontSize: 20,
    width: "100%",
  },
  titleTextDone: {
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid',
    color: "gray",
  },
  titleTextOngoing: {
    textDecorationLine: 'none', 
    textDecorationStyle: 'solid',
    color: "black",
  }
});
