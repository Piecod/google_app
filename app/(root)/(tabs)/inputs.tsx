import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import { useInputs } from "@/lib/inputs-data";
import { submitInvestmentData } from "@/lib/api";
import uuid from "react-native-uuid";
import { useRouter } from "expo-router";

const Inputs = () => {
    const {
        initialInvestment,
        annualReturnRate,
        annualDividendYield,
        transactionFees,
        updateInputs,
        setChartData,
    } = useInputs();

    const [showInfo, setShowInfo] = useState({
        investment: false,
        returnRate: false,
        dividend: false,
        fees: false,
    });

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        if (initialInvestment <= 0) {
            Alert.alert("Missing Info", "Please enter a valid Initial Investment amount.");
            return;
        }

        const payload = {
            RowID: uuid.v4(),
            Email: "test@example.com", // Replace with real input if needed
            "Initial Investment": initialInvestment,
            "Annual Return Rate": annualReturnRate,
            "Annual Dividend Yield": annualDividendYield,
            "Transaction Fees": transactionFees,
        };

        setLoading(true);
        const response = await submitInvestmentData(payload);
        setLoading(false);

        if (response.success && response.data?.data) {
            setChartData({
                dataset1: response.data.data.map((item: { Year: number; Total_Value_With_Dividend: number }) => ({
                    x: item.Year,
                    y: item.Total_Value_With_Dividend,
                })),
                dataset2: response.data.data.map((item: { Year: number; Total_Net_From_Property_Before_Capital_Gains_Tax: number }) => ({
                    x: item.Year,
                    y: item.Total_Net_From_Property_Before_Capital_Gains_Tax,
                })),
            });
            Alert.alert("Success", "Investment data submitted successfully!");
            router.push("/explore");
        } else {
            Alert.alert("Error", "Failed to submit data. Please try again.");
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Investment Inputs</Text>

                {/* Initial Investment */}
                <View style={styles.inputGroup}>
                    <View style={styles.labelRow}>
                        <Text style={styles.label}>Initial Investment ($)</Text>
                        <TouchableOpacity onPress={() => setShowInfo(prev => ({ ...prev, investment: !prev.investment }))}>
                            <Ionicons name="information-circle-outline" size={18} color="#888" />
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={styles.input}
                        value={initialInvestment.toString()}
                        onChangeText={(val) => updateInputs({ initialInvestment: parseFloat(val) || 0 })}
                        placeholder="Ex: 10000"
                        keyboardType="numeric"
                    />
                    {showInfo.investment && (
                        <Text style={styles.infoText}>
                            Amount to be invested in the stock market. Typically equals your property down payment.
                        </Text>
                    )}
                </View>

                {/* Annual Return Rate */}
                <View style={styles.inputGroup}>
                    <View style={styles.labelRow}>
                        <Text style={styles.label}>Annual Return Rate (%)</Text>
                        <TouchableOpacity onPress={() => setShowInfo(prev => ({ ...prev, returnRate: !prev.returnRate }))}>
                            <Ionicons name="information-circle-outline" size={18} color="#888" />
                        </TouchableOpacity>
                    </View>
                    <Slider
                        value={annualReturnRate}
                        onValueChange={(val) => updateInputs({ annualReturnRate: val })}
                        minimumValue={0}
                        maximumValue={20}
                        step={0.25}
                        minimumTrackTintColor="#007AFF"
                    />
                    <Text style={styles.sliderValue}>{annualReturnRate.toFixed(2)}%</Text>
                    {showInfo.returnRate && (
                        <Text style={styles.infoText}>
                            Expected yearly return from stock market investments. S&P 500 average: ~10.73%.
                        </Text>
                    )}
                </View>

                {/* Annual Dividend Yield */}
                <View style={styles.inputGroup}>
                    <View style={styles.labelRow}>
                        <Text style={styles.label}>Annual Dividend Yield (%)</Text>
                        <TouchableOpacity onPress={() => setShowInfo(prev => ({ ...prev, dividend: !prev.dividend }))}>
                            <Ionicons name="information-circle-outline" size={18} color="#888" />
                        </TouchableOpacity>
                    </View>
                    <Slider
                        value={annualDividendYield}
                        onValueChange={(val) => updateInputs({ annualDividendYield: val })}
                        minimumValue={0}
                        maximumValue={10}
                        step={0.1}
                        minimumTrackTintColor="#007AFF"
                    />
                    <Text style={styles.sliderValue}>{annualDividendYield.toFixed(2)}%</Text>
                    {showInfo.dividend && (
                        <Text style={styles.infoText}>
                            Annual dividend yield paid to shareholders. Assumed to be cashed out, not reinvested.
                        </Text>
                    )}
                </View>

                {/* Transaction Fees */}
                <View style={styles.inputGroup}>
                    <View style={styles.labelRow}>
                        <Text style={styles.label}>Transaction Fees (%)</Text>
                        <TouchableOpacity onPress={() => setShowInfo(prev => ({ ...prev, fees: !prev.fees }))}>
                            <Ionicons name="information-circle-outline" size={18} color="#888" />
                        </TouchableOpacity>
                    </View>
                    <Slider
                        value={transactionFees}
                        onValueChange={(val) => updateInputs({ transactionFees: val })}
                        minimumValue={0}
                        maximumValue={5}
                        step={0.1}
                        minimumTrackTintColor="#007AFF"
                    />
                    <Text style={styles.sliderValue}>{transactionFees.toFixed(1)}%</Text>
                    {showInfo.fees && (
                        <Text style={styles.infoText}>
                            Percentage fee charged per transaction (buy/sell).
                        </Text>
                    )}
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                    style={[styles.submitButton, loading && { backgroundColor: "#aaa" }]}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={styles.submitButtonText}>Submit</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Inputs;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 30,
        color: "#222",
    },
    inputGroup: {
        marginBottom: 30,
    },
    labelRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    input: {
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
        padding: 14,
        fontSize: 15,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    sliderValue: {
        fontSize: 14,
        color: "#007AFF",
        marginTop: 4,
    },
    infoText: {
        marginTop: 8,
        color: "#666",
        fontSize: 13,
        lineHeight: 18,
    },
    submitButton: {
        backgroundColor: "#007AFF",
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    submitButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});