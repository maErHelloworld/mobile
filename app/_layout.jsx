import { Stack, useSegments, useRouter, SplashScreen } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
//import SafeScreen from "../components/SafeScreen";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
const router = useRouter();
const segments = useSegments();

const {checkAuth,user,token} = useAuthStore()


const [fontsLoaded]= useFonts({

"SpaceMono-regular": require("../assets/fonts/SpaceMono-Regular.ttf"),

})

useEffect(() => {
if(fontsLoaded) SplashScreen.hideAsync();
},[fontsLoaded])

useEffect(() => {
  checkAuth();
},[])


useEffect(() => {
const inAuthScreen = segments[0] === ("auth");
const isSignedIn = user && token;

if(!isSignedIn && !inAuthScreen) router.replace("/(auth)");
else if(isSignedIn && inAuthScreen) router.replace("/(auth)");
}, [user,token,segments])



  return (
    <SafeAreaProvider>
     {/* <SafeScreen>*/}
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="(tabs)" />
    <Stack.Screen name="(auth)" />
    </Stack>
   {/* </SafeScreen>*/}
   <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
