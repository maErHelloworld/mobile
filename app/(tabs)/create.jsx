import { useState } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router';
import styles from '../../assets/styles/create.styles';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';

export default function Create() {
const [title, setTitle] = useState("");
const [caption, setCaption] = useState("");
const [rating, setRating] = useState(3);
const [image, setImage] = useState(null);
const [imageBase64, setImageBase64] = useState(null);
const [loading, setLoading] = useState(false);

const router = useRouter();

const pickImage = async() => {}

const handleSubmit = async() => {}

const renderRatingPicker = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++){
        stars.push(
            <TouchableOpacity key={i} onPress={() => setRating(i)} style={styles.starButton}>
                <Ionicons
                name={i <= rating ? "star" : "star-outline"}
                size={32}
                color={i <= rating ? "f4b400" : COLORS.textSecondary}
                />
                </TouchableOpacity>
        );
    }
    return <View style={styles.ratingContainer}>{stars}</View>;
};



  return (
    <KeyboardAvoidingView
    style={{ flex:1 }}
    behavior={Plantform.OS === "ios" ? "padding" : "height"}
    >
    <ScrollView contentContainerStyle={styles.container} style={styles.scrollViewStyle}>

        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}> Adicione o seu conteúdo</Text>
                <Text style={styles.subtitle}>Partilha com os outros o que mais gostas!</Text>
            </View> 
            <View style={styles.form}>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}> Título </Text>
                        <View style={styles.inputContainer}>
                            <Ionicons
                            name="book-outline"
                            size={20}
                            color={COLORS.textSecondary}
                            style={styles.inputIcon}
                            />
                            <TextInput
                            style={styles.input}
                            placeholder="Escreve o título"
                            placeholderTextColor={COLORS.placeholderText}
                            value={title}
                            onChangeText={setTitle}
                            />
                        </View>
                    </View>
                            <View style={styles.formGroup}>
<Text style={styles.label}>A tua avaliação</Text>
{renderRatingPicker(rating, setRating)}

                            </View>

                </View> 
            </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}