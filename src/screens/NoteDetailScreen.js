import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const NoteDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { noteId } = route.params;
  const [title, setTitle] = useState(route.params.cardTitle);
  const [description, setDescription] = useState(route.params.cardDescription);
  const [userId, setUserId] = useState(route.params.userId);

  const fetchNote = async () => {
    try {
      const noteDoc = await getDoc(doc(db, "notes", noteId));
      if (noteDoc.exists()) {
        const noteData = noteDoc.data();
        setTitle(noteData.title);
        setDescription(noteData.content);
        setUserId(noteData.userId); 
      }
    } catch (error) {
      console.error("Erro ao carregar a nota:", error);
    }
  };

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, "notes", noteId), {
        title,
        content: description,
        userId,
      });
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar nota:", error);
    }
  };

  React.useEffect(() => {
    fetchNote();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <TextInput
          style={styles.titleInput}
          value={title}
          onChangeText={setTitle}
          placeholder="Título da nota"
        />

        <TextInput
          style={styles.contentInput}
          value={description}
          onChangeText={setDescription}
          placeholder="Conteúdo da nota"
          multiline
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingTop: 64,
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 16,
  },
  titleInput: {
    height: 50,
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    fontSize: 18,
    marginBottom: 16,
    fontFamily: 'Inter_700Bold',
    backgroundColor: '#f0f0f0',
  },
  contentInput: {
    flex: 1,
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    marginBottom: 16,
    fontFamily: 'Inter_400Regular',
    textAlignVertical: 'top',
  },
  saveButton: {
    display: 'flex',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 50,
    backgroundColor: '#000',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Inter_700Bold',
  },
});

export default NoteDetailScreen;
