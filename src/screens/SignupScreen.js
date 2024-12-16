import React from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nota 10</Text>
      <TextInput style={styles.input} placeholder="Nome completo" />
      <TextInput style={styles.input} placeholder="E-mail" />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirme a senha" secureTextEntry />
      <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.ghostButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonTextGhost}>Já tenho uma conta</Text>
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
  input: {
    width: '100%',
    padding: 8,
    marginBottom: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
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
  buttonText: {
    color: '#fff',
    fontFamily: 'Inter_700Bold',
  },
  ghostButton: {
    display: 'flex',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 16,
    borderRadius: 30,
    backgroundColor: 'transparent',
  },
  buttonTextGhost: {
    color: '#000',
    fontFamily: 'Inter_700Bold',
    textDecorationLine: 'underline',
  },
});

export default SignupScreen;
