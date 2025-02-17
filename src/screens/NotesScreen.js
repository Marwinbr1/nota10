import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, BackHandler } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import noteService from "../services/noteService";
import { auth } from "../config/firebaseConfig";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';

const NotesScreen = () => {
  const navigation = useNavigation();
  const [notes, setNotes] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const fetchNotes = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const fetchedNotes = await noteService.getNotes(currentUser.uid);
        setNotes(fetchedNotes);
      } else {
        Alert.alert("Erro", "Usuário não autenticado.");
      }
    } catch (error) {
      console.error("Erro ao buscar notas:", error);
      Alert.alert("Erro", "Não foi possível carregar as notas. Tente novamente.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchNotes();

      navigation.setOptions({
        gestureEnabled: false,
      });

      const backAction = () => {
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
    }, [])
  );

  const handleLongPress = (noteId) => {
    setIsSelectionMode(true);
    setSelectedNotes((prev) => [...prev, noteId]);
  };

  const handlePress = (noteId) => {
    if (isSelectionMode) {
      const updatedSelectedNotes = selectedNotes.includes(noteId)
        ? selectedNotes.filter((id) => id !== noteId)
        : [...selectedNotes, noteId];

      setSelectedNotes(updatedSelectedNotes);
      
      if (updatedSelectedNotes.length === 0) {
        setIsSelectionMode(false);
      }
    } else {
      const note = notes.find((n) => n.id === noteId);
      if (note) {
        navigation.navigate("NoteDetail", {
          noteId: note.id,
          cardTitle: note.title,
          cardDescription: note.content,
        });
      }
    }
  };

  const handleDelete = async () => {
    try {
      await Promise.all(
        selectedNotes.map(async (noteId) => {
          await noteService.deleteNotes([noteId]);
        })
      );
      setNotes((prevNotes) => prevNotes.filter((note) => !selectedNotes.includes(note.id)));
      setSelectedNotes([]);
      setIsSelectionMode(false);
    } catch (error) {
      console.error("Erro ao deletar notas:", error);
      Alert.alert("Erro", "Não foi possível excluir as notas. Tente novamente.");
    }
  };

  const noteText = notes.length === 1 ? "1 nota" : `${notes.length} notas`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todas as notas</Text>

      <View style={styles.centerContainer}>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate("Perfil")}>
          <Text style={styles.buttonTextProfile}>Ver perfil</Text>
        </TouchableOpacity>
        <Text style={styles.noteCountText}>{noteText}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cardsContainer}>
          {notes.map((note) => (
            <TouchableOpacity
              key={note.id}
              style={[styles.noteCard, selectedNotes.includes(note.id) && styles.selectedNoteCard]}
              onPress={() => handlePress(note.id)}
              onLongPress={() => handleLongPress(note.id)}
            >
              {selectedNotes.includes(note.id) && <View style={styles.checkbox} />}
              <Text style={styles.noteTitle}>{note.title}</Text>
              <Text style={styles.noteContent} numberOfLines={3} ellipsizeMode="tail">
                {note.content}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {isSelectionMode ? (
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Icon name="trash-2" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Excluir selecionadas</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate("CriarNota")}>
          <Ionicons name="add" size={30} color="white" style={styles.icon}/>
          <Text style={styles.buttonText}>Criar nota</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    fontFamily: "Shrikhand_400Regular",
    color: "#000",
    marginBottom: 16,
  },
  centerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  noteCountText: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: "#AFAFAF",
    marginLeft: 16,
    top: -8,
  },
  icon: {
    marginRight: 8,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  noteCard: {
    width: "48%",
    height: 150,
    padding: 12,
    borderRadius: 8,
    borderColor: "#CBCBCB",
    borderWidth: 1,
    backgroundColor: "#FFF",
    marginBottom: 16,
  },
  selectedNoteCard: {
    backgroundColor: "#ffe6e6",
    borderColor: "#ff0000",
  },
  noteTitle: {
    fontSize: 18,
    marginBottom: 8,
    fontFamily: "Inter_700Bold",
  },
  noteContent: {
    fontSize: 14,
    color: "#555",
    fontFamily: "Inter_400Regular",
  },
  primaryButton: {
    position: "absolute",
    flexDirection: "row",
    bottom: 16,
    left: 16,
    right: 16,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#000",
  },
  secondaryButton: {
    display: "flex",
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 16,
    paddingLeft: 16,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    borderRadius: 30,
    borderColor: "#000",
    borderWidth: 1,
    marginBottom: 16,
  },
  deleteButton: {
    position: "absolute",
    flexDirection: "row",
    bottom: 16,
    left: 16,
    right: 16,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#ff0000",
  },
  ghostButton: {
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderColor: "#000",
    borderWidth: 0,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Inter_700Bold",
  },
  buttonTextGhost: {
    color: "#000",
    fontFamily: "Inter_700Bold",
    textDecorationLine: "underline",
  },
});

export default NotesScreen;