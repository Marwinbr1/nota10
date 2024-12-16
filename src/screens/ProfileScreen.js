// src/screens/ProfileScreen.js
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const navigation = useNavigation();
    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nota 10</Text>
      <Text style={styles.name}>Marcos Winícios</Text>
      <Text style={styles.email}>marcoswinisil@gmail.com</Text>
      <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 48,
    textAlign: 'center',
    fontFamily: 'Shrikhand_400Regular',
    color: '#000',
    lineHeight: 56,
    letterSpacing: -1,
  },
  name: {
    fontSize: 24,
    marginBottom: 8,
    fontFamily: 'Inter_700Bold',
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginBottom: 32,
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
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Inter_700Bold',
  },
});

export default ProfileScreen;
