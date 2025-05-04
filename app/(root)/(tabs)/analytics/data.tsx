import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { useRouter } from "expo-router";
import { useInputs } from "@/lib/inputs-data";

export default function Analytics() {
    const { chartData } = useInputs();
    const router = useRouter();
    const [menuVisible, setMenuVisible] = useState(false);
    type SectionRoute = typeof sections[number]["route"];

    const sections = [
        { label: "Data Analytics", route: "/(root)/(tabs)/analytics/data" },
        { label: "Charts", route: "/(root)/(tabs)/analytics/chart" },
        { label: "Risk Analysis", route: "/(root)/(tabs)/analytics/risk" },
        { label: "Correlations", route: "/(root)/(tabs)/analytics/correlations" },
    ] as const;

    const handleNavigate = (route: SectionRoute) => {
        setMenuVisible(false);
        router.push(route);
    };


    return (
        <SafeAreaView style={styles.container}>
            {/* Header with Hamburger */}
            <View style={styles.header}>
                <Text style={styles.title}>Analytics Dashboard</Text>
                <TouchableOpacity onPress={() => setMenuVisible(true)}>
                    <Text style={styles.hamburger}>☰</Text>
                </TouchableOpacity>
            </View>

            {/* Loading or Placeholder */}
            {chartData ? (
                <Text style={styles.message}>Select a section to view detailed analytics.</Text>
            ) : (
                <View style={styles.overlayContainer}>
                    <Text style={styles.loadingCard}>⏳ Waiting for inputs...</Text>
                    <TouchableOpacity
                        style={styles.redirectBtn}
                        onPress={() => router.push("/(root)/(tabs)/inputs")}
                    >
                        <Text style={styles.redirectText}>Go to Inputs</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Modal Menu */}
            <Modal visible={menuVisible} transparent animationType="fade">
                <TouchableOpacity
                    style={styles.modalBackdrop}
                    onPress={() => setMenuVisible(false)}
                    activeOpacity={1}
                >
                    <View style={styles.menuBox}>
                        {sections.map((item, idx) => (
                            <TouchableOpacity
                                key={idx}
                                style={styles.menuItem}
                                onPress={() => handleNavigate(item.route)}
                            >
                                <Text style={styles.menuText}>{item.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "white", padding: 20 },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    title: { fontSize: 22, fontWeight: "bold" },
    hamburger: { fontSize: 28, color: "#007AFF" },

    message: { fontSize: 16, marginTop: 50, color: "#555" },

    overlayContainer: {
        marginTop: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    loadingCard: {
        fontSize: 18,
        color: "#888",
        marginBottom: 20,
        backgroundColor: "#f1f5f9",
        padding: 20,
        borderRadius: 10,
        textAlign: "center",
    },
    redirectBtn: {
        backgroundColor: "#007AFF",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    redirectText: { color: "white", fontWeight: "bold" },

    modalBackdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    menuBox: {
        backgroundColor: "white",
        borderRadius: 10,
        width: 260,
        paddingVertical: 16,
        elevation: 5,
    },
    menuItem: {
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    menuText: {
        fontSize: 16,
        color: "#333",
    },
});
