import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NotesScreen = () => {
  const navigation = useNavigation();
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const notes = Array.from({ length: 10 }).map((_, index) => ({
    id: index + 1,
    title: `Título da nota ${index + 1}`,
    content: `Conteúdo da anotação do card ${index + 1}`,
  }));

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
      navigation.navigate('NoteDetail', {
        cardTitle: notes.find((note) => note.id === noteId).title,
        cardDescription: notes.find((note) => note.id === noteId).content,
      });
    }
  };

  const handleDelete = () => {
    console.log('Notas excluídas:', selectedNotes);
    setSelectedNotes([]);
    setIsSelectionMode(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Todas as notas</Text>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Perfil')}>
            <Text style={styles.buttonTextProfile}>Ver perfil</Text>
        </TouchableOpacity>

        <View style={styles.cardsContainer}>
          {notes.map((note) => (
            <TouchableOpacity
              key={note.id}
              style={[
                styles.noteCard,
                selectedNotes.includes(note.id) && styles.selectedNoteCard,
              ]}
              onPress={() => handlePress(note.id)}
              onLongPress={() => handleLongPress(note.id)}
            >
              {selectedNotes.includes(note.id) && <View style={styles.checkbox} />}
              <Text style={styles.noteTitle}>{note.title}</Text>
              <Text style={styles.noteContent}>{note.content}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {isSelectionMode && (
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.buttonText}>Excluir selecionadas</Text>
          </TouchableOpacity>
        )}

        {!isSelectionMode && (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('CriarNota')}
          >
            <Text style={styles.buttonText}>Criar nota</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    paddingRight: 16,
    paddingLeft: 16,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  title: {
    fontSize: 48,
    textAlign: 'center',
    fontFamily: 'Shrikhand_400Regular',
    color: '#000',
    lineHeight: 56,
    letterSpacing: -1,
  },
  cardsContainer: {
    paddingTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  noteCard: {
    display: 'flex',
    width: '48%',
    height: 150,
    padding: 12,
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderRadius: 8,
    borderColor: '#CBCBCB',
    borderWidth: 1,
    backgroundColor: '#FFF',
    marginBottom: 16,
    marginRight: '2%',
  },
  selectedNoteCard: {
    backgroundColor: '#ffe6e6',
    borderColor: '#ff0000',
  },
  checkbox: {
    width: 20,
    height: 20,
    backgroundColor: '#ff0000',
    position: 'absolute',
    top: 8,
    right: 8,
    borderRadius: 10,
  },
  noteTitle: {
    fontSize: 18,
    marginBottom: 8,
    fontFamily: 'Inter_700Bold',
  },
  noteContent: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'Inter_400Regular',
  },
  primaryButton: {
    display: 'flex',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 50,
    backgroundColor: '#000',
    marginBottom: 16,
  },
  deleteButton: {
    display: 'flex',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 50,
    backgroundColor: '#ff0000',
    marginBottom: 16,
  },
  secondaryButton: {
    display: 'flex',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 30,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Inter_700Bold',
  },
  buttonTextProfile: {
    color: '#000',
    fontFamily: 'Inter_700Bold',
  },
});

export default NotesScreen;
