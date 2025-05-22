import { View, Text, Alert } from 'react-native';
import React from 'react';
import styles from '../assets/styles/profile.styles';
import COLORS from '../constants/colors';
import { useAuthStore } from '../store/authStore';
import { Ionicons } from "@expo/vector-icons";

export default function LogoutButton() {
    const { logout } = useAuthStore;

    const confirmLogout = () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
            {text: "Cancel", style: "cancel"},
            {text: "Logout", onPress: () => logout(), style: "destructive"},
        ])

    };


  return (
    <View>
      <Text>LogoutButton</Text>
    </View>
  )
}