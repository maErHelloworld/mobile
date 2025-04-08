import { View, Text, Platform, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider } from "react-native-safe-area-context";
import styles from "../../assets/styles/signup.styles";
import SafeScreen from "../../components/SafeScreen";
import { Header } from 'react-native/Libraries/NewAppScreen';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';
import { router } from 'expo-router';
import { useAuthStore } from '../../store/authStore';

export default function Signup() {

const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const { user, isLoading, register} = useAuthStore();



const handleSignUp = async() => {
  const result = await register(username, email, password);
  if(!result.success) Alert.alert("Error", result.error);
};




  return (
    <SafeAreaProvider>
    <SafeScreen>






    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Manga Flow 🧧 </Text>
          <Text style={styles.subtitle}>Partilha a tua literatura favorita!</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Utilizador</Text>
            <View style={styles.inputContainer}>
              <Ionicons
              name="person-outline"
              size={20}
              color={COLORS.primary}
              style={styles.inputIcon}
              />
              <TextInput
              style={styles.input}
              placeholder="Nome"
              placeholderTextColor={COLORS.placeholderText}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              />
              </View>
              <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <Ionicons
              name="mail-outline"
              size={20}
              color={COLORS.primary}
              style={styles.inputIcon}
              />
              <TextInput
              style={styles.input}
              placeholder="e-mail"
              placeholderTextColor={COLORS.placeholderText}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              />
              </View>
              </View>
              <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <Ionicons
              name="lock-closed-outline"
              size={20}
              color={COLORS.primary}
              style={styles.inputIcon}
              />
              <TextInput
              style={styles.input}
              placeholder="*****"
              placeholderTextColor={COLORS.placeholderText}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              />
              <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
              >
                <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color={COLORS.primary}
                />
                </TouchableOpacity>
              </View>
              </View>

                  <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={isLoading}>
                    {isLoading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.buttonText}> Registrar </Text>
                    )}
                    </TouchableOpacity>
                        <View style={styles.footer}>
                          <Text style={styles.footerText}>Já tens uma conta?</Text>
                          <TouchableOpacity onPress={() => router.back()}>
                            <Text style={styles.link}> Faz login</Text>
                            </TouchableOpacity>
                            </View>
                      </View> 
                   </View>
                 </View>
               </View>






    </SafeScreen>
    </SafeAreaProvider>
  );
}