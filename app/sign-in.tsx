import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import React, { useEffect } from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage"; // 👈 You need this!

const SignIn = () => {
    const router = useRouter();
    const { refetch, loading, isLoggedIn } = useGlobalContext();

    useEffect(() => {
        if (!loading && isLoggedIn) {
            router.replace("/"); // Let _layout.tsx handle redirect to disclaimer if needed
        }
    }, [loading, isLoggedIn]);

    const handleLogin = async () => {
        // 👇 Reset disclaimer every login
        await AsyncStorage.removeItem("hasSeenDisclaimer");

        const success = await login();
        if (success) {
            await refetch(); // triggers layout redirect to disclaimer
        } else {
            Alert.alert("Login failed", "Unable to log in with Google.");
        }
    };

    return (
        <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Image
                    source={images.onboarding}
                    style={{ width: "100%", height: "66%" }}
                    resizeMode="contain"
                />
                <View style={{ paddingHorizontal: 40 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", marginTop: 20, color: "#333" }}>
                        Your Market, Your House, Your Future{"\n"}
                        <Text style={{ color: "#007AFF" }}>Start Investing</Text>
                    </Text>

                    <Text style={{ fontSize: 16, textAlign: "center", marginTop: 48, color: "#666" }}>
                        Login to Market House with Google
                    </Text>

                    <TouchableOpacity
                        onPress={handleLogin}
                        style={{
                            backgroundColor: "white",
                            shadowColor: "#aaa",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 4,
                            borderRadius: 999,
                            paddingVertical: 16,
                            marginTop: 20,
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                        <Image source={icons.google} style={{ height: 20, width: 20 }} resizeMode="contain" />
                        <Text style={{ fontSize: 16, marginLeft: 10, color: "#333", fontWeight: "600" }}>
                            Continue with Google
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignIn;
