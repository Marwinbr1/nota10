import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CreateNoteScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TextInput style={styles.titleInput} placeholder="Título" />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Conteúdo da anotação"
          multiline
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonTextProfile}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
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
  input: {
    flex: 1,
    padding: 12,
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 4,
    fontFamily: 'Inter_400Regular',
    textAlignVertical: 'top',

  },
  textArea: {
    flex: 1,
  },
  buttonsContainer: {
    paddingTop: 16,
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

export default CreateNoteScreen;