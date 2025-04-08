import { View, Text, Image, TextInput, Touchable, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import styles from "../../assets/styles/login.styles";
import { useState } from 'react';
import COLORS from '../../constants/colors';
import { Ionicons } from "@expo/vector-icons"
import { Link } from "expo-router"
import { useAuthStore } from '../../store/authStore';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, login } = useAuthStore();

  const handleLogin = async() => {
const result = await login(email, password);

  if (!result.success) 
    Alert.alert("Error", result.error);

  
  }




  return (
    <View style={styles.container}>
    <View style={styles.topIllustration}>
      <Image
      source={require("../../assets/images/i.png")}
      style={styles.illustrationImage}
      resizeMode="contain"
      />
      </View>

      <View style={styles.card}>
        <View style={styles.formContainer}>

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
                placeholder="Digite o seu e-mail"
                placeholderTextColor={COLORS.placeholderText}
                value={email}
                onChangeText={setEmail}
                keyboardType="emai-adress"
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
                placeholder="Digite a sua palavra-passe"
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
              <TouchableOpacity style={styles.button} onPress={handleLogin}
              disabled={isLoading}>
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Login</Text>   
                )}
                </TouchableOpacity> 

              <View style={styles.footer}>
                <Text style={styles.footerText}>Ainda não tens conta?</Text>  
                <Link href="/signup" asChild>
                  <TouchableOpacity>
                    <Text style={styles.link}>Cria já uma!</Text>
                   </TouchableOpacity>
                  </Link>
                </View>
            </View>
          </View>
        </View>
  );
}
