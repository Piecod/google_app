import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useInputs } from "@/lib/inputs-data";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { useRef } from "react";

export default function Analytics() {
    const router = useRouter();
    const {
        initialInvestment,
        annualReturnRate,
        annualDividendYield,
        transactionFees,
        chartData,
    } = useInputs();

    const inputsFilled =
        initialInvestment > 0 &&
        annualReturnRate > 0 &&
        annualDividendYield > 0 &&
        transactionFees >= 0;

    const lottieRef = useRef(null);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
            <View style={{flexDirection: "row", justifyContent: "space-between", padding: 20}}>
                <Text style={{fontSize: 20, fontWeight: "bold", color: "#222"}}>Analytics</Text>
                <TouchableOpacity onPress={() => Alert.alert("Hamburger", "Will open section links")}>
                    <Ionicons name="menu" size={28} color="#007AFF"/>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{padding: 20}}>
                {!inputsFilled ? (
                    <>
                        {/*<LottieView*/}
                        {/*    ref={lottieRef}*/}
                        {/*    source={require("@/assets/animations/loading-cards.json")}*/}
                        {/*    autoPlay*/}
                        {/*    loop*/}
                        {/*    style={{height: 300}}*/}
                        {/*/>*/}
                        <View style={{marginTop: 20, padding: 16, backgroundColor: "#fef3c7", borderRadius: 12}}>
                            <Text style={{color: "#92400e", fontWeight: "bold", marginBottom: 4}}>
                                Inputs Missing
                            </Text>
                            <Text style={{color: "#92400e"}}>
                                You need to fill out the investment inputs to view analytics.
                            </Text>
                            <TouchableOpacity
                                style={{
                                    marginTop: 10,
                                    backgroundColor: "#facc15",
                                    padding: 12,
                                    borderRadius: 8,
                                    alignItems: "center",
                                }}
                                onPress={() => router.push("/(root)/(tabs)/inputs")}
                            >
                                <Text style={{color: "#222", fontWeight: "bold"}}>Go to Inputs</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <>
                        {/* Replace with actual analytics charts/visuals */}
                        <Text style={{fontSize: 18, fontWeight: "600", marginBottom: 10}}>📊 Data Analytics</Text>
                        <View style={{height: 150, backgroundColor: "#f3f4f6", borderRadius: 10, marginBottom: 20}}/>

                        <Text style={{fontSize: 18, fontWeight: "600", marginBottom: 10}}>⚖️ Risk Analysis</Text>
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#e0f2fe",
                                padding: 16,
                                borderRadius: 10,
                                marginBottom: 20,
                            }}
                            onPress={() => Alert.alert("Trigger Risk Analysis", "Running risk model...")}
                        >
                            <Text style={{color: "#0369a1", fontWeight: "bold"}}>Run Risk Analysis</Text>
                        </TouchableOpacity>

                        <Text style={{fontSize: 18, fontWeight: "600", marginBottom: 10}}>📈 Charts</Text>
                        <View style={{height: 150, backgroundColor: "#f3f4f6", borderRadius: 10, marginBottom: 20}}/>

                        <Text style={{fontSize: 18, fontWeight: "600", marginBottom: 10}}>🔗 Correlations</Text>
                        <View style={{height: 150, backgroundColor: "#f3f4f6", borderRadius: 10}}/>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};
