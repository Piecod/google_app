import { SafeAreaView, Text, View } from "react-native";

export default function Placeholder() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", padding: 20 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>🚧 Feature Coming Soon</Text>
            <Text style={{ marginTop: 10, color: "#666" }}>
                This analytics section will visualize your input-based data with graphs or risk analysis.
            </Text>
        </SafeAreaView>
    );
}