import { View, Text, Alert } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../store/authStore";
import styles from "../../assets/styles/profile.styles";

export default function Profile() {
  
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);


  const { token } = useAuthStore();

  const router = useRouter();

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/books/user`, {
          headers: {authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!Response.ok) throw new Error(data.message || "Failed to fetch content");

      setBooks(data);
    }catch (error){
      console.error("error fecthing data:", error);
      Alert.alert("Error", "Failed to load profile data. Pull down to refresh.");

    }finally {
      setIsLoading(false);

    }

    };


    useEffect(() => {
      fetchData();
    }, []);



  



  return (
    <View style={styles.container}>

      <ProfileHeader />
      <LogoutButton />
    </View>
  )
}