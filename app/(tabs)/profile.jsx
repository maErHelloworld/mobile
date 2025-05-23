import { View, Text, Alert, FlatList, TouchableOpacity, RefreshControl } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../store/authStore";
import styles from "../../assets/styles/profile.styles";
import { Ionicons } from "@expo/vector-icons";
import { sleep } from ".";

export default function Profile() {
  
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deleteBookId, setDeleteBookId] = useState(null);


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

    const handleDeleteBook = async (bookId) => {
      try {
        setDeleteBookId(bookId);
        const response = await fetch(`${API_URL}/books/${bookId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
    
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to delete book");
    
        setBooks(books.filter((book) => book._id !== bookId));
        Alert.alert("Success", "Recommendation deleted successfully");
      } catch (error) {
        Alert.alert("Error", error.message || "Failed to delete recommendation");
      } finally{
        setDeleteBookId(null);
      }
    };
    
    const confirmDelete = (bookId) => {
      Alert.alert("Delete Recommendation", "Are you sure you want to delete this recommendation?", [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => handleDeleteBook(bookId) },
      ]);
    };
    
    const renderBookItem = ({ item }) => (
      <View style={styles.bookItem}>
        <Image source={item.image} style={styles.bookImage} />
        <View style={styles.bookInfo}>
          <Text style={styles.bookTitle}>{item.title}</Text>
          <View style={styles.ratingContainer}>{renderRatingStars(item.rating)}</View>
          <Text style={styles.bookCaption} numberOfLines={2}>
            {item.captiom}
          </Text>
          <Text style={styles.bookDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
          </View>
          <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item._id)}>
           {deleteBookId === item._id ? ( 
            <ActivityIndicator size="small" color={COLORS.primary} />
           ) : ( 
            <Ionicons name="trash-outline" size={20} colors={COLORS.primary} />
           )}
          </TouchableOpacity>
        </View>

    );

    const renderRatingStars = (rating) => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
        stars.push(
          <Ionicons
            key={i}
            name={i <= rating ? "star" : "star-outline"}
            size={14}
            color={i <= rating ? "#f4b400" : COLORS.textSecondary}
            style={{ marginRight: 2 }}
          />
        );
      }
      return stars;
    };

    const handleRefresh = async () => {
      setRefreshing(true);
      await sleep(500);
      await fetchData();
      setRefreshing(false);
    };

      if (isLoading && !refreshing) return <Loader />;

  



  return (
    <View style={styles.container}>
      <ProfileHeader />
      <LogoutButton />


<View style={styles.booksHeader}>
    <Text style={styles.bookTitle}>Your recommendations</Text>
    <Text style={styles.booksCount}>{books.length} Content </Text>
      </View>

      <FlatList
      data={books}
      renderItem={renderBookItem}
      keyExtractor={(item) => item._id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.booksList}


      refreshControl={
        <RefreshControl
        refreshing={refreshing}
        onRefresh={handleRefresh}
        colors={[COLORS.primary]}
        tintColor={COLORS.primary}
          
           />
      }
      ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="book-outline" size={50} colors={COLORS.textSecondary} />
            <Text style={styles.emptyText}>No recommendations yet</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => router.push("/create")}>
            <Text style={styles.addButtonText}>Do your first Publish</Text>
            </TouchableOpacity>
          </View>
      }
/>

    </View>
  );
}