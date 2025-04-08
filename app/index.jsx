import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.title}>Manga Fest</Text>

    <Link href="/(auth)">Login</Link>
    <Link href="/(auth)/signup">Registrar</Link>


    </View>
  );
}
const styles = StyleSheet.create({
container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
},
title:{
  color: "black",
}
});
