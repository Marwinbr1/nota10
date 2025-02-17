import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import Ionicons from 'react-native-vector-icons/Ionicons';


const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nota 10</Text>
      {user ? (
        <>
          <Text style={styles.name}> {user.displayName ? user.displayName : user.email.split('@')[0].charAt(0).toUpperCase() + user.email.split('@')[0].slice(1)}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </>
      ) : (
        <Text style={styles.loading}>Carregando...</Text>
      )}
      <TouchableOpacity style={styles.primaryButton} onPress={handleLogout}>
        <Ionicons name="exit-outline" size={30} color="white" style={styles.icon}/>
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
    width: '100%',
  },
  name: {
    fontSize: 24,
    marginBottom: 8,
    marginTop: 24,
    fontFamily: 'Inter_700Bold',
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginBottom: 48,
    fontFamily: 'Inter_400Regular',
  },
  loading: {
    fontSize: 16,
    color: '#777',
    marginBottom: 32,
    fontFamily: 'Inter_400Regular',
  },
  primaryButton: {
    display: 'flex',
    flexDirection: 'row', 
    paddingTop: 12,
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#000',
  },
  icon: {
    marginRight: 8, 
  },
  secondaryButton: {
    width: "100%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderColor: "#000",
    borderWidth: 1,
    marginBottom: 16,
  },
  buttonTextProfile: {
    color: "#000",
    fontFamily: "Inter_700Bold",
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Inter_700Bold',
  },
});

export default ProfileScreen;
