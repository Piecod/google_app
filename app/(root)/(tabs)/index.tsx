import { SafeAreaView, Text, View, Image, TouchableOpacity, ScrollView, Switch, TextInput } from "react-native";
import { useGlobalContext } from "@/lib/global-provider";
import { useRouter } from "expo-router";
import { useInputs } from "@/lib/inputs-data";
import { useState } from "react";

export default function Index() {
    const { user } = useGlobalContext();
    const router = useRouter();
    const { initialInvestment, annualReturnRate, annualDividendYield, transactionFees } = useInputs();
    const [chatInput, setChatInput] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);

    const inputsFilled =
        initialInvestment > 0 &&
        annualReturnRate > 0 &&
        annualDividendYield > 0 &&
        transactionFees >= 0;

    const features = [
        {
            label: "Inputs",
            route: "/(root)/(tabs)/inputs",
            enabled: true,
        },
        {
            label: "Analytics",
            route: "/(root)/(tabs)/analytics",
            enabled: inputsFilled,
        },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? "#000" : "#fff" }}>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                {/* Header Row */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            backgroundColor: "#ace",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: 12,
                        }}>
                            <Text style={{ color: "#fff", fontWeight: "bold" }}>
                                {user?.name?.charAt(0)}{user?.name?.split(" ")[1]?.charAt(0)}
                            </Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 14, color: "#888" }}>Welcome</Text>
                            <Text style={{ fontSize: 18, fontWeight: "600", color: isDarkMode ? "#fff" : "#222" }}>{user?.name}</Text>
                        </View>
                    </View>

                    {/* Dark Mode Toggle + Hamburger */}
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                        <Switch
                            value={isDarkMode}
                            onValueChange={setIsDarkMode}
                            trackColor={{ false: "#ccc", true: "#007AFF" }}
                            thumbColor={isDarkMode ? "#fff" : "#f4f3f4"}
                        />
                        <TouchableOpacity onPress={() => console.log("Hamburger menu tapped")}>
                            <View style={{ width: 24, height: 20, justifyContent: "space-between" }}>
                                {[...Array(3)].map((_, i) => (
                                    <View key={i} style={{ height: 3, backgroundColor: "#888", borderRadius: 2 }} />
                                ))}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Divider Line */}
                <View style={{
                    height: 1,
                    backgroundColor: isDarkMode ? "#444" : "#ddd",
                    marginVertical: 20
                }} />

                {/* Navigation Cards (Rectangular) */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 30 }}>
                    {features.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={{
                                width: "48%",
                                height: 70,
                                borderRadius: 16,
                                backgroundColor: item.enabled ? "#007AFF" : "#ccc",
                                justifyContent: "center",
                                alignItems: "center",
                                shadowColor: "#000",
                                shadowOpacity: 0.1,
                                shadowOffset: { width: 0, height: 2 },
                                shadowRadius: 4,
                            }}
                            onPress={() => {
                                if (item.enabled) router.push(item.route as any);
                            }}
                            activeOpacity={item.enabled ? 0.8 : 1}
                        >
                            <Text style={{
                                fontSize: 16,
                                fontWeight: "bold",
                                color: "white",
                                textAlign: "center",
                            }}>
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Ask Chatbot */}
                <View style={{
                    marginBottom: 30,
                    backgroundColor: "#f0f0f0",
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                    <TextInput
                        value={chatInput}
                        onChangeText={setChatInput}
                        placeholder="Ask our AI assistant..."
                        placeholderTextColor="#888"
                        style={{
                            flex: 1,
                            fontSize: 15,
                            color: "#333",
                        }}
                        onSubmitEditing={() => {
                            if (chatInput.trim()) {
                                router.push("/(root)/(tabs)/chatbot");
                                setChatInput("");
                            }
                        }}
                        returnKeyType="search"
                    />
                    <TouchableOpacity
                        onPress={() => {
                            if (chatInput.trim()) {
                                router.push("/(root)/(tabs)/chatbot");
                                setChatInput("");
                            }
                        }}
                    >
                        <Text style={{ color: "#007AFF", fontWeight: "600", marginLeft: 10 }}>Go</Text>
                    </TouchableOpacity>
                </View>

                {/* History */}
                <View>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: "600",
                        marginBottom: 10,
                        color: isDarkMode ? "#fff" : "#333"
                    }}>
                        Recent Input History
                    </Text>
                    {[1, 2].map((_, i) => (
                        <View key={i} style={{
                            backgroundColor: "#f0f0f0",
                            padding: 16,
                            borderRadius: 10,
                            marginBottom: 12,
                        }}>
                            <Text style={{ fontSize: 14, color: "#444" }}>
                                Investment #{i + 1} • $10,000 • 10.7% return
                            </Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}