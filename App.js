// App.js
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Shrikhand_400Regular } from '@expo-google-fonts/shrikhand';
import { ActivityIndicator, View } from 'react-native';

import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import NotesScreen from './src/screens/NotesScreen';
import CreateNoteScreen from './src/screens/CreateNoteScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import NoteDetailScreen from './src/screens/NoteDetailScreen';

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Shrikhand_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={SignupScreen} />
        <Stack.Screen name="Notas" component={NotesScreen} />
        <Stack.Screen name="CriarNota" component={CreateNoteScreen} />
        <Stack.Screen name="Perfil" component={ProfileScreen} />
        <Stack.Screen name="NoteDetail" component={NoteDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
