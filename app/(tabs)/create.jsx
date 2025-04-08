import { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Image, ScrollView, TextInput, TouchableOpacity, Alert, Platform } from 'react-native'
import { useRouter } from 'expo-router';
import styles from '../../assets/styles/create.styles';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useAuthStore } from '../../store/authStore';

export default function Create() {
const [title, setTitle] = useState("");
const [caption, setCaption] = useState("");
const [rating, setRating] = useState(3);
const [image, setImage] = useState(null);
const [imageBase64, setImageBase64] = useState(null);
const [loading, setLoading] = useState(false);

const router = useRouter();
const {token} = useAuthStore()

const pickImage = async () => {
try { 
    if (Platform.OS !== "web"){
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted"){
            Alert.alert("Permissões negadas,", "Precisamos de acesso á galeria para carregar uma imagem");
            return;
        }
    }
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
        base64: true,
        })

            if(!result.canceled){
                setImage(result.assets[0].uri);

                if(result.assets[0].base64){
                    setImageBase64(result.assets[0].base64);
                }else{
                    const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri,{
                        enconding: FileSystem.EncodingType.Base64,
                    });
                    setImageBase64(base64);
                }
            }
        }catch (error) {
            console.error("Error picking image", error);
            Alert.alert("Error", "There was a problem selecting your image");

        }
    };

const handleSubmit = async() => {
    if (!title || !caption || !imageBase64 || !rating){
        Alert.alert("Erro", "Preenche todos os espaços disponíveis");
        return;
    }

try {
    setLoading(true);


    const uriParts = image.split(".");
    const fileType = uriParts[uriParts.length -1];
    const imageType = fileType ? `image/${fileType.toLowerCase()}` : "image/jpeg";

    const imageDataURL = `data:${imageType};base64,${imageBase64}`;

    const response= await fetch(`${API_URL}/books`,{
        method: "POST",
        header:{
Authorization: `Bearer ${token}`,
"Content-Type": "application/json",
        },
        body: JSON.stringify({
title,
caption,
rating: rating.toString(),
image: imageDataURL, 
        }),
    })

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Something went wrong");

    Alert.alert("Success", "O Teu post foi publicado!");
    setTitle("");
    setCaption("");
    setRating(3);
    setImage(null);
    setImageBase64(null);
    router.push("/")
} catch (error) {
    console.error("Erro ao criar Post:", error);
    Alert.alert("Error", error.message || "Something went wrong");
} finally{
    setLoading(false);
}
};

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

                             <View style={styles.formGroup}>
                                <Text style={styles.label}>Fotografia</Text>
                                <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                                        {image ? (
                                            <Image source={{ uri: image }} style={styles.previewImage} />
                                           )  : (
                                            <View style={styles.placeholderContainer}>
                                                <Ionicons name="image-outline" size={40} color={COLORS.textSecondary} />
                                                <Text style={styles.placeholderText}>Clica para selecionares uma Imagem</Text>
                                                </View>
                                        )}
                                </TouchableOpacity>
                             </View>
<View style={styles.formGroup}>
    <Text style={styles.label}>Descrição</Text>
    <TextInput
    style={styles.textArea}
    placeholder="Escreve o que quiseres...."
    placeholderTextColor={COLORS.placeholderText}
    value={caption}
    onChangeText={setCaption}
    multiline
    />
                         </View> 

                         <TouchableOpacity style={styles.button} onPress={handleSubmit}
                         disabled={loading}>
                            {loading ? (
                                <ActivityIndicator color={COLORS.white} />
                            ) : (
                                <>
                                <Ionicons
                                    name="cloud-upload-outline"
                                 size={20}
                                 color={COLORS.white}
                                 style={styles.buttonIcon}
                                 />
                                 <Text style={styles.buttonText}> Partilhar </Text>
                                 </>
                                  )}
                                       </TouchableOpacity>
                         </View>
                     </View>
         </ScrollView>
    </KeyboardAvoidingView>
  );
}