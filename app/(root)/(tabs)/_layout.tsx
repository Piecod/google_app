import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import icons from "@/constants/icons";

const TabIcon = ({ focused, icon, title }: { focused: boolean; icon: any; title: string }) => (
    <View className="flex-1 mt-3 flex flex-col items-center">
        <Image
            source={icon}
            tintColor={focused ? "#0061ff" : "#666876"}
            resizeMode="contain"
            className="size-6"
        />
        <Text
            className={`${
                focused ? "text-primary-300 font-rubik-medium" : "text-black-200 font-rubik"
            } text-xs w-full text-center mt-1`}
        >
            {title}
        </Text>
    </View>
);

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: 'white',
                    position: 'absolute',
                    borderTopColor: '#0061FFA',
                    borderTopWidth: 1,
                    minHeight: 70,
                },
            }}
        >
            {/* ✅ Visible tabs */}
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.home} title="Home" />
                    ),
                }}
            />
            <Tabs.Screen
                name="analytics"
                options={{
                    title: 'Analytics',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.search} title="Analytics" />
                    ),
                }}
            />
            <Tabs.Screen
                name="chatbot"
                options={{
                    title: 'Chatbot',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.chat} title="Chatbot" />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.person} title="Profile" />
                    ),
                }}
            />

            {/* ❌ Hidden tabs */}
            <Tabs.Screen name="inputs" options={{ href: null }} />
            <Tabs.Screen name="analytics/chart" options={{ href: null }} />
            <Tabs.Screen name="analytics/data" options={{ href: null }} />
            <Tabs.Screen name="analytics/risk" options={{ href: null }} />
            <Tabs.Screen name="analytics/correlations" options={{ href: null }} />
        </Tabs>
    );
};

export default TabsLayout;
