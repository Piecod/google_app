import { useGlobalContext } from "@/lib/global-provider";
import { ActivityIndicator, SafeAreaView, Text } from "react-native";
import { Redirect, Slot, usePathname } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function AppLayout() {
    const { loading, isLoggedIn } = useGlobalContext();
    const pathname = usePathname();
    const [hasSeenDisclaimer, setHasSeenDisclaimer] = useState<string | null>(null);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        AsyncStorage.getItem("hasSeenDisclaimer")
            .then((value) => {
                console.log("📦 AsyncStorage.hasSeenDisclaimer:", value);
                setHasSeenDisclaimer(value);
            })
            .finally(() => {
                console.log("🧭 usePathname():", pathname);
                setChecking(false);
            });
    }, [pathname]);

    if (loading || checking) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Loading...</Text>
                <ActivityIndicator size="large" />
            </SafeAreaView>
        );
    }

    // 🔍 Debug outputs
    console.log("🔐 Auth state:", { isLoggedIn, hasSeenDisclaimer, pathname });

    const publicRoutes = ["/sign-in", "/(static)/disclaimer"];

    if (!isLoggedIn && !publicRoutes.includes(pathname)) {
        console.log("⛔ Redirecting to /sign-in");
        return <Redirect href="/sign-in" />;
    }

    if (isLoggedIn && hasSeenDisclaimer === null && !pathname.endsWith("/disclaimer")) {
        console.log("📄 Redirecting to /disclaimer...");
        return <Redirect href="/(static)/disclaimer" />;
    }

    return <Slot />;
}